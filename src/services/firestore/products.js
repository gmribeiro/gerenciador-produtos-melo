import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from '../../config/firebase';

const productsRef = collection(db, "products");

export const addProductToFirestore = async (product) => {
  await addDoc(productsRef, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

export const getProductsFromFirestore = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateProduct = async (id, product) => {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, {
    ...product,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
};