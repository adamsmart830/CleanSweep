import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ReportPage = () => {
  const [markers, setMarkers] = useState([]);

  const handleMapPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    const newMarkers = [...markers, coordinate];
    setMarkers(newMarkers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Hello, CleanSweep!</Text>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                title={`Marker ${index}`}
              />
            ))}
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});

export default ReportPage;
