import { Button,StyleSheet, Text, ScrollView, TextInput, Image} from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addTodo, duplicateTodo, toggleCheckboxes } from '../actions/toDo';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import { storage } from '../../firebase-config';
import { ETIQUETTE } from '../constants';
import { Picker } from '@react-native-picker/picker';
import {db} from "../../firebase-config";
import { getTodoList } from "../actions/users";
import {getUserTodoList} from "../actions/todoList";
const TodoList = ({ navigation, route})  => {

    const dispatch = useDispatch();
    const [_isCreate, setIsCreate] = useState(false);
    const [_nameTache, setNameTache] = useState("");
    const [_desc, setDesc] = useState("");
    const [_date, setDate] = useState(new Date());
    const [_url, setUrl] = useState("");
    const [_listToDo, setListToDo] = useState([]);
    const [_attachment, setAttachment] = useState("/.jpg");
    const [_numberEtiquette, setNumberEtiquette] = useState(3);
    const user = useSelector(state => state.user.user)

    useEffect(()=> {
        console.log(route.params)
        let listeDesTaches = route.params.taches;
        console.log(listeDesTaches);
        let array = [];
        for (let idxTache = 0; idxTache < listeDesTaches.length; idxTache++){
            let tache = listeDesTaches[idxTache];
            if (tache != undefined){
                array.push({
                    nom : tache.nom, 
                    id: tache.id, 
                    listeMembre : tache.listeMembre,
                    desc : tache.desc,
                    date : tache.date,
                    url : tache.url,
                    checkbox : tache.checkbox,
                    attachment: tache.attachment,
                    etiquette: tache.etiquette,
                    uid: user.uid

                })
            }   
        }
        setListToDo(array);    
    },[user])
    
    /*const addtoToDoList = (donnee) => {
        dispatch(addTodo(donnee));
    }   */

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync(); 

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
                console.debug(result);
                setAttachment(result.uri);
                await uploadImage(result.uri);
            }
        };
    }

    const uploadImage = async (uri) => {
        console.debug(storage);
        let storageRef = storage.ref("images");
        
        console.debug(storageRef);
        const metadata = { contentType: "image/jpeg" };
        const localPath = uri;
        
        var getFileBlob = function (url, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.contentType = "image.jpg";
            xhr.addEventListener('load', function() {
                cb(xhr.response);
            });
            xhr.send();
        };
        const img = await fetch(uri);
        const bytes = await img.blob();
        // console.debug("BLOB");
        // console.debug(bytes);
        const ref = storage.ref("images").child('img1.jpg');
        // // ref.put(bytes).then((snapshot) => {
        // //     console.log('Uploaded an array!');
        // // });
        console.debug('2');
        // //4.
        
        getFileBlob(uri, blob =>{
            let img = new Blob([blob.data], {type : 'image/jpg'});
            storageRef.put(blob).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
            })
        })

        // ref.put(bytes).then(() => {
        //     alert("Image uploaded successfully to Firebase.");
        //     getFileBlob(uri, blob =>{
        //         console.debug(blob);
        //         storageRef.child('file.jpg').put(blob).then(function(snapshot) {
        //             console.log('Uploaded a blob or file!');
        //         })
        //     })})
        // //    let uploadImage = fileRef.putFile(uri);
        // // Firebase API should change while you're working with Firebase V9
        // const img = await fetch(uri);
        // const bytes = await img.blob();
        // console.debug("1");
        // const ref = storageRef.child("images" + "/" + metadata + "/" + uri);
        // console.debug("2");
        // ref.put(bytes).then((snapshot) => {
        //     console.debug('Uploaded a blob or file!');
        // });


        setAttachment(null);
    };

    const handleAddTache = async () => {
        try{
            const Tache = {
                nom : _nameTache, 
                id: 1, 
                listeMembre : ["Hugo", "Theo"],
                desc : _desc,
                date : _date,
                url : _url,
                attachment : _attachment,
                checkbox: false,
                etiquette : _numberEtiquette
            };
            console.debug(route.params)
            await db.collection("todo_list").doc(route.params.id).collection('taches').add(Tache).then((docRef) => {
                console.info("tache created in user collection");
                dispatch(getUserTodoList(user.uid))
            })
                .catch((error) => console.error("error while creating tache in user collection ", error));

        }
        catch(error){
            console.error("Error in creating Tache : ", error);
        }
    }
    return (
        <ScrollView style={styles.container}>
            <Text>Nom TodoList : {route.params.nom}</Text>
            <Text>Description TodoList : {route.params.desc}</Text>
            {!_isCreate && (
                <Button
                    onPress={()=> setIsCreate(true)}
                    title="Créer une nouvelle Tâche"
                    color="#841584" 
                />
            )}
            {!_isCreate && _listToDo.length > 0 && (
                _listToDo.map(task => (
                    <ScrollView key={task.id}>
                        <Text>{task.nom}</Text>
                        <Text>Priorité : {ETIQUETTE[task.etiquette]}</Text>
                        <Button
                            title={task.checkbox ? 'Check ✔️' : 'Check ❌'}
                            onPress={() => {
                                dispatch(toggleCheckboxes(task.id))}
                            }
                        />
                        <Button title="Dupliquer" onPress={() => {
                                dispatch(duplicateTodo(task.props.id))
                            }} 
                        />
                        <Button
                            title="Détails"
                            onPress={() => 
                                navigation.navigate('Tache', {
                                    id : task.id,
                                    nom : task.nom, 
                                    etiquette: task.etiquette,
                                    listeMembre :  task.listeMembre,
                                    desc : task.desc,
                                    date : task.date,
                                    url : task.url,
                                    checkbox : task.checkbox,
                                    attachment: task.attachment,
                                })
                            }
                        />
                    </ScrollView>
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
                    <Picker
                        selectedValue={_numberEtiquette}
                        onValueChange={index => setNumberEtiquette(index)}
                    >
                        {ETIQUETTE.map((item, index) => (
                            <Picker.Item key={index} label={item} value={index} />
                        ))}
                    </Picker>
                    <Text>Priorité : {ETIQUETTE[_numberEtiquette]}</Text>
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
                        onPress={handleAddTache}
                        title="Ajouter la tache" 
                    />

                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop : '5%',
    marginBottom: 40,
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
