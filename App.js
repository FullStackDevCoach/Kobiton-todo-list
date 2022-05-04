import React, {useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';
import logo from './assets/logo.png'; 

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task == null) return;
    setTimeout(() => {
      setTasks([...tasks, task]);
    }, 6 * 1000)

    Keyboard.dismiss();
  }

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.heading}>To Do</Text>
          <Image source={logo} style={styles.logo} />
      </View>
      <ScrollView style={styles.scrollView}>
        
        {
        tasks.map((task, index) => {
          return (
             index === 1 ?
                 <View key={index} style={styles.taskContainer}>
                   <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(index)}/>
                 </View>
                 :
            <View key={index} style={styles.taskContainer}>
              <TaskItem index={index + 1} task={task} deleteTask={() => deleteTask(index)}/>
            </View>
          );
        })
      }
      </ScrollView>
      <TaskInputField addTask={addTask}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  header: {
    justifyContent: 'space-between',
    padding: 8,
    flexDirection:'row',
    alignItems:'center',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  logo: {
    width: 30, 
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    // marginTop: 20,
  }
});
