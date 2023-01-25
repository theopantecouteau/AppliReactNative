import { StatusBar } from 'expo-status-bar';
import { Button ,StyleSheet, Text, TextInput, View, FlatList,Animated } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {deleteTodo, updateTodo } from '../actions/toDo';
import {connect, useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-datepicker';

const [animatePress, setAnimatePress] = useState(new Animated.Value(1))

const animateIn = () => {
  Animated.timing(animatePress, {
    toValue: 0.5,
    duration: 500,
    useNativeDriver: true // Add This line
  }).start();
}

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
                onChangeText={setDate}
                value={_date}

                placeholder="Date de la Tâche"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUrl}
                value={_url}
                keyboardType='url'
                placeholder="Url de la Tâche"
            /> 
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
  
