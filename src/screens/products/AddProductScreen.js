import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addProductToFirestore } from '../../services/firestore/products';
import { ProductsContext } from '../../contexts/ProductsContext';

export default function AddProductScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const { loadProducts } = useContext(ProductsContext);

  const handleAdd = async () => {
    if (!nome || !preco || !descricao) return Alert.alert('Preencha todos os campos');

    await addProductToFirestore({ nome, preco: parseFloat(preco), descricao });
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
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} multiline />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  },
  button: {
    backgroundColor: '#4338ca',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});