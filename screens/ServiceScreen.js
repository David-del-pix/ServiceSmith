// ServiceScreen.js (Modified)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServiceScreen({ route, navigation }) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="briefcase" size={40} color="#fff" />
        <Text style={styles.headerTitle}>{task.description}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Progress: <Text style={styles.boldText}>{task.progress}%</Text></Text>
        <Text style={styles.detailText}>Price: <Text style={styles.boldText}>{task.price}</Text></Text>
        <Text style={styles.detailText}>Provider: <Text style={styles.boldText}>{task.provider}</Text></Text>
        <Text style={styles.detailText}>Task Description: <Text style={styles.boldText}>{task.description}</Text></Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="checkmark-done" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Mark as Completed</Text>
        </TouchableOpacity>

        {/* Contact Provider Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('InboxScreen', { task: task, provider: task.provider })}
        >
          <Ionicons name="chatbox-ellipses" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Contact Provider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  actionContainer: {
    paddingHorizontal: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
