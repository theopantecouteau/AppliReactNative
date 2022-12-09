import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';

export default function Login({navigation, props}) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [user, setUser] = useState("user");

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            console.debug("User created");
            const user = userCredential.user;
            console.debug(user);
        })
        .catch((error) => console.debug(error));
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            console.debug("User login successful");
            const user = userCredential.user;
            console.debug(user);
        })
        .catch((error) => console.debug(error))
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
                <Button
                    onPress={handleSignUp}
                    title="Register"
                >
                    
                </Button>
            </View>
            <Text>{user}</Text>
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

