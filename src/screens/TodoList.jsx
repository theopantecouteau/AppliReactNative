import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import {connect} from 'react-redux';
import { UPDATE_TODO_ACTION } from '../store/todoReducer';

function toDoItem ({todo, onToggle}){
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

    const [isCreate, setIsCreate] = useState(false);

    const stateTache = [
        "ToDo",
        "Pending",
        "Done"
    ];

    class Tache extends React.Component {
        state = { 
            currentState : 0,
            nom : this.props.nom,
            membres : this.props.membres,
            desc : this.props.desc,
            date : this.props.date,
            checklist : [],
            piecejointe : this.props.piecejointe,
            url : this.props.url,
        };

        render() {
            return (
                <Text>{this.state.nom}</Text>
            );
        }
    }

    function createTache(){
        setIsCreate(true);
        return (
            <Text></Text>
        );
    }

    return (
      <View style={styles.container}>
        {!isCreate && (<Button 
            onPress={createTache}
            title="Créer une nouvelle Tâche"
             color="#841584"
        />)}
        {!isCreate && todos.length > 0 && (
            <Text>
                <ul>
                    {todos.map(todo => <toDoItem todo={todo} onToggle={onToggle}
                    key={todo.id}/>)}
                </ul>
            </Text>
        )}
        {!isCreate && todos.length == 0 && (
            <Text>
                Aucune Tâche de créer.
            </Text>
        )}
        {isCreate && (
            <Button
                onPress={() => {
                    todos.push(<Tache nom="Hugo"/>)
                    setIsCreate(false);
                }}
                title="Ajouter la tache"
            />
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
  }
});

export default TodoList;