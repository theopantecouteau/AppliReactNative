import React, {useState} from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import log from "../../loggerConfig";
import {db} from "../../firebase-config";
import {useDispatch, useSelector} from "react-redux";
<<<<<<< HEAD
import firebase from "firebase";
import {updateUserData} from "../actions/users";

=======
import {updateUserAddressBook} from "../actions/users";
import firebase from "firebase/app";
>>>>>>> 639a46a436d0282aeb590fc6a2ffa415bf59f1d9
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
            await db.collection("address_book").add(addressBookDoc).then((docRef) => {
                log.info("address_book created");
                let addressBook = user.addressBook;
                addressBook.push(docRef.id);
                dispatch(updateUserAddressBook({addressBook: addressBook, uid : user.uid}));
            })
                .catch((error) => log.error("error while creating address_book ", error));

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
    }

});

export default AddressBook;