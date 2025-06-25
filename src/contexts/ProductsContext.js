import { createContext, useEffect, useState } from 'react';
import {
  getProductsFromFirestore
} from '../services/firestore/products';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const fetchedProducts = await getProductsFromFirestore();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loadProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
