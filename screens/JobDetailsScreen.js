import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore DB

const JobDetailsScreen = ({ route, navigation }) => {
    const job = route.params?.job;
    if (!job) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: No job data found.</Text>
            </View>
        );
    }

    const [status, setStatus] = useState(job.status);

    const updateStatus = async (newStatus) => {
        if (!job.id) {
            Alert.alert("Error", "Job ID not found.");
            return;
        }

        try {
            const jobRef = doc(db, "jobs", job.id);
            await updateDoc(jobRef, { status: newStatus });
            setStatus(newStatus);
            Alert.alert("Success", `Status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            Alert.alert("Error", "Failed to update status. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{job.taskName}</Text>
            <Text style={styles.text}>Price: {job.taskPrice}</Text>
            <Text style={styles.text}>Status: {status}</Text>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "orange" }]}
                onPress={() => updateStatus("In Progress")}
            >
                <Text style={styles.buttonText}>Mark as In Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => updateStatus("Completed")}
            >
                <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    text: { fontSize: 18, marginBottom: 10 },
    button: { padding: 12, borderRadius: 5, marginTop: 20, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    errorText: { color: "red", fontSize: 18, textAlign: "center", marginTop: 20 },
});

export default JobDetailsScreen;
