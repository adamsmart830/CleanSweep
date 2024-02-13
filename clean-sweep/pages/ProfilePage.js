import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button, Image } from 'react-native';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null); // This could be a URI to the image

  const handleSubmit = () => {
    // Implement what happens when a user submits their profile details
    console.log('Profile submitted', { name, bio, profilePic });
    alert(`Profile for ${name} updated.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />

      <TextInput
        style={[styles.input, {height: 100}]} // Increased height for bio input
        onChangeText={setBio}
        value={bio}
        placeholder="Enter a short bio"
        multiline={true} // Allows multiple lines of text
        numberOfLines={4} // Adjust as needed
      />

      {/* Placeholder for Profile Picture selection - implement as needed */}
      <View style={styles.profilePicContainer}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <Text style={styles.profilePicPlaceholder}>Profile Picture Placeholder</Text>
        )}
        {/* You could add a button here to upload or take a photo */}
      </View>

      <Button title="Update Profile" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccffcc', // Consistent with the ReportPage
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 10,
    borderColor: '#007bff',
    backgroundColor: '#ffffff',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  profilePicContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e9e9e9', // Placeholder color
    overflow: 'hidden', // Ensures the image fits within the border radius
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  profilePicPlaceholder: {
    color: '#666',
  },
  // Add more styles as needed
});
