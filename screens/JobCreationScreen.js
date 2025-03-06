import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const JobCreationScreen = ({ route, navigation }) => {
    const service = route.params?.service || {};

    const [taskName, setTaskName] = useState(service.name || "");
    const [taskPrice, setTaskPrice] = useState(service.price || "");
    const [taskImage, setTaskImage] = useState(service.image ? [service.image] : []);
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, setTaskDeadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [taskCategory, setTaskCategory] = useState("General");
    const [taskStatus, setTaskStatus] = useState("Pending");
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setTaskImage([...taskImage, ...result.assets.map(asset => ({ uri: asset.uri }))]);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setTaskDeadline(selectedDate);
        }
    };

    const handlePostTask = async () => {
        const newTask = {
            name: taskName,
            price: taskPrice,
            description: taskDescription,
            deadline: taskDeadline.toDateString(),
            category: taskCategory,
            status: taskStatus,
            images: taskImage,
        };
    
        try {
            await addDoc(collection(db, "jobs"), newTask);
            console.log("Task successfully added to Firestore!");
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate("HomeScreen");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Create a Task</Text>
                {taskImage.length > 0 && taskImage.map((img, index) => (
                    <Image key={index} source={img} style={styles.image} />
                ))}
                <TextInput 
                    style={styles.input} 
                    placeholder="Task Name" 
                    value={taskName} 
                    onChangeText={setTaskName} 
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Price" 
                    value={taskPrice} 
                    onChangeText={setTaskPrice} 
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Task Description" 
                    multiline 
                    value={taskDescription} 
                    onChangeText={setTaskDescription} 
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                    <Text style={styles.datePickerText}>Select Deadline: {taskDeadline.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={taskDeadline}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <Picker
                    selectedValue={taskCategory}
                    onValueChange={(itemValue) => setTaskCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="General" value="General" />
                    <Picker.Item label="Cleaning" value="Cleaning" />
                    <Picker.Item label="Delivery" value="Delivery" />
                    <Picker.Item label="Repair" value="Repair" />
                </Picker>
                <Picker
                    selectedValue={taskStatus}
                    onValueChange={(itemValue) => setTaskStatus(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="In Progress" value="In Progress" />
                    <Picker.Item label="Completed" value="Completed" />
                </Picker>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadText}>Upload Task Images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePostTask}>
                    <Text style={styles.buttonText}>Post Task</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" },
    input: { backgroundColor: "#fff", padding: 10, marginVertical: 10, borderRadius: 5, borderWidth: 1, borderColor: "#ccc" },
    button: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginTop: 20, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    uploadButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, marginTop: 10, alignItems: "center" },
    uploadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    image: { width: 200, height: 200, alignSelf: "center", borderRadius: 10, marginBottom: 10 },
    picker: { backgroundColor: "#fff", marginVertical: 10, borderRadius: 5 },
    datePickerButton: { backgroundColor: "#ff9800", padding: 10, borderRadius: 5, marginVertical: 10, alignItems: "center" },
    datePickerText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});

export default JobCreationScreen;
