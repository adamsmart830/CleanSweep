import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Button, TextInput } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

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

  const handleSubmit = () => {
    // Assume customMessType is used if selectedMessType is empty
    const messTypeToSubmit = selectedMessType || customMessType;
    console.log('Submitting', { location, selectedMessType: messTypeToSubmit });
    alert(`Report submitted for ${messTypeToSubmit} at location: ${location.latitude}, ${location.longitude}`);
  };

  return (
    <View style={styles.container}>
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
        <Text>Waiting for permission...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width - 50, // Smaller width
    height: 200, // Reduced height
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
  },
  buttonText: {
    color: '#ffffff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Adjust as needed
    borderColor: 'gray', // Optional styling
  },
});
