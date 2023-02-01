import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import Toast from "react-native-root-toast";
import log from '../../loggerConfig.js';

export default function Register({navigation, props}) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [firstname, setFirstname] = useState("");
    const [data, setDate] = useState("");
    const [lastname, setLastname] = useState("");

    const handleSignUp = async () => {
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            log.info('User created')
            const user = userCredential.user;
            log.info('User : ' + user)
            createUserInDb(user.uid);
            navigation.navigate('Login');
            Toast.show('Compte crée', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "green", position: Toast.positions.TOP})
        })
        .catch((error) => {
            log.error(error.code)
            switch(error.code) {
                case "auth/account-exists-with-different-credential":
                case "auth/email-already-in-use":
                    Toast.show('Email déjà utilisé', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "orange", position: Toast.positions.TOP})
                    break;
                case "auth/weak-password":
                    Toast.show('Mot de passe trop faible', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "orange", position: Toast.positions.TOP})
                    break;
                case "auth/invalid-email":
                    Toast.show('Email invalide', {duration: Toast.durations.SHORT, animation : true, backgroundColor : "orange", position: Toast.positions.TOP});
                    break;
            }
        });
    }

    async function createUserInDb(userUid){
        try{
            const userDoc = {
                firstname : firstname,
                lastname : lastname,
                todoList : [],
                addressBook : []
            };
            await setDoc(doc(db, "users", userUid), userDoc)
            .then((res) => log.debug(res));
        }
        catch(e){
            log.error('Error in creating user : {1}', e)
        }
    }

    return (
        <View>
            <Text>Register</Text>
            <View>
                <TextInput style={styles.textInput} onChangeText={newText => setId(newText)} placeholder={"Email"}/>
                <TextInput style={styles.textInput} onChangeText={newText => setPwd(newText)} placeholder={"Password"}/>
                <TextInput style={styles.textInput} onChangeText={newText => setFirstname(newText)} placeholder={"Firstname"}/>
                <TextInput style={styles.textInput} onChangeText={newText => setLastname(newText)} placeholder={"Surname"}/>
                <Button onPress={handleSignUp}>Register</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput :  
    {
        borderColor: "grey",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10
    }

});