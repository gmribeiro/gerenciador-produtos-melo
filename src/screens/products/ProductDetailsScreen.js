import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.nome}</Text>
      <Text style={styles.price}>R$ {product.preco.toFixed(2)}</Text>
      <Text style={styles.description}>{product.descricao}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafb', // tom claro neutro
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#3730a3', // azul mais escuro, elegante
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#4338ca', // azul vibrante, destaque
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#4338ca', // cinza escuro para leitura confortável
  },
});
