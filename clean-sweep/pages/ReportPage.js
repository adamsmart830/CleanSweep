import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";

export default function ReportPage() {
  const [location, setLocation] = useState(null);
  const [selectedMessType, setSelectedMessType] = useState('');
  const [customMessType, setCustomMessType] = useState(''); // For storing custom message type
  const [isCustomMessTypeVisible, setIsCustomMessTypeVisible] = useState(false); // To show/hide TextInput
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const messTypes = ['Trash', 'Graffiti', 'Other'];

  const handleMessTypeSelection = (type) => {
    if (type === 'Other') {
      setIsCustomMessTypeVisible(true);
      setSelectedMessType('');
    } else {
      setIsCustomMessTypeVisible(false);
      setSelectedMessType(type);
    }
  };

  const handleSubmit = async () => {
    try {
        // Assume customMessType is used if selectedMessType is empty
        const messType = selectedMessType || customMessType;
        const newReport = { type: messType, location: [location.latitude, location.longitude] }; 

        // POST request
        const res = await axios.post(`http://localhost:3500/reports`, newReport)

        // Handle response 
        res.status(201).send("Report saved successfully.");
        //console.log('Report submitted successfully:', response.data);
    } catch (err) {
        res.status(500).send("Error submitting report: ", err);
        //console.error('Error submitting report:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Report an Issue
        </Text> 
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Report Location"
            />
          </MapView>
          <View style={styles.buttonContainer}>
            {messTypes.map((type) => (
              <TouchableOpacity key={type} style={styles.button} onPress={() => handleMessTypeSelection(type)}>
                <Text style={styles.buttonText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {isCustomMessTypeVisible && (
            <TextInput
              style={styles.input}
              onChangeText={setCustomMessType}
              value={customMessType}
              placeholder="Enter custom message type"
            />
          )}
          <Button title="Submit Report" onPress={handleSubmit} />
        </>
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Waiting for permission...</Text>
          <ActivityIndicator size="large" color="#006400" style={styles.activityIndicator} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccffcc', // A light background color
  },
  map: {
    width: Dimensions.get('window').width - 50, // Smaller width
    height: Dimensions.get('window').width - 50, // Reduced height
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    elevation: 2, // Add elevation for Android
    shadowOpacity: 0.2, // Add shadow for iOS
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#ffffff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 10, // Increased borderRadius
    borderColor: '#007bff', // Adjusted borderColor
    backgroundColor: '#ffffff', // Optional: add a background color
    shadowOpacity: 0.1, // Optional: add shadow for iOS
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Optional: add elevation for Android
  },
  loadingText: {
    marginBottom: 20, // Adjust this value as needed to create more space
    fontSize: 16, // Optional: Adjust text size as needed
  },
  activityIndicator: {
    // If you need to adjust the position further, add margins here
  },
  title: {
    fontSize: 24, // Choose an appropriate size
    fontWeight: 'bold', // Makes the text bold
    marginVertical: 20, // Adds space above and below the title
    color: '#000', // Set the color as needed
  },  
});
