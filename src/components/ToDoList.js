import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View } from 'react-native';
import React, { Component, useState, useEffect } from "react";

export default function ToDoList() {

    const [isCreate, setIsCreate] = useState(false);
    const [listToDo, setListToDo] = useState([]);
    
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
        {!isCreate && listToDo.length > 0 && (
            <Text>
                {listToDo.map(value => {
                    return <Text>{value}</Text>
                })}
            </Text>
        )}
        {!isCreate && listToDo.length == 0 && (
            <Text>
                Aucune Tâche de créer.
            </Text>
        )}
        {isCreate && (
            <Button
                onPress={() => {
                    listToDo.push(<Tache nom="Hugo"/>)
                    setIsCreate(false);
                }}
                title="Ajouter la tache"
            />
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
  }
});
