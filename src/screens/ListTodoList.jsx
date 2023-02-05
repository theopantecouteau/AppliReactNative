import { useState, useEffect } from "react";
import { Button, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import {db} from "../../firebase-config";
import {getUserTodoList} from "../actions/todoList";
import log from "../../loggerConfig";
const ListToDoList = ({navigation }) => {

    const dispatch = useDispatch();
    const [_isCreate, setIsCreate] = useState(false);
    const [_nameTodo, setNameTodo] = useState("");
    const [_desc, setDesc] = useState("");
    
    const [_listeTodoList, setListTodoList] = useState([]);
    const todolist = useSelector(state => state.todoList.todoList);
    const user = useSelector(state => state.user.user);
    log.info(todolist);
    useEffect(()=> {  
        let listeTodo = todolist;
        let array = [];
        for (let idxTache = 0; idxTache < listeTodo.length; idxTache++){
            let todoList = listeTodo[idxTache];
            if (todoList != undefined){
                array.push({
                    nom : todoList.nom, 
                    id: todoList.id,
                    desc : todoList.desc,
                    taches : todoList.taches,
                    uid: user.uid,

                })
            }   
        }
        setListTodoList(array);    
    },[user])

    const handleAddTodoList = async () => {
        try{
            const TodoList = {
                    nom : _nameTodo, 
                    id: 1, 
                    desc : _desc,
                    taches : [],
                    uid: user.uid
            };
            await db.collection("todo_list").add(TodoList).then((docRef) => {
                console.info("Todo_List created in user collection");
                dispatch(getUserTodoList(user.uid));
                setIsCreate(false);
                setDesc("");
                setNameTodo("");
            })
                .catch((error) => console.error("error while creating Todo_List in user collection ", error));
            
        }
        catch(error){
            console.error("Error in creating Todo_List : ", error);
        }
    }
    
    return (
        <ScrollView style={styles.container}>
            {!_isCreate && (
                <Button
                    onPress={()=> setIsCreate(true)}
                    title="Créer une nouvelle TodoList"
                    color="#841584" 
                />
            )}
            {!_isCreate && _listeTodoList.length > 0 && (
                _listeTodoList.map(todo => (
                    <ScrollView key={todo.id}>
                        <Text>Nom : {todo.nom}</Text>
                        <Text>Description : {todo.desc}</Text>
                        <Text>id : {todo.id}</Text>
                        <Button
                            title="Détails"
                            onPress={() => 
                                navigation.navigate('TodoList', {
                                    id : todo.id,
                                    nom : todo.nom,
                                    desc : todo.desc,
                                    taches : todo.taches
                                })
                            }
                        />
                    </ScrollView>
                ))
            )}
            {!_isCreate  && _listeTodoList.length == 0 && (
                <Text>
                    Aucune ToDoList de créer.
                </Text>
            )}
            {_isCreate && (
                <>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNameTodo}
                        value={_nameTodo}
                        placeholder="Nom de la ToDoList"
                    />
                    <TextInput
                        style={styles.inputDesc}
                        onChangeText={setDesc}
                        value={_desc}
                        multiline
                        numberOfLines={10}
                        placeholder="Description de la Tâche"
                    />
                    <Button
                        onPress={handleAddTodoList}
                        title="Ajouter la ToDoList" 
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

export default ListToDoList;
