import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { auth } from '../../firebase-config';
import { useDispatch } from 'react-redux';
import { setConnexionState} from '../actions/connexion';
import {getAddressBook, getTodoList, getUserData} from '../actions/users';
import Toast from 'react-native-root-toast';
import log from '../../loggerConfig.js';
import {getUserAddressBook} from "../actions/addressBook";
import {getUserTodoList} from "../actions/todoList";

function Login({navigation, props}) {

    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const handleSignIn = async () => {
        auth.signInWithEmailAndPassword(id, pwd)
        .then((userCredential) => {
            log.debug("User login successful");
            Toast.show('Connecté', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "green", position: Toast.positions.TOP});
            const user = userCredential.user;
            dispatch(setConnexionState({isConnected : true}));
            dispatch(getUserData(user.uid));
            dispatch(getUserAddressBook(user.uid));
            dispatch(getUserTodoList(user.uid));
            navigation.navigate('Home');
        })
        .catch((error) => {
            log.error(error)
            switch(error.code){
                case "auth/wrong-password":
                    Toast.show('Mot de passe incorrect', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "orange", position: Toast.positions.TOP});
                    break;
                case "auth/user-not-found":
                    Toast.show('Utilisateur introuvable', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "red", position: Toast.positions.TOP});
                    break;
                case "auth/user-disabled":
                    Toast.show('Compte désactivé', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "red", position: Toast.positions.TOP});
                    break;
                case "auth/operation-not-allowed":
                    Toast.show('Trop de tentatives, veuillez patienter...', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "red", position: Toast.positions.TOP});
                    break;
                case "auth/operation-not-allowed":
                    Toast.show('En maintenance, veuillez patienter ...', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "red", position: Toast.positions.TOP});
                    break;
                case "auth/invalid-email":
                    Toast.show('Email invalide', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "orange", position: Toast.positions.TOP});
                    break;
                default:
                    Toast.show('Impossible de vous connecter', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "red", position: Toast.positions.TOP});
                    break;
            }
        });
    }

    return (
        <View>
            <Text>Login</Text>
            <View>
                <TextInput
                    styles={styles.textInput} 
                    onChangeText={newText => setId(newText)}
                    placeholder="id"
                />
                <TextInput 
                    styles={styles.textInput} 
                    onChangeText={newText => setPwd(newText)}
                    placeholder="pwd"
                />
            </View>
            <View>
                <Button
                    onPress={handleSignIn}
                    title="Login"
                > 
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput :  
    {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    }

});
  
export default Login;
