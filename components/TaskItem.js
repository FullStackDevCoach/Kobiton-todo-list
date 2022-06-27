import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FAB} from 'react-native-paper';

export default TaskItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.indexContainer}>
                {/*<Text style={props.index === 2 ? {...styles.index, color: 'rgba(255, 255, 255, 0.3)'} : styles.index}>{props.index}</Text>*/}
                <Text style={styles.index}>{props.index}</Text>
            </View>
            <View style={styles.taskContainer}>
                {/*<Text style={props.index === 2 ? {...styles.task, color: 'rgba(255, 255, 255, 0.3)'} : styles.task}>{props.task}</Text>*/}

                {
                    props.task.type === "text"
                        ?
                        <Text style={ styles.task}>{props.task.content}</Text>
                        :
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{ uri: props.task.content }}
                        />
                }


                <TouchableOpacity onPress={() => props.deleteTask()}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    indexContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    index: {
        color: '#fff',
        fontSize: 20,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
        marginRight: -10
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
    image: {
        width: '90%',
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    }
});
