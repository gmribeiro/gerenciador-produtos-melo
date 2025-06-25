import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.nome}</Text>
      <Text style={styles.price}>R$ {product.preco.toFixed(2)}</Text>
      <Text style={styles.description}>{product.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e0e7ff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, color: '#4f46e5' },
  price: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#4f46e5' },
  description: { fontSize: 16, color: '#4f46e5' },
});
