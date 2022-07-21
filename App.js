import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    //Keyboard.dismiss(); // butona bastıktan sonra keyboard kapanır
    // önceki task'lere ek olarak yeni task'i ekle
    setTaskItems([...taskItems, task]);
    setTask(null); // ekledikten sonra task bilgisini temizle
  };

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); // remove işlemine index'ten başla ve 1 item remove et. Yani sadece belirtilen index remove edilecek
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <ScrollView>
          <View style={styles.items}>
            {/* tasks will be placed here */}
            {/* iterate through the taskItems array */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  items: {
    marginTop: 20,
    marginBottom: 120,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e8eaedaa',
  },
  input: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    borderColor: '#B2B2B2',
    borderWidth: 2,
    fontSize: 18,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 30,
  },
});
