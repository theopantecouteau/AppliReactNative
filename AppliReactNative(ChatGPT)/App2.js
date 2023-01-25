import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import TodoList from './TodoList';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <View>
        <TodoList />
      </View>
    </Provider>
  );
}

export default App;
