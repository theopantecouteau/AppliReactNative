import React from 'react';
import { View, Text, Button, TextInput, Picker, Image } from 'react-native';
import { connect } from 'react-redux';
import { updateTask, addCheckbox, deleteCheckbox } from './actions';

function Tache({ task, updateTask, addCheckbox, deleteCheckbox, navigation }) {
  const [name, setName] = useState(task.name);
  const [avatar, setAvatar] = useState(task.avatar);
  const [access, setAccess] = useState(task.access);
  const [notes, setNotes] = useState(task.notes);
  const [url, setUrl] = useState(task.url);
  const [attachment, setAttachment] = useState(task.attachment);
  const [reminder, setReminder] = useState(task.reminder);
  const [newCheckboxLabel, setNewCheckboxLabel] = useState('');
  const [newCheckboxName, setNewCheckboxName] = useState('');
  const [newCheckboxPhoto, setNewCheckboxPhoto] = useState('');
  const [newCheckboxNotes, setNewCheckboxNotes] = useState('');

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Nom"
      />
      <Image
        source={{ uri: avatar }}
        style={{ width: 50, height: 50 }}
      />
      <Button
        title="Changer d'avatar"
        onPress={() => console.log('Changement davatar non implémenté')}
      />
      
      <Picker
        selectedValue={access}
        onValueChange={itemValue => setAccess(itemValue)}
      >
        <Picker.Item label="Public" value="public" />
        <Picker.Item label="Privé" value="private" />
        </Picker>
      <TextInput
        value={notes}
        onChangeText={text => setNotes(text)}
        placeholder="Notes"
      />
      <TextInput
        value={url}
        onChangeText={text => setUrl(text)}
        placeholder="URL"
      />
      <Button
        title="Ajouter une pièce jointe"
        onPress={() => console.log('Ajout de pièce jointe non implémenté')}
      />
      
      {attachment && (
        <View>
          <Text>{attachment.name}</Text>
          <Button
            title="Supprimer la pièce jointe"
            onPress={() => console.log('Suppression de pièce jointe non implémenté')}
          />
        </View>
      )}
      
      <TextInput
        value={reminder}
        onChangeText={text => setReminder(text)}
        placeholder="Rappel (date)"
      />
      
      <View>
        {task.checkboxes.map(checkbox => (
          <View key={checkbox.id}>
            <Text>{checkbox.label}</Text>
            <Button title="Supprimer" onPress={() => deleteCheckbox(checkbox.id)} />
          </View>
        ))}
      </View>
      <TextInput
        value={newCheckboxLabel}
        onChangeText={text => setNewCheckboxLabel(text)}
        placeholder="Etiquette"
      />
      <TextInput
        value={newCheckboxName}
        onChangeText={text => setNewCheckboxName(text)}
        placeholder="Nom"
      />
      <Image
        source={{ uri: newCheckboxPhoto }}
        style={{ width: 50, height: 50 }}
      />
      <Button
        title="Ajouter une photo"
        onPress={() => console.log('Ajout de photo non implémenté')}
      />
      <TextInput
        value={newCheckboxNotes}
        onChangeText={text => setNewCheckboxNotes(text)}
        placeholder="Notes"
      />
      <Button
        title="Ajouter un checkbox"
        onPress={() => addCheckbox({
          id: uuid(),
          label: newCheckboxLabel,
          name: newCheckboxName,
          photo: newCheckboxPhoto,
          notes: newCheckboxNotes,
        })}
      />
      <Button
        title="Sauvegarder les modifications"
        onPress={() => updateTask({
          ...task,
          name,
          avatar,
          access,
          notes,
          url,
          attachment,
          reminder,
        })}
      />
        <Button
        title="Retour"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => ({
  task: state.tasks.find(task => task.id === ownProps.navigation.getParam('task').id),
});

const mapDispatchToProps = {
  updateTask,
  addCheckbox,
  deleteCheckbox,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tache);


