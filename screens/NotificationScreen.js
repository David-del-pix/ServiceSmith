import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'success', message: 'Your profile was updated successfully!', icon: 'checkmark-circle' },
    { id: '2', type: 'warning', message: 'Your password will expire soon.', icon: 'warning' },
    { id: '3', type: 'alert', message: 'New login detected from a different device.', icon: 'alert-circle' },
  ]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const renderNotification = ({ item }) => {
    return (
      <View style={[styles.notificationCard, styles[item.type]]}>
        <Ionicons name={item.icon} size={24} color="#fff" style={styles.icon} />
        <Text style={styles.message}>{item.message}</Text>
        <TouchableOpacity onPress={() => removeNotification(item.id)}>
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Notifications</Text>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
        />
      ) : (
        <Text style={styles.noNotification}>No new notifications 📭</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  success: { backgroundColor: '#28a745' }, // Green
  warning: { backgroundColor: '#ffc107' }, // Yellow
  alert: { backgroundColor: '#dc3545' }, // Red
  icon: { marginRight: 10 },
  message: { color: '#fff', flex: 1, fontSize: 16 },
  noNotification: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 20,
  },
});
