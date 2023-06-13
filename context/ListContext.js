import React, { createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'Lists')), (snapshot) => {
      const updatedItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(updatedItems);
      console.log('Items updated');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, 'Lists'), item);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async (itemId, newItem) => {
    try {
      const itemRef = collection(db, 'Lists', itemId);
      await updateDoc(itemRef, newItem);
      console.log('Document updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const itemRef = collection(db, 'Lists', itemId);
      await deleteDoc(itemRef);
      console.log('Document deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </ListContext.Provider>
  );
};
