import React, { createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, app } from '../services/firebase';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';


export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'ads')), (snapshot) => {
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

  const uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${userId}`);
    const snapshot = await uploadString(storageRef, blob, 'data_url');
    return await getDownloadURL(snapshot.ref);
  };

  const addItem = async (item, imageUri) => {
    try {
      let imageUrl = '';
      if (imageUri) {
        imageUrl = await uploadImage(imageUri, item.userId);
      }
      const itemWithCreatorAndImage = {
        ...item,
        image: imageUrl,
      };
      const itemRef = collection(db, 'ads');
      const docRef = await addDoc(itemRef, itemWithCreatorAndImage);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  

  const updateItem = async (itemId, newItem) => {
    try {
      const itemRef = collection(db, 'ads', itemId);
      await updateDoc(itemRef, newItem);
      console.log('Document updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const itemRef = collection(db, 'ads', itemId);
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
