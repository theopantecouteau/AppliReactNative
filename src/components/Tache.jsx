import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View, FlatList } from 'react-native';
import React, { Component, useState, useEffect } from "react";
;

const stateTache = [
    "ToDo",
    "Pending",
    "Done"
];
const Tache = ({navigation, route}) => {
    const [_currentState, setCurrentState] = useState(0);
    const [_listeMembre, setListeMembre] = useState();
    
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

    return (
        <View style={styles.container}>

                <Text>
                    id : {route.params.id}{"\n"}
                    nom : {route.params.nom}{"\n"}
                    desc : {route.params.desc}{"\n"}
                    date : {route.params.date}{"\n"}
                    pj : {route.params.pj}{"\n"}
                    url : {route.params.url}{"\n"}
                        
                </Text> 
                <FlatList
                    data={route.params.listeMembre}
                    renderItem={
                        ({item}) => 
                            <Text style={styles.item}>{item.key}</Text>
                    }
                />
       
        </View>
    );
}
export default Tache;
const styles = StyleSheet.create({
    container: {
      marginTop : 100,
      width: 1000,
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
  
