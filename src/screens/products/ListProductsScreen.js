import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { ProductsContext } from '../../contexts/ProductsContext';
import { deleteProduct } from '../../services/firestore/products';
import { useNavigation } from '@react-navigation/native';

export default function ListProductsScreen() {
  const { products, loadProducts } = useContext(ProductsContext);
  const navigation = useNavigation();
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoadingId(id);
            try {
              await deleteProduct(id);
              loadProducts();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
            }
            setLoadingId(null);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>{item.descricao}</Text>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.footerButton, styles.editButton]}
          onPress={() => navigation.navigate('EditProduct', { product: item })}
        >
          <Text style={styles.footerButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          {loadingId === item.id ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.footerButtonText}>Excluir</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.addButtonText}>+ Novo Produto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileButtonText}>Perfil</Text>
      </TouchableOpacity>
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#e0e7ff' },
  addButton: { backgroundColor: '#4338ca', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  profileButton: { backgroundColor: '#6366f1', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  profileButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  productName: { fontSize: 20, fontWeight: '700', color: '#4f46e5', marginBottom: 4 },
  productPrice: { fontSize: 16, fontWeight: '600', color: '#4f46e5', marginBottom: 6 },
  productDescription: { color: '#4f46e5', fontSize: 14, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerButton: { flex: 1, paddingVertical: 10, marginHorizontal: 4, borderRadius: 8, alignItems: 'center' },
  editButton: { backgroundColor: '#4338ca' },
  deleteButton: { backgroundColor: '#ef4444' },
  footerButtonText: { color: '#fff', fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, color: '#64748b' },
});
