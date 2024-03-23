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
  Switch,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const keys = ['name', 'bio', 'profilePic', 'email', 'darkMode', 'privateProfile', 'skills'];
    const data = await AsyncStorage.multiGet(keys);
    const profileData = Object.fromEntries(data.map(([key, value]) => [key, JSON.parse(value)]));

    setName(profileData.name || '');
    setBio(profileData.bio || '');
    setEmail(profileData.email || '');
    setProfilePic(profileData.profilePic);
    setDarkMode(profileData.darkMode || false);
    setPrivateProfile(profileData.privateProfile || false);
    setSkills(profileData.skills || []);
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
      await AsyncStorage.multiSet([
        ['name', name],
        ['bio', bio],
        ['email', email],
        ['profilePic', JSON.stringify(profilePic)],
        ['darkMode', JSON.stringify(darkMode)],
        ['privateProfile', JSON.stringify(privateProfile)],
        ['skills', JSON.stringify(skills)],
      ]);
    }, 2000);
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
    }
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

      <View style={styles.switchContainer}>
        <Text>Dark Mode:</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Private Profile:</Text>
        <Switch value={privateProfile} onValueChange={setPrivateProfile} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add a skill"
        onSubmitEditing={({ nativeEvent }) => addSkill(nativeEvent.text)}
        returnKeyType="done"
        />
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.skillTag}>{skill}</Text>
          ))}
        </View>
  
        <Button title="Update Profile" onPress={handleSubmit} color={darkMode ? '#000' : '#007bff'} />
  
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
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginVertical: 10,
    },
    skillTag: {
      backgroundColor: '#dedede',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      margin: 5,
      fontSize: 14,
    },
  });
  
  
