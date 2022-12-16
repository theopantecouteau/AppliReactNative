import { StatusBar } from 'expo-status-bar';
import { Button ,StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {deleteTodo, updateTodo } from '../actions/toDo';
import {connect, useDispatch, useSelector} from 'react-redux';
const stateTache = [
    "ToDo",
    "Pending",
    "Done"
];
const Tache = ({navigation, route}) => {
    const [_currentState, setCurrentState] = useState(0);
    const [_listeMembre, setListeMembre] = useState();
    const [_nameTache, setNameTache] = useState(route.params.nom);
    const [_desc, setDesc] = useState(route.params.desc);
    const [_date, setDate] = useState(route.params.date);
    const [_url, setUrl] = useState(route.params.url);

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
    const saveModif = () => {
        let newObject = {
            id : route.params.id,
            nom : _nameTache,
            listeMembre : _listeMembre,
            desc : _desc,
            date : _date,
            url : _url
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
                style={styles.input}
                onChangeText={setDesc}
                value={_desc}
                placeholder="Description de la Tâche"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDate}
                value={_date}
                placeholder="Date de la Tâche"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUrl}
                value={_url}
                placeholder="Url de la Tâche"
            /> 
            <Button
                onPress={() => deleteThis()} 
                style={{backgroundColor : 'red' }}
                title="Supprimer"
            />
            {/* <FlatList
                data={_listeMembre}
                renderItem={
                    ({item}, idx) => 
                        <TextInput
                            style={styles.input}
                            onChangeText={(value, idx)=> {
                                let array = [];
                                for (let i = 0; i < _listeMembre.length; i++){
                                    i == idx ? array.push(value) : array.push(_listeMembre[i]);
                                }
                                setListeMembre(array);
                            }}
                            value={item.key}
                            placeholder="Url de la Tâche"
                            key={idx}
                        /> 
                }
            />  */}
            <Button
                onPress={() => saveModif()} 
                style={{backgroundColor : 'red' }}
                title="Enregistrer"
            />         
        </View>
    );
}
export default Tache;
const styles = StyleSheet.create({
    container: {
      marginTop : 100,
      width: 1000,
      flex: 1,
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
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
  });
  
