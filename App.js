import * as React from "react";
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from "./src/screens/TodoList";
import HomeScreen from "./src/screens/HomeScreen";
import AddressBook from "./src/screens/AddressBook";
import ShoppingList from "./src/screens/ShoppingList";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="TodoList"
            component={TodoList}
          />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingList}
          />
          <Stack.Screen
            name="AddressBook"
            component={AddressBook}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 30,
  },
  header : {
    backgroundColor : 'red'
  }
});
