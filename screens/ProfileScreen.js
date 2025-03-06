import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { ProfileContext } from '../ProfileContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { profile, setProfile } = useContext(ProfileContext);
  const [taskHistory, setTaskHistory] = useState([
    { id: 1, description: 'Shoveling Snow', completed: false, progress: 30, price: '$50', provider: 'John Doe' },
    { id: 2, description: 'Sanding Furniture', completed: true, progress: 100, price: '$70', provider: 'Jane Smith' },
    { id: 3, description: 'Salting Driveway', completed: false, progress: 0, price: '$40', provider: 'Mike Johnson' },
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, image: result.assets[0].uri });
    }
  };

  const markTaskAsCompleted = (taskId) => {
    const updatedTaskHistory = taskHistory.map((task) =>
      task.id === taskId ? { ...task, completed: true, progress: 100 } : task
    );
    setTaskHistory(updatedTaskHistory);
  };

  const navigateToServiceScreen = (taskId) => {
    const task = taskHistory.find((task) => task.id === taskId);
    navigation.navigate('ServiceScreen', { task });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.userEmail}>{profile.email}</Text>
        <Text style={styles.userDetail}>📞 {profile.phone}</Text>
        <Text style={styles.userDetail}>🎂 {profile.dob}</Text>
        <Text style={styles.userDetail}>🌎 {profile.citizenship}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskHistory}>
        <Text style={styles.taskHistoryTitle}>Task History</Text>
        {taskHistory.map((task) => (
          <View
            key={task.id}
            style={[styles.taskItem, task.completed ? styles.completedTask : styles.pendingTask]}
          >
            <TouchableOpacity onPress={() => navigateToServiceScreen(task.id)}>
              <Text style={styles.taskText}>{task.description}</Text>
              <Text style={styles.taskSubText}>Progress: {task.progress}%</Text>
              <Text style={styles.taskSubText}>Price: {task.price}</Text>
              <Text style={styles.taskSubText}>Provider: {task.provider}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.completeButton, task.completed && styles.disabledButton]}
              onPress={() => !task.completed && markTaskAsCompleted(task.id)}
              disabled={task.completed}
            >
              <Text style={styles.completeButtonText}>
                {task.completed ? 'Completed' : 'Mark as Completed'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 16,
    color: '#f1f1f1',
  },
  userDetail: {
    fontSize: 14,
    color: '#f1f1f1',
    marginBottom: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056b3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  taskHistory: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  taskHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskSubText: {
    fontSize: 14,
    color: '#6c757d',
  },
  completedTask: {
    backgroundColor: '#d4edda',
  },
  pendingTask: {
    backgroundColor: '#fff3cd',
  },
  completeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 5,
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
