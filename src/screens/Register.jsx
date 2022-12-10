import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import {getFirestore, setDoc, doc, Timestamp} from 'firebase/firestore';

export default function Register({navigation, props}) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [firstname, setFirstname] = useState("");
    const [data, setDate] = useState("");
    const [surname, setSurname] = useState("");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    const handleSignUp = async () => {
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            console.debug("User created");
            const user = userCredential.user;
            console.debug(user);
            createUserInDb(user.uid);
        })
        .catch((error) => console.debug(error));
    }

    async function createUserInDb(userUid){
        try{
            const userDoc = {
                firstname : firstname,
                surname : surname
            };
            await setDoc(doc(db, "users", userUid), userDoc)
            .then((res) => console.debug(res));
        }
        catch(e){
            console.debug("Error in creating user", e);
        }
    }

    return (
        <View>
            <Text>Register</Text>
            <View>
                <TextInput style={styles.textInput} onChangeText={newText => setId(newText)} placeholder={"Email"}/>
                <TextInput style={styles.textInput} onChangeText={newText => setPwd(newText)} placeholder={"Password"}/>
                <TextInput style={styles.textInput} onChangeText={newText => setFirstname(newText)} placeholder={"Firstname"}/>
                <TextInput style={styles.textInput} onChangeText={newText => setSurname(newText)} placeholder={"Surname"}/>
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