import { View, Text, Button, StyleSheet, ActionSheetIOS } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { useDispatch , useSelector } from 'react-redux';
import { setConnexionState} from '../actions/connexion';

function Login({navigation, props}) {

    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [user, setUser] = useState("user");
    const isConnected = useSelector(state => state.isConnected)
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    console.debug(isConnected)

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
            dispatch(setConnexionState({isConnected : true}));
        })
        .catch((error) => console.debug(error))
    }

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
                <Button
                    onPress={handleLogOut}
                    title="Logout"
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
