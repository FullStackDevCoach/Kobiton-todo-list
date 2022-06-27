import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';
import logo from './assets/logo.png';
import {Camera, useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {FAB, IconButton, Modal, Portal, Provider as PaperProvider} from 'react-native-paper';
import {TakeSnapshotOptions} from 'react-native-vision-camera';
import {TakePhotoOptions} from 'react-native-vision-camera';
// import {useSharedValue} from 'react-native-reanimated';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [isCameraModelVisible, setIsCameraModalVisible] = useState(false);
  const devices = useCameraDevices()
  const device = devices.back;
  const cameraRef = useRef(null);
  const takePhotoOptions = {
    photoCodec: 'jpeg',
    qualityPrioritization: 'speed',
    flash: 'on',
    quality: 90,
    skipMetadata: true,
  };
  // const isPressingButton = useSharedValue(false);

  useEffect(() => {
    (async () => {
      const hasCameraPermission = await Camera.getCameraPermissionStatus();
      const hasMicrophonePermission = await Camera.getMicrophonePermissionStatus();
      if(hasCameraPermission) {
        console.log('permission', hasCameraPermission);
        setCameraPermission(true);
      }

      if(hasMicrophonePermission) {
        console.log('permission', hasMicrophonePermission);
        setAudioPermission(true);
      }

      if(cameraPermission) {
        const newCameraPermission = await Camera.requestCameraPermission()
        console.log('permission', newCameraPermission);
        if(newCameraPermission === 'authorized'){
          setCameraPermission(true);
        }
      }
      if(!audioPermission) {
        const newMicrophonePermission = await Camera.requestMicrophonePermission();
        console.log('permission', newMicrophonePermission);
        if(newMicrophonePermission === 'authorized'){
          setAudioPermission(true);
        }
      }
    })()
  })

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    console.log('frame check', frame)
  }, []);

  const takePhoto = useCallback(async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null!');

      console.log('Taking photo...');
      const photo = await cameraRef.current.takePhoto(takePhotoOptions);
      console.log('Taking photo...', photo.height);
      setIsCameraModalVisible(false);
      let currentTask = {
        type: 'image',
        content: photo.path,
      }

      setTimeout(() => {
        setTasks([...tasks, currentTask]);
      }, 1000)
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [cameraRef, takePhotoOptions]);

  const addTask = (task) => {
    if (task == null) return;

    let currentTask = {
      type: 'text',
      content: task,
    }

    setTimeout(() => {
      setTasks([...tasks, currentTask]);
    }, 1000)

    Keyboard.dismiss();
  }

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  }

  return (
      <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>To Do</Text>
          <Image source={logo} style={styles.logo} />
        </View>
        <ScrollView style={styles.scrollView}>

          {
            tasks.reverse().map((task, index) => {
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
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => setIsCameraModalVisible(!isCameraModelVisible)}
        />
      </View>
        <Portal>
          <Modal visible={isCameraModelVisible}
                 onDismiss={() => setIsCameraModalVisible(false)}
                 contentContainerStyle={{...styles.modalContainerStyle,
                   width: Dimensions.get('window').width,
                   height: Dimensions.get('window').height
          }}>
            <>
              {
                (device != null)
                    ?
                    <Camera
                        ref={cameraRef}
                        // frameProcessor={frameProcessor}
                        style={styles.absoluteFill}
                        device={device}
                        enableZoomGesture={true}
                        photo={true}
                        isActive={true}
                    />
                    : <Text>Camera not supported in this device</Text>
              }
              <TouchableOpacity onPress={() => takePhoto()}>
                <View style={{...styles.cameraButton, left: (Dimensions.get('window').width/ 2) - 30}}>
                </View>
              </TouchableOpacity>
              <View style={styles.cameraBackBtn}>
                <IconButton
                    icon="arrow-left"
                    iconColor='white'
                    size={25}
                    onPress={() => setIsCameraModalVisible(false)}
                />
              </View>
            </>
          </Modal>
        </Portal>
      </PaperProvider>
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 100,
  },
  modalContainerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  absoluteFill: {
    flex: 1
  },
  cameraButton: {
    position: 'absolute',
    bottom: 32,
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30
  },
  cameraBackBtn: {
    position: 'absolute',
    top: 32,
    left: 16
  }
});
