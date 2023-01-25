import React, { useState } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import { connect } from 'react-redux';
import { createTask, deleteTask, toggleCheckboxes } from './actions';
import Tache from './Tache';

function TodoList({ tasks, createTask, deleteTask, toggleCheckboxes, navigation }) {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskAccess, setNewTaskAccess] = useState('public');

  return (
    <View>
      <TextInput
        value={newTaskName}
        onChangeText={text => setNewTaskName(text)}
        placeholder="Nom de la tâche"
      />
      <Picker
        selectedValue={newTaskAccess}
        onValueChange={itemValue => setNewTaskAccess(itemValue)}
      >
        <Picker.Item label="Public" value="public" />
        <Picker.Item label="Privé" value="private" />
      </Picker>
      <Button
        title="Créer une tâche"
        onPress={() => createTask({ id: uuid(), name: newTaskName, access: newTaskAccess })}
      />
      <View>
        {tasks.map(task => (
          <View key={task.id}>
            <Text>{task.name}</Text>
            <Button
              title={task.showCheckboxes ? 'Masquer les checkboxes' : 'Afficher les checkboxes'}
              onPress={() => toggleCheckboxes(task.id)}
            />
            {task.showCheckboxes && (
              <View>
                {task.checkboxes.map(checkbox => (
                  <View key={checkbox.id}>
                    <Text>{checkbox.label}</Text>
                  </View>
                ))}
              </View>
            )}
            <Button title="Modifier" onPress={() => console.log('Modification de la tâche non implémentée')} />
            <Button title="Dupliquer" onPress={() => console.log('Duplication de la tâche non implémentée')} />
            <Button title="Supprimer" onPress={() => deleteTask(task.id)} />
            <Button
              title="Détails"
              onPress={() => navigation.navigate('Tache', { task })}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  createTask,
  deleteTask,
  toggleCheckboxes,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
