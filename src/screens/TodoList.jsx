import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {connect, useDispatch, useSelector} from 'react-redux';
import Tache from '../components/Tache.jsx'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { getAuth } from 'firebase/auth';
import { addTodo, deleteTodo } from '../actions/toDo';
import DatePicker from 'react-native-datepicker';

const [animatePress, setAnimatePress] = useState(new Animated.Value(1))

const animateIn = () => {
  Animated.timing(animatePress, {
    toValue: 0.5,
    duration: 500,
    useNativeDriver: true // Add This line
  }).start();
}
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
                <View style={styles.tabTache}>
                    {_listToDo.map((value,idx) => {
                        return (
                                <Text
                                    key={idx}
                                    style={styles.tache}
                                    onPress={() => {
                                            navigation.navigate('Tache', {
                                                id : value.props.props.id,
                                                nom : value.props.props.nom, 
                                                listeMembre :  value.props.props.listeMembre,
                                                desc : value.props.props.desc,
                                                date : value.props.props.date,
                                                url : value.props.props.url
                                            })
                                    }}
                                >
                                    {value.props.props.id} : {value.props.props.nom}
                                </Text>
                            
                        );
                    })}
                </View>
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
                    <DatePicker  style={styles.datePickerStyle}
                        date={_date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="Choisir une date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            //display: 'none',
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                            },
                            dateInput: {
                            marginLeft: 36,
                            },
                        }}
                        onDateChange={(date) => {
                            setDate(date);
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setUrl}
                        value={_url}
                        placeholder="Url de la Tâche"
                    />
                    <Button
                        onPress={() => {
                            addtoToDoList({
                                nom : _nameTache, 
                                id: cptIdNumber, 
                                listeMembre : ["Hugo", "Theo"],
                                desc : _desc,
                                date : _date,
                                url : _url
                            });
                            setIsCreate(false);
                            setNameTache("");
                            setUrl("");
                            setDate("");
                            setDesc("");
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
