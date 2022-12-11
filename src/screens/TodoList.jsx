import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View, TextInput } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {connect} from 'react-redux';
import { UPDATE_TODO_ACTION } from '../constants/index';
import Tache from '../components/Tache.jsx'

function ToDoItem ({todo, onToggle}){
    return <Text>
        <li>
            <label htmlFor="">
                <input type="checkbox" checked={todo.completed} onChange={()=> onToggle(todo)} />
                {todo.title}
            </label>
        </li>
    </Text>
}
const TodoList = ({navigation ,todos, onToggle})  => {

    const [_cptId, setCptId] = useState(0);
    const [_isCreate, setIsCreate] = useState(false);
    const [_listToDo, setListToDo] = useState([]);
    const [_nameTache, setNameTache] = useState("");
    const [_onDetail, setOnDetail] = useState(false);
    const [_listDetail, setListDetail] = useState([]);
    
    function createTache(){
        setIsCreate(true);
    }

    function getDetail(id){
        setOnDetail(true);
        for (let i =0; i < _listToDo.length; i++){
            if (_listToDo[i].props.props.id == id){
                _listToDo[i].props.props.isDetail = true;
                setListDetail([_listToDo[i]]);
            }
        }
    }  


    return (
        <View style={styles.container}>
            {!_isCreate && !_onDetail && (<Button 
                onPress={createTache}
                title="Créer une nouvelle Tâche"
                color="#841584"
            />)}
            {!_isCreate && !_onDetail && _listToDo.length > 0 && (
                <Text>
                    {_listToDo.map(value => {
                        return <Text>{value}</Text>
                    })}
                </Text>
            )}
            {!_isCreate && !_onDetail && _listToDo.length == 0 && (
                <Text>
                    Aucune Tâche de créer.
                </Text>
            )}
            {_isCreate && !_onDetail && (
                <>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNameTache}
                        value={_nameTache}
                        placeholder="Nom de la Tâche"
                    />
                    <Button
                        onPress={() => {
                            _listToDo.push(<Tache props={{nom : _nameTache, id: _cptId, isDetail : false, parentFunction : getDetail, listeMembre : ["Hugo", "Theo"]}}/>);
                            setCptId(_cptId+1);
                            setIsCreate(false);
                            setNameTache("");
                        } }
                        title="Ajouter la tache" 
                    />
                </>
            )}
            {_onDetail && _listDetail.length > 0 && (
                <Text>{
                _listDetail.map(value => {
                    return value
                })}
                </Text>
                
            )}
        </View>
    );
}

export const TodoListStore = connect(
    (state) => ({
        todos: state.todos
    }),
    (dispatch) =>({
        onToggle : todo => dispatch({
            type : UPDATE_TODO_ACTION,
            payload : {...todo, completed : !todo.completed}
        })
    })
)(TodoList)

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
