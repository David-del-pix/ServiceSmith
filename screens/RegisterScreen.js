import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

const mockUsers = [{ email: 'test@example.com' }]; // Simulating existing users

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    const userExists = mockUsers.find(user => user.email === email);
    if (userExists) {
      Alert.alert('Error', 'Account already exists. Please log in.');
      return;
    }

    // Simulating successful registration
    mockUsers.push({ email, name, password });
    Alert.alert('Success', 'Account created successfully!', [
      { 
        text: 'OK', 
        onPress: () => {
          navigation.replace('MainApp'); // ✅ Use replace instead of reset
        } 
      }
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create an Account</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Full Name" 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          keyboardType="email-address" 
          value={email} 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          secureTextEntry 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
  },
  input: { 
    width: '100%', 
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 10, 
    padding: 10,
  },
  button: { 
    width: '100%', 
    height: 50, 
    backgroundColor: '#007bff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 10,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  linkText: { 
    color: '#007bff', 
    marginTop: 15,
  }
});

export default RegisterScreen;
