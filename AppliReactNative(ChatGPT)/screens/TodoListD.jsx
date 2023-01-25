import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { createTask, deleteTask, toggleCheckboxes } from './actions';

function TodoList({ tasks, createTask, deleteTask, toggleCheckboxes }) {
  return (
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
      </View>
    ))}
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

