import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { setConnexionState } from '../actions/connexion';

export default function Logout() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    signOut(auth)
    .then((userCredential) => {
        console.debug("User log out successful");
        const user = userCredential.user;
        console.debug(user);
        dispatch(setConnexionState({isConnected : false}));
    })
}

  return (
    <View>
      <Button onPress={handleLogOut}>Logout</Button>
    </View>
  )
}