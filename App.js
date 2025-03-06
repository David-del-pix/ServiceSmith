import React from 'react';
import { ProfileProvider } from './ProfileContext';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider
import { AuthProvider } from './contexts/AuthContext';  // Import AuthProvider
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider> {/* Make sure AuthProvider wraps the entire app */}
      <ProfileProvider>
        <ThemeProvider> {/* Wrap the app with ThemeProvider */}
          <AppNavigator />
        </ThemeProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
