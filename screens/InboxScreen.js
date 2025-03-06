// InboxScreen.js (Modified)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InboxScreen({ route, navigation }) {
  const { task, provider } = route.params; // Receiving task and provider details from previous screen

  const [messages, setMessages] = useState([
    { id: 1, sender: 'customer', text: 'Hello, I have a question about the task.' },
    { id: 2, sender: 'provider', text: 'Hi! How can I help you?' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'customer', text: newMessage }]);
      setNewMessage('');
      Keyboard.dismiss(); // Dismiss the keyboard after sending the message
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="chatbubbles" size={30} color="#fff" />
          <Text style={styles.headerTitle}>Inbox</Text>
        </View>

        <ScrollView contentContainerStyle={styles.messageContainer} keyboardShouldPersistTaps="handled">
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.message,
                message.sender === 'customer' ? styles.customerMessage : styles.providerMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            onFocus={() => {}}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messageContainer: {
    padding: 20,
  },
  message: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  customerMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-start',
  },
  providerMessage: {
    backgroundColor: '#e9ecef',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 15,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});
