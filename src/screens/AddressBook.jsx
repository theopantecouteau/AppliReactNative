import React, {useState} from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList } from "react-native";
import log from "../../loggerConfig";
import {db} from "../../firebase-config";
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase/app";
import {getAddressBook} from "../actions/users";
const AddressBook = ({navigation}) => {

    const [addVisibility, setAddVisibility] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [url, setUrl] = useState("");
    const [address, setAddress] = useState("");
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");
    const [birthday, setBirthday] = useState("");
    const [notes, setNotes] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    log.info(user);
    const handleAddContact = async () => {
        try{
            const addressBookDoc = {
                firstname : firstname,
                lastname : lastname,
                company : company,
                phone : phone,
                mail: mail,
                url : url,
                address : address,
                street : street,
                zip: zip,
                birthday : firebase.firestore.Timestamp.now(),
                notes : notes,
                uid: user.uid
            };
            log.debug(addressBookDoc.uid);
            await db.collection("users").doc(user.uid).collection('address_book').add(addressBookDoc).then((docRef) => {
                log.info("address_book created in user collection");
                dispatch(getAddressBook(user.uid))
            })
                .catch((error) => log.error("error while creating address_book in user collection ", error));

        }
        catch(error){
            log.error("Error in creating addressBook : ", error);
        }
    }

    return(
            <>
            {!addVisibility ?

                <View>
                    <Button
                        title="Add contact"
                        onPress={() => setAddVisibility(true)}
                    />
                    <Text>Numéro d'urgence</Text>
                    <View style={styles.view}>
                        <Text>Police</Text>
                        <Text>17</Text>
                    </View>
                    <View style={styles.view}>
                        <Text>Pompier</Text>
                        <Text>18</Text>
                    </View>
                    <View style={styles.view}>
                        <Text>Samu</Text>
                        <Text>15</Text>
                    </View>
                    <View style={styles.view}>
                        <Text>Urgences</Text>
                        <Text>112</Text>
                    </View>
                    <FlatList
                        data={user.addressBook}
                        renderItem={({ item }) => (
                            <Text  onPress={() => navigation.navigate('AddressBookDetail', {item})}>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.nameText}>{item.firstname}</Text>
                                    <Text style={styles.phoneText}>{item.lastname}</Text>
                                </View>
                            </Text>
                        )}
                        keyExtractor={(item, index) => index }
                    />
                </View>
            :
                <View>
                    <TextInput
                        placeholder="Prénom"
                        onChangeText={newText => setFirstname(newText) }
                    />
                    <TextInput
                        placeholder="Nom"
                        onChangeText={newText => setLastname(newText) }
                    />
                    <TextInput
                        placeholder="Entreprise"
                        onChangeText={newText => setCompany(newText) }
                    />
                    <TextInput
                        placeholder="Téléphone"
                        onChangeText={newText => setPhone(newText) }
                    />
                    <TextInput
                        placeholder="Mail"
                        onChangeText={newText => setMail(newText) }
                    />
                    <TextInput
                        placeholder="Site Web"
                        onChangeText={newText => setUrl(newText) }
                    />
                    <TextInput
                        placeholder="Adresse"
                        onChangeText={newText => setAddress(newText) }
                    />
                    <TextInput
                        placeholder="Ville"
                        onChangeText={newText => setStreet(newText) }
                    />
                    <TextInput
                        placeholder="Code Postal"
                        onChangeText={newText => setZip(newText) }
                    />
                    <TextInput
                        placeholder="Notes"
                        onChangeText={newText => setNotes(newText) }  
                    />
                    <TextInput
                        placeholder="Anniversaire (YYYY/MM/DD)"
                        onChangeText={newText => setBirthday(newText) }
                    />
                    <Button
                        title="Ajouter le contact"
                        onPress={handleAddContact}
                    />
                </View>
            }
            </>
    )
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    phoneText: {
        fontSize: 16,
        color: '#555',
    },
});

export default AddressBook;