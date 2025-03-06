import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const taskers = [
    { id: '1', name: 'John Doe', rating: 4.8, price: '$20/hr' },
    { id: '2', name: 'Jane Smith', rating: 4.6, price: '$25/hr' },
    { id: '3', name: 'Mike Johnson', rating: 4.7, price: '$22/hr' },
];

const TaskerSelectionScreen = ({ navigation }) => {
    const handleSelectTasker = (tasker) => {
        // Navigate back to the Jobs tab and pass the selected tasker
        navigation.navigate('JobCreationScreen', { selectedTasker: tasker });
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 }}>
                Select a Tasker
            </Text>
            <FlatList
                data={taskers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 15,
                            borderBottomWidth: 1,
                            borderColor: '#ddd',
                            backgroundColor: '#f9f9f9',
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        onPress={() => handleSelectTasker(item)}
                    >
                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 15 }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ color: '#555' }}>⭐ {item.rating} | {item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default TaskerSelectionScreen;
