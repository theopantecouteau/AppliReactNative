import { StatusBar } from 'expo-status-bar';
import { Button ,StyleSheet, Text, TextInput, View, FlatList,Image } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {deleteTodo, updateTodo } from '../actions/toDo';
import {connect, useDispatch, useSelector} from 'react-redux';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const stateTache = [
    "ToDo",
    "Pending",
    "Done"
];
const Tache = ({navigation, route}) => {
    const [_isModif, setIsModif] = useState(false);
    const [_currentState, setCurrentState] = useState(0);
    const [_listeMembre, setListeMembre] = useState();
    const [_nameTache, setNameTache] = useState(route.params.nom);
    const [_desc, setDesc] = useState(route.params.desc);
    const [_date, setDate] = useState(new Date(route.params.date));
    const [_url, setUrl] = useState(route.params.url);
    const [_attachment, setAttachment] = useState(route.params.attachment);
    const dispatch = useDispatch();
    
    useEffect(() => { 
        if (_listeMembre == undefined){
            let ajoutMembre = route.params.listeMembre;
            if (ajoutMembre != undefined){
                let array = [];
                for (let i = 0; i < ajoutMembre.length; i++){
                    array.push(ajoutMembre[i]);
                }
                setListeMembre(array);
            }
            
        }
    },[_listeMembre])

    const deleteThis = () => {
        dispatch(deleteTodo(route.params.id));
        navigation.navigate('TodoList');
    }

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.debug(result);

        if (!result.canceled) {
            console.debug("CEST PARTI");
            console.debug(result.uri);
            setAttachment(result.uri);
        }
    };

    const saveModif = () => {
        let newObject = {
            id : route.params.id,
            nom : _nameTache,
            listeMembre : _listeMembre,
            desc : _desc,
            date : _date,
            url : _url,
            attachment : _attachment
        }
        console.debug("DANS LA FONCTION");
        console.debug(newObject);
        dispatch(updateTodo(newObject));
        navigation.navigate('TodoList');
    }
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setNameTache}
                value={_nameTache}
                placeholder="Nom de la Tâche"
            />
            <TextInput
                style={styles.inputDesc}
                onChangeText={setDesc}
                value={_desc}
                multiline
                numberOfLines={10}
                placeholder="Description de la Tâche"
            />
            <RNDateTimePicker  
                value={_date} // Initial date from state
                mode={'date'} 
                is24Hour={true}
                onChange={(event, date) => {
                    setDate(new Date(date));
                }}
            />
            <TextInput
                style={styles.input}
                onChangeText={setUrl}
                value={_url}
                keyboardType='url'
                placeholder="Url de la Tâche"
            />
            <Image source={{ uri: _attachment }} style={{ width: 200, height: 200 }} onPress={pickImage}/>
            <Button
                onPress={() => deleteThis()} 
                title="Supprimer"
            />
         
            <Button
                onPress={() => saveModif()} 
                title="Enregistrer"
            />      
        </View>
    );
}
export default Tache;
const styles = StyleSheet.create({
    container: {
      marginTop : '5%',
    },
    input: {
      height: 40,
      margin: '2%',
      borderWidth: 1,
      padding: 10,
      width : '96%'
    },
    inputDesc: {
        height: 80,
        margin: '2%',
        borderWidth: 1,
        padding: 10,
        width : '96%'
      },
      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  });
  
