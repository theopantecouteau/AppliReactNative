import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View, TextInput } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {connect, useDispatch, useSelector} from 'react-redux';
import { UPDATE_TODO_ACTION } from '../constants/index';
import Tache from '../components/Tache.jsx'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { getAuth } from 'firebase/auth';

const TodoList = ({navigation ,todos, onToggle})  => {

    const dispatch = useDispatch();
    const state_ToDoList = useSelector(state => state.tache.tache);
    const app = initializeApp(firebaseConfig);
    const aut = getAuth(app);

    const [_cptId, setCptId] = useState(Number(state_ToDoList[0].id));
    const [_isCreate, setIsCreate] = useState(false);
    const [_nameTache, setNameTache] = useState("");
    const [_desc, setDesc] = useState("");
    const [_date, setDate] = useState("");
    const [_url, setUrl] = useState("");
    const [_listToDo, setListToDo] = useState([]);

    console.debug(useSelector(state => state.tache));

    useEffect(()=> {
        if (_listToDo.length == 0){
            let array = [];
            for (let idxTache = 0; idxTache < state_ToDoList.length; idxTache++){
                let tache = state_ToDoList[idxTache];
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
            setListToDo(array);
        }
    },[])
    
    function createTache(){
        setIsCreate(true);
    }


    return (
        <View style={styles.container}>
            {!_isCreate && (
    
                    <Button
                        onPress={createTache}
                        title="Créer une nouvelle Tâche"
                        color="#841584" 
                    />
    
            )}
            {!_isCreate && _listToDo.length > 0 && (
                <Text>
                    {_listToDo.map(value => {
                        return (
                            <View>
                                <Text
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
                            </View>
                        );
                    })}
                </Text>
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
                        onPress={() => {
                            _listToDo.push(<Tache props={{
                                nom : _nameTache, 
                                id: _cptId+1, 
                                listeMembre : ["Hugo", "Theo"],
                                desc : _desc,
                                date : _date,
                                url : _url
                            }}/>);
                            setCptId(_cptId+1);
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
    marginTop : 50,
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
});

export default TodoList;
