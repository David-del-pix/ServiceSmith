import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import JobCreationScreen from '../screens/JobCreationScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import MainAppScreen from '../screens/MainAppScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ServiceScreen from '../screens/ServiceScreen';
import InboxScreen from '../screens/InboxScreen';
import TaskerSelectionScreen from '../screens/TaskerSelectionScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import JobListScreen from '../screens/JobListScreen';

// Import AuthContext
import { AuthContext } from '../contexts/AuthContext';  // Make sure you import it here

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Jobs':
              iconName = 'briefcase';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'help-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Jobs" component={JobCreationScreen} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

// Main Navigator (Stack + Tabs)
export default function AppNavigator() {
  const { isLoggedIn } = useContext(AuthContext);  // Access the isLoggedIn value from context

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Login"} screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            // User is logged in, show Main App Screen
            <Stack.Screen name="Main" component={TabNavigator} />
          ) : (
            // User is not logged in, show Login Screen
            <Stack.Screen name="Login" component={LoginScreen} />
          )}

          {/* Other Screens */}
          <Stack.Screen name="JobCreationScreen" component={JobCreationScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
          <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
          <Stack.Screen name="InboxScreen" component={InboxScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
          <Stack.Screen name="TaskerSelectionScreen" component={TaskerSelectionScreen} />
          <Stack.Screen name="JobListScreen" component={JobListScreen} />
          <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

          <Stack.Screen name="MainApp" component={MainAppScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
