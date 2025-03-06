import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const services = [
    { id: '1', name: 'Shoveling', category: 'Outdoor Work', price: '$20–$50/hr', image: require('../assets/shoveling.jpg') },
    { id: '2', name: 'Sanding', category: 'Outdoor Work', price: '$15–$40/hr', image: require('../assets/sanding.jpg') },
    { id: '3', name: 'Salting', category: 'Outdoor Work', price: '$10–$30/task', image: require('../assets/salting.jpg') },
    { id: '4', name: 'Plowing', category: 'Outdoor Work', price: '$50–$100/driveway', image: require('../assets/plowing.jpg') },
    { id: '5', name: 'Snow Removal', category: 'Outdoor Work', price: '$50–$150/task', image: require('../assets/snow_removal.jpg') },
    { id: '6', name: 'Lawn Mowing', category: 'Outdoor Work', price: '$30–$60/hr', image: require('../assets/lawn_mowing.jpg') },
    { id: '7', name: 'Painting', category: 'Repairs', price: '$1.50–$3.50/sq. ft.', image: require('../assets/painting.jpg') },
    { id: '8', name: 'Movers', category: 'Cleaning', price: '$25–$50/hr', image: require('../assets/movers.jpg') },
    { id: '9', name: 'Cleaning', category: 'Cleaning', price: '$20–$50/hr', image: require('../assets/cleaning.jpg') },
    { id: '10', name: 'Nanny Services', category: 'Cleaning', price: '$15–$30/hr', image: require('../assets/nanny_services.jpg') },
    { id: '11', name: 'Flooring', category: 'Repairs', price: '$3–$10/sq. ft.', image: require('../assets/flooring.jpg') },
    { id: '12', name: 'Drywall Repair', category: 'Repairs', price: '$50–$100/patch', image: require('../assets/drywall_repair.jpg') },
    { id: '13', name: 'Furniture Assembly', category: 'Repairs', price: '$30–$75/task', image: require('../assets/furniture_assembly.jpg') },
    { id: '14', name: 'Window Cleaning', category: 'Cleaning', price: '$5–$10/window', image: require('../assets/window_cleaning.jpg') },
    { id: '15', name: 'Handyman Repairs', category: 'Repairs', price: '$50–$100/hr', image: require('../assets/handyman_repairs.jpg') },
    { id: '16', name: 'Electrical Repairs', category: 'Repairs', price: '$50–$120/hr', image: require('../assets/electrical_repairs.jpg') },
    { id: '17', name: 'Plumbing Services', category: 'Repairs', price: '$60–$150/hr', image: require('../assets/plumbing_services.jpg') },
    { id: '18', name: 'Gutter Cleaning', category: 'Cleaning', price: '$70–$200/job', image: require('../assets/gutter_cleaning.jpg') },
    { id: '19', name: 'Pressure Washing', category: 'Cleaning', price: '$0.15–$0.50/sq. ft.', image: require('../assets/pressure_washing.jpg') },
    { id: '20', name: 'Appliance Installation', category: 'Repairs', price: '$50–$150/task', image: require('../assets/appliance_installation.jpg') },
];

const categories = ['All', 'Cleaning', 'Repairs', 'Outdoor Work'];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(id)
                ? prevFavorites.filter((fav) => fav !== id)
                : [...prevFavorites, id]
        );
    };

    const filteredServices = services.filter(service =>
        (selectedCategory === 'All' || service.category === selectedCategory) &&
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Available Services</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search jobs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category} 
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]} 
              onPress={() => setSelectedCategory(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Text style={styles.favorite}>{favorites.includes(item.id) ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('JobCreationScreen', { service: item })}>
                <Text style={styles.buttonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#333' },
  searchBar: { padding: 10, margin: 10, borderWidth: 1, borderRadius: 5, backgroundColor: '#fff' },
  categoryContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  categoryButton: { padding: 8, marginHorizontal: 5, borderRadius: 5, backgroundColor: '#ccc' },
  selectedCategory: { backgroundColor: '#007bff' },
  categoryText: { color: '#fff', fontWeight: 'bold' },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 10, margin: 5, alignItems: 'center', elevation: 5 },
  image: { width: 100, height: 100, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  price: { fontSize: 14, color: '#555', marginTop: 2 },
  button: { marginTop: 10, backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  favorite: { fontSize: 24, marginTop: 5 },
});

export default HomeScreen;
