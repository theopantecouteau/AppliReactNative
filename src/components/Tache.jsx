import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, View, TextInput } from 'react-native';
import React, { Component, useState, useEffect } from "react";
;

const stateTache = [
    "ToDo",
    "Pending",
    "Done"
];
const Tache = ({navigation, props}) => {
    const [_currentState, setCurrentState] = useState(0);
    const [_listeMembre, setListeMembre] = useState();
    const [_desc, setDesc] = useState();
    const [_date, setDate] = useState();
    const [_checklist, setChecklist] = useState([]);
    const [_pj, setPj] = useState();
    const [_url, setUrl] = useState();
    
    useEffect(() => { 
        if (_listeMembre == undefined){
            let ajoutMembre = props.listeMembre;
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
            if (props.desc != undefined) setDesc(props.desc);
        }
    },[_desc])

    useEffect(() => { 
        if (_date == undefined){
            if (props.date != undefined) setDate(props.date);
        }
    },[_date])

    useEffect(() => { 
        if (_checklist == undefined){
            let ajoutMembre = props.checklist;
            if (ajoutMembre != undefined){
                let array = [];
                for (let i = 0; i < ajoutMembre.length; i++){
                    array.push(ajoutMembre[i]);
                }
                setChecklist(array);
            }
           
        }
    },[_checklist])

    useEffect(() => { 
        if (_pj == undefined){
            if (props.pj != undefined) setPj(props.pj);
        }
    },[_pj])

    useEffect(() => { 
        if (_url == undefined){
            if (props.url != undefined) setUrl(props.url);
        }
    },[_url])

    return (
        <View style={styles.container}>
            {!props.isDetail && (
                <Text   
                    onPress={() => {
                        props.parentFunction(props.id);
                    }}>
                        {props.id} : {props.nom}
                </Text>
            )}
            {props.isDetail &&  (
                <Text>AHAHAHAHA</Text>
            )}
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
  });
  
