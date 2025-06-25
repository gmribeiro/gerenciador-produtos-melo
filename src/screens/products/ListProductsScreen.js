import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { ProductsContext } from '../../contexts/ProductsContext';
import { deleteProduct } from '../../services/firestore/products';
import { useNavigation } from '@react-navigation/native';

export default function ListProductsScreen() {
  const { products, loadProducts } = useContext(ProductsContext);
  const navigation = useNavigation();
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showMessage = (msg) => {
    setMessage(msg);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMessage(null));
    }, 3000);
  };

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
              await loadProducts();
              showMessage({ type: 'success', text: 'Produto excluído com sucesso!' });
            } catch (error) {
              showMessage({ type: 'error', text: 'Erro ao excluir o produto' });
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
      disabled={loadingId !== null}
    >
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>{item.descricao}</Text>
      <Text style={styles.createdBy}>Criado por: {item.criadoPorNome || 'Desconhecido'}</Text>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.footerButton, styles.editButton]}
          onPress={() => navigation.navigate('EditProduct', { product: item })}
          disabled={loadingId !== null}
        >
          <Text style={styles.footerButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
          disabled={loadingId !== null}
        >
          {loadingId === item.id ? <ActivityIndicator color="#fff" /> : <Text style={styles.footerButtonText}>Excluir</Text>}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {message && (
        <Animated.View
          style={[
            styles.message,
            message.type === 'error' ? styles.errorMessage : styles.successMessage,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.addButtonText}>+ Novo Produto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.profileButtonText}>Perfil</Text>
      </TouchableOpacity>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={loadingId === null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  addButton: { backgroundColor: '#4338ca', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  profileButton: { backgroundColor: '#6366f1', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  profileButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  productName: { fontSize: 20, fontWeight: '700', color: '#4f46e5', marginBottom: 4 },
  productPrice: { fontSize: 16, fontWeight: '600', color: '#4f46e5', marginBottom: 6 },
  productDescription: { color: '#4f46e5', fontSize: 14, marginBottom: 10 },
  createdBy: { fontSize: 12, color: '#64748b', marginBottom: 6, fontStyle: 'italic' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerButton: { flex: 1, paddingVertical: 10, marginHorizontal: 4, borderRadius: 8, alignItems: 'center' },
  editButton: { backgroundColor: '#4338ca' },
  deleteButton: { backgroundColor: '#ef4444' },
  footerButtonText: { color: '#fff', fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, color: '#64748b' },

  message: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  successMessage: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    borderWidth: 1,
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  messageText: {
    color: '#4338ca',
    fontWeight: '600',
    textAlign: 'center',
  },
});
