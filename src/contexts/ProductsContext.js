import React, { createContext, useState, useEffect } from 'react';
import { getProductsFromFirestore } from '../services/firestore/products';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  const mockUser = {
    uid: '1234567890abcdef',
    nome: 'Luciano Salgado Prof',
    email: 'usuario@exemplo.com',
  };

  const loadProducts = async () => {
    const productsData = await getProductsFromFirestore();
    setProducts(productsData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loadProducts, mockUser }}>
      {children}
    </ProductsContext.Provider>
  );
}
