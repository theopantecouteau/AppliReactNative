import { createStackNavigator } from 'react-navigation-stack';
import Tache from './Tache';
import TodoList from './TodoList';

const AppNavigator = createStackNavigator({
  TodoList: {
    screen: TodoList,
  },
  Tache: {
    screen: Tache,
  },
});

export default AppNavigator;
