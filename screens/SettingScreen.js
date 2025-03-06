// SettingScreen.js 

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LightTheme, CustomDarkTheme } from '../theme'; // Ensure theme.js exports these correctly

export default function SettingScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();
  
  // Select theme based on state
  const theme = isDarkMode ? CustomDarkTheme : LightTheme;

  useEffect(() => {
    console.log(`Theme changed to: ${isDarkMode ? 'Dark' : 'Light'}`);
  }, [isDarkMode]);

  const handleNotificationToggle = () => setIsNotificationsEnabled(prev => !prev);

  const handleChangeTheme = () => {
    setIsDarkMode(prev => !prev);
    Alert.alert('Theme changed', `You have switched to ${!isDarkMode ? 'Dark' : 'Light'} mode`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.header, { color: theme.colors.text }]}>Settings</Text>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>User Profile</Text>
          <TouchableOpacity style={styles.profileCard} onPress={() => navigation.navigate('Profile')}>
            <Text style={[styles.profileText, { color: theme.colors.primary }]}>View/Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.settingSection}>
          <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text style={{ color: theme.colors.text }}>Enable Notifications</Text>
            <Switch value={isNotificationsEnabled} onValueChange={handleNotificationToggle} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <Text style={styles.linkText}>Go to Notification Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Theme Section */}
        <View style={styles.settingSection}>
          <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>Theme</Text>
          <View style={styles.settingRow}>
            <Text style={{ color: theme.colors.text }}>Current Theme: {isDarkMode ? 'Dark' : 'Light'}</Text>
            <Switch value={isDarkMode} onValueChange={handleChangeTheme} />
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.settingSection}>
          <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>Security</Text>
          <View style={styles.settingRow}>
            <Text style={{ color: theme.colors.text }}>Change Password</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
              <Text style={styles.linkText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback Section */}
        <View style={styles.settingSection}>
          <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Give your feedback..."
            placeholderTextColor={theme.colors.placeholder}
            multiline
          />
          <Button title="Submit Feedback" onPress={() => Alert.alert('Feedback Submitted')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  settingSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 16,
  },
  feedbackInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

