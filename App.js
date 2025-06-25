import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { ProductsProvider } from './src/contexts/ProductsContext';

export default function App() {
  return (
    <ProductsProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ProductsProvider>
  );
}
