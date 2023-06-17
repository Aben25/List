import React, { createContext, useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, app , storage} from '../services/firebase';
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

  //create a function to upload images to firebase storage using the ad id as the folder name and return the images  url to be saved in the database as an array
  const uploadImage = async (imageUri, userId) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${userId}/${Date.now()}`);
    const uploadTask = uploadString(storageRef, blob, 'data_url');
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          console.log(progress);
        },
        (error) => {
          // Error function ...
          console.log(error);
          reject(error);
        },
        () => {
          // complete function ...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        },
      );
    });
  };




  const addItem = async (item) => {
    try {
     
      const itemWithCreatorAndImage = {
        ...item,
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
    <ListContext.Provider value={{ items, addItem, updateItem, deleteItem,uploadImage }}>
      {children}
    </ListContext.Provider>
  );
};
