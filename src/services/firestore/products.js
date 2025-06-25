import {collection,addDoc,getDocs,updateDoc,deleteDoc,doc,serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const productsRef = collection(db, 'products');

export const addProductToFirestore = async (product) => {
  await addDoc(productsRef, {
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
    criadoPor: product.criadoPor,
    criadoPorNome: product.criadoPorNome,
    createdAt: serverTimestamp(),
  });
};

export const getProductsFromFirestore = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateProduct = async (id, product) => {
  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, {
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
    atualizadoPor: product.atualizadoPor,
    atualizadoPorNome: product.atualizadoPorNome,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};
