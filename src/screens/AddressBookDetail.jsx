import React, {useState} from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList } from "react-native";
import log from "../../loggerConfig";
import {useDispatch, useSelector} from "react-redux";

const AddressBookDetail = ({navigation, route}) => {

    const [firstname, setFirstname] = useState(route.params.item.firstname);
    const [lastname, setLastname] = useState(route.params.item.lastname);
    const [company, setCompany] = useState(route.params.item.company);
    const [phone, setPhone] = useState(route.params.item.phone);
    const [mail, setMail] = useState(route.params.item.mail);
    const [url, setUrl] = useState(route.params.item.url);
    const [address, setAddress] = useState(route.params.item.address);
    const [street, setStreet] = useState(route.params.item.street);
    const [zip, setZip] = useState(route.params.item.zip);
    const [birthday, setBirthday] = useState(route.params.item.birthday);
    const [notes, setNotes] = useState(route.params.item.notes);
    log.info(route.params)
    return (
        <View>
            {firstname ? <Text>Prénom : {firstname}</Text> : ""}
            {lastname ? <Text>Nom : {lastname}</Text> : ""}
            {company ? <Text>Entreprise : {company}</Text> : ""}
            {phone ? <Text>Téléphone : {phone}</Text> : ""}
            {mail ? <Text>Mail : {mail}</Text> : ""}
            {url ? <Text>Site Web : {url}</Text> : ""}
            {address ? <Text>Adresse : {address}</Text> : ""}
            {street ? <Text>Ville : {street}</Text> : "" }
            {zip ? <Text>Code postal : {zip}</Text> : ""}
            {notes ? <Text>Notes : {notes}</Text> : ""}
            {birthday ? <Text>Anniversaire : {birthday.seconds}</Text> : ""}
        </View>
    );
}

export default AddressBookDetail;
