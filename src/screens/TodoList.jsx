import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {connect, useDispatch, useSelector} from 'react-redux';
import Tache from '../components/Tache.jsx'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { getAuth } from 'firebase/auth';
import { addTodo, deleteTodo } from '../actions/toDo';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker';

const TodoList = ({navigation ,todos, onToggle})  => {

    const dispatch = useDispatch();
    const state_ToDoList = useSelector(state => state.tache.tache);
    const app = initializeApp(firebaseConfig);
    const aut = getAuth(app);

    const  cptIdNumber = state_ToDoList.length > 0 ?  Number([state_ToDoList.length -1].id) +1: 0;
    const [_isCreate, setIsCreate] = useState(false);
    const [_nameTache, setNameTache] = useState("");
    const [_desc, setDesc] = useState("");
    const [_date, setDate] = useState(new Date());
    const [_url, setUrl] = useState("");
    const [_listToDo, setListToDo] = useState([]);
    const [_attachment, setAttachment] = useState();
    
    useEffect(()=> {  
        console.debug("Taille de la ToDoListe : " + state_ToDoList.length);
        console.debug(state_ToDoList);
        let array = [];
        for (let idxTache = 0; idxTache < state_ToDoList.length; idxTache++){
            let tache = state_ToDoList[idxTache];
            if (tache != undefined){
                array.push(
                    <Tache props={{
                            nom : tache.nom, 
                            id: tache.id, 
                            listeMembre : tache.listeMembre,
                            desc : tache.desc,
                            date : tache.date,
                            url : tache.url
                        }}
                    />
                )
            }   
        }
        setListToDo(array);    
    },[state_ToDoList])
    
    const addtoToDoList = (donnee) => {
        dispatch(addTodo(donnee));
    }   

    
    const pickImage = async () => {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()    
    
        if (granted === true) {
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
                uploadImage();
            }
        }
    };

    const uploadImage = async () => {
        const { uri } = _attachment;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setAttachment(null);
    };
    return (
        <View style={styles.container}>
            {!_isCreate && (
    
                    <Button
                        onPress={()=> setIsCreate(true)}
                        title="Créer une nouvelle Tâche"
                        color="#841584" 
                    />
    
            )}
            {!_isCreate && _listToDo.length > 0 && (
                _listToDo.map(task => (
                    <View key={task.id}>
                        <Text>{task.name}</Text>
                        <Button
                        title='Check'
                        onPress={() => toggleCheckboxes(task.id)}
                        />

                        <Button title="Modifier" onPress={() => console.log('Modification de la tâche non implémentée')} />
                        <Button title="Dupliquer" onPress={() => console.log('Duplication de la tâche non implémentée')} />
                        <Button title="Supprimer" onPress={() => deleteTask(task.id)} />
                        <Button
                        title="Détails"
                        onPress={() => navigation.navigate('Tache', { task })}
                        />
                    </View>
                    )
                )
            )}
            {!_isCreate  && _listToDo.length == 0 && (
                <Text>
                    Aucune Tâche de créer.
                </Text>
            )}
            {_isCreate && (
                <>
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
                        placeholder="Url de la Tâche"
                    />
                    <Button title="Choisissez une image" onPress={pickImage} />
                    <Image source={{ uri: _attachment }} style={{ width: 200, height: 200 }} />
                    <Button
                        onPress={() => {
                            let newTache = {
                                nom : _nameTache, 
                                id: Number(cptIdNumber), 
                                listeMembre : ["Hugo", "Theo"],
                                desc : _desc,
                                date : _date,
                                url : _url,
                                attachment : _attachment,
                                checkbox: false
                            };
                            console.info(newTache);
                            addtoToDoList(newTache);
                            setIsCreate(false);
                            setNameTache("");
                            setUrl("");
                            setDate(new Date());
                            setDesc("");
                            setAttachment("");
                        } }
                        title="Ajouter la tache" 
                    />

                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop : '5%',
  },
  test: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 30,
  },
  header : {
    backgroundColor : 'red'
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
  tabTache : {
    display : "block",
    margin : 10
  },
  tache : {
    marginBottom : 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default TodoList;
