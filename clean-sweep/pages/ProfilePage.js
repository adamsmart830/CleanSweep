import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectProfilePicture = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setProfilePic(source);
      }
    });
  };

  const handleSubmit = async () => {
    if (!name.trim() || !bio.trim()) {
      Alert.alert('Validation Failed', 'Please fill all the fields.');
      return;
    }
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(`Profile for ${name} updated.`);
      console.log('Profile submitted', { name, bio, profilePic });
    }, 2000);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Enter your name" />
      <TextInput style={[styles.input, { height: 100 }]} onChangeText={setBio} value={bio} placeholder="Enter a short bio" multiline={true} numberOfLines={4} />
      <TouchableOpacity style={styles.profilePicContainer} onPress={selectProfilePicture}>
        {profilePic ? (
          <Image source={profilePic} style={styles.profilePic} />
        ) : (
          <Text style={styles.profilePicPlaceholder}>Select Profile Picture</Text>
        )}
      </TouchableOpacity>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccffcc',
  },
  // Add more styles as needed
});
