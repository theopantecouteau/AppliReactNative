import React, { useState } from 'react';
import { View, Text, Button, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { updateTask, addCheckbox, updateCheckbox, deleteCheckbox, duplicateTask } from './actions';

function Tache({ task, updateTask, addCheckbox, updateCheckbox, deleteCheckbox, duplicateTask }) {
  const [taskName, setTaskName] = useState(task.name);
  const [taskAccess, setTaskAccess] = useState(task.access);
  const [taskNotes, setTaskNotes] = useState(task.notes);
  const [taskUrl, setTaskUrl] = useState(task.url);
  const [checkboxLabel, setCheckboxLabel] = useState('');

  return (
    <View>
      <TextInput
        value={taskName}
        onChangeText={text => setTaskName(text)}
        placeholder="Nom de la tâche"
      />
      <Picker
        selectedValue={taskAccess}
        onValueChange={value => setTaskAccess(value)}
      >
        <Picker.Item label="Public" value="public" />
        <Picker.Item label="Privé" value="private" />
      </Picker>
      <TextInput
        value={taskNotes}
        onChangeText={text => setTaskNotes(text)}
        placeholder="Notes"
      />
      <TextInput
        value={taskUrl}
        onChangeText={text => setTaskUrl(text)}
        placeholder="URL"
      />
      <Button
        title="Enregistrer les modifications"
        onPress={() => updateTask({ id: task.id, name: taskName, access: taskAccess, notes: taskNotes, url: taskUrl })}
      />
      <View>
        {task.checkboxes.map(checkbox => (
          <View key={checkbox.id}>
            <Text>{checkbox.label}</Text>
            <Button title="Modifier" onPress={() => console.log('Modification du checkbox non implémentée')} />
            <Button title="Supprimer" onPress={() => deleteCheckbox(task.id, checkbox.id)} />
          </View>
        ))}
      </View>
      <TextInput
        value={checkboxLabel}
        onChangeText={text => setCheckboxLabel(text)}
        placeholder="Label du checkbox"
      />
      <Button
        title="Ajouter un checkbox"
        onPress={() => addCheckbox(task.id, { id: uuid(), label: checkboxLabel })}
      />
      <Button title="Dupliquer la tâche" onPress={() => duplicateTask(task.id)} />
    </View>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  updateTask,
  addCheckbox,
  updateCheckbox,
  deleteCheckbox,
  duplicateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tache);
