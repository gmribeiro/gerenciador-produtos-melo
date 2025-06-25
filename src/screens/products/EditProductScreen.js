import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { updateProduct } from '../../services/firestore/products';
import { ProductsContext } from '../../contexts/ProductsContext';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [nome, setNome] = useState(product.nome);
  const [preco, setPreco] = useState(product.preco.toString());
  const [descricao, setDescricao] = useState(product.descricao);
  const { loadProducts } = useContext(ProductsContext);

  const handleUpdate = async () => {
    await updateProduct(product.id, { nome, preco: parseFloat(preco), descricao });
    loadProducts();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Preço:</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput style={[styles.input, { height: 100 }]} value={descricao} onChangeText={setDescricao} multiline />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginBottom: 4, fontWeight: 'bold' },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#4f46e5', // mesma cor azul da outra tela
    color: '#111827',
  },
  button: {
    backgroundColor: '#4338ca',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
