import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ProfileContext } from '../ProfileContext';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation }) {
  const { profile, setProfile } = useContext(ProfileContext);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdatedProfile({ ...updatedProfile, image: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    setProfile(updatedProfile);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Edit Your Profile</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Image source={{ uri: updatedProfile.image }} style={styles.profileImage} />
          <Text style={styles.imageText}>Change Profile Picture</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.name}
          onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, name: text })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.email}
          onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, email: text })}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.phone}
          onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, phone: text })}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.dob}
          onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, dob: text })}
        />

        <Text style={styles.label}>Citizenship</Text>
        <TextInput
          style={styles.input}
          value={updatedProfile.citizenship}
          onChangeText={(text) => setUpdatedProfile({ ...updatedProfile, citizenship: text })}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  imageText: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
