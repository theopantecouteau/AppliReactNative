import { createStackNavigator } from 'react-navigation-stack';
import Tache from './Tache';
import TodoList from './TodoList';

const AppNavigator = createStackNavigator({
  TodoList: {
    screen: TodoList,
    navigationOptions: {
      title: 'Liste de tâches',
    },
  },
  Tache: {
    screen: Tache,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('task').name,
    }),
  },
});

export default AppNavigator;
