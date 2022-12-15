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
    const _listToDo = useSelector(state => state.tache.tache);
    const app = initializeApp(firebaseConfig);
    const aut = getAuth(app);

    const [_cptId, setCptId] = useState(0);
    const [_isCreate, setIsCreate] = useState(false);
    const [_nameTache, setNameTache] = useState("");
    const [_listDetail, setListDetail] = useState([]);

    console.debug(useSelector(state => state.tache));
    function createTache(){
        setIsCreate(true);
    }


    return (
        <View style={styles.container}>
            {!_isCreate && (<Button 
                onPress={createTache}
                title="Créer une nouvelle Tâche"
                color="#841584"
            />)}
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
                                                listeMembre :  value.props.props.listeMembre
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
                    <Button
                        onPress={() => {
                            _listToDo.push(<Tache props={{
                                nom : _nameTache, 
                                id: _cptId, 
                                listeMembre : ["Hugo", "Theo"]
                            }}/>);
                            setCptId(_cptId+1);
                            setIsCreate(false);
                            setNameTache("");
                        } }
                        title="Ajouter la tache" 
                    />
                </>
            )}
            { _listDetail.length > 0 && (
                <Text>{
                _listDetail.map(value => {
                    return value
                })}
                </Text>
                
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
