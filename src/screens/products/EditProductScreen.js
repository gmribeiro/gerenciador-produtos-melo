import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { updateProduct } from '../../services/firestore/products';
import { ProductsContext } from '../../contexts/ProductsContext';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;
  const [nome, setNome] = useState(product.nome);
  const [preco, setPreco] = useState(product.preco.toString());
  const [descricao, setDescricao] = useState(product.descricao);
  const { loadProducts, mockUser } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);
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

  const handleUpdate = async () => {
    if (!nome || !preco || !descricao) {
      showMessage({ type: 'error', text: 'Preencha todos os campos' });
      return;
    }
    setLoading(true);
    try {
      await updateProduct(product.id, {
        nome,
        preco: parseFloat(preco),
        descricao,
        atualizadoPor: mockUser.uid,
        atualizadoPorNome: mockUser.nome,
      });
      await loadProducts();
      showMessage({ type: 'success', text: 'Produto atualizado com sucesso!' });
      setTimeout(() => navigation.goBack(), 1500);
    } catch (error) {
      showMessage({ type: 'error', text: 'Erro ao atualizar o produto' });
    }
    setLoading(false);
  };

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

      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} editable={!loading} />
      <Text style={styles.label}>Preço:</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" editable={!loading} />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Atualizar</Text>}
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
    borderColor: '#4f46e5',
    color: '#111827',
  },
  button: {
    backgroundColor: '#4338ca',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },

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
