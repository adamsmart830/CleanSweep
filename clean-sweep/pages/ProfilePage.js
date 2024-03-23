import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const data = await AsyncStorage.multiGet(['name', 'bio', 'profilePic', 'email']);
    const profileData = Object.fromEntries(data);
    if (profileData.name) setName(profileData.name);
    if (profileData.bio) setBio(profileData.bio);
    if (profileData.profilePic) setProfilePic(JSON.parse(profileData.profilePic));
    if (profileData.email) setEmail(profileData.email);
  };

  const selectProfilePicture = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', response.error);
      } else {
        const source = { uri: response.uri };
        setProfilePic(source);
      }
    });
  };

  const handleSubmit = async () => {
    if (!name.trim() || !bio.trim() || !email.trim()) {
      Alert.alert('Validation Failed', 'Please fill all the fields.');
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      Alert.alert(`Profile for ${name} updated.`);
      console.log('Profile submitted', { name, bio, email, profilePic });
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('bio', bio);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('profilePic', JSON.stringify(profilePic));
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>

      <TouchableOpacity style={styles.profilePicContainer} onPress={selectProfilePicture}>
        {profilePic ? (
          <Image source={profilePic} style={styles.profilePic} />
        ) : (
          <Icon name="user-circle" size={100} color="#666" />
        )}
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          onChangeText={setBio}
          value={bio}
          placeholder="Enter a short bio"
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <Button title="Update Profile" onPress={handleSubmit} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  profilePicContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e9e9e9',
    overflow: 'hidden',
    },
    profilePic: {
    width: '100%',
    height: '100%',
    },
    formContainer: {
    width: '100%',
    alignItems: 'center',
    },
    loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    },
    });
 
    
