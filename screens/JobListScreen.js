import React, { useState, useEffect } from "react";
import { 
    View, Text, FlatList, TouchableOpacity, 
    StyleSheet, ActivityIndicator 
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; 

const JobListScreen = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "jobs"),
            (snapshot) => {
                setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching jobs:", err);
                setError("Failed to load jobs. Please try again.");
                setLoading(false);
            }
        );

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Job List</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : jobs.length === 0 ? (
                <Text style={styles.noJobsText}>No jobs available</Text>
            ) : (
                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.jobItem} 
                            onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
                        >
                            <Text style={styles.jobTitle}>{item.name || item.taskName}</Text>
                            <Text>Status: {item.status}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    jobItem: { padding: 15, backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, elevation: 3 },
    jobTitle: { fontSize: 18, fontWeight: "bold" },
    errorText: { color: "red", textAlign: "center", marginTop: 10 },
    noJobsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
});

export default JobListScreen;
