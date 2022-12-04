import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
      <View style={styles.header}>
        <Text>Quiz</Text>
      </View>
  );
}
const stateTache = [
  "ToDo",
  "Pending",
  "Done"
];
class Tache extends Component {
  state = { 
    currentState : 0,
    nom : this.props.nom,
    membres : this.props.membres,
    desc : this.props.desc,
    
  };


  render() {
    return (
      <Text>Hello, I am your cat!</Text>
    );
  }
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
