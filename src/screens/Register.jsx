import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

export default function Register({navigation, props}) {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    return (
        <View>
            <Text>Register</Text>
            <View>
                <TextInput styles={styles.textInput} onChangeText={newText => setId(newText)}>mail</TextInput>
                <TextInput styles={styles.textInput} onChangeText={newText => setPwd(newText)}>pwd</TextInput>
                <TextInput styles={styles.textInput} onChangeText={newText => setName(newText)}>name</TextInput>

                <Button>Register</Button>
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