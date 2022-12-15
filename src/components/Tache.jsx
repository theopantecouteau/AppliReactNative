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
    const [_desc, setDesc] = useState();
    const [_date, setDate] = useState();
    const [_pj, setPj] = useState();
    const [_url, setUrl] = useState();
    
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

    useEffect(() => { 
        if (_desc == undefined){
            if (route.params.desc != undefined) setDesc(route.params.desc);
        }
    },[_desc])

    useEffect(() => { 
        if (_date == undefined){
            if (route.params.date != undefined) setDate(route.params.date);
        }
    },[_date])

    useEffect(() => { 
        if (_pj == undefined){
            if (route.params.pj != undefined) setPj(route.params.pj);
        }
    },[_pj])

    useEffect(() => { 
        if (_url == undefined){
            if (route.params.url != undefined) setUrl(route.params.url);
        }
    },[_url])

    return (
        <View style={styles.container}>

                <Text>
                    id : {route.params.id}{"\n"}
                    nom : {route.params.nom}{"\n"}
                    desc : {_desc}{"\n"}
                    date : {_date}{"\n"}
                    pj : {_pj}{"\n"}
                    url : {_url}{"\n"}
                    {_listeMembre != undefined && (
                        <FlatList
                            data={_listeMembre}
                            renderItem={
                                ({item}) => {
                                     <Text style={styles.item}>{item}</Text>
                            }}
                        />)}
                </Text> 
       
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
  
