import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Placeholder for ListView component with sample events
  const ListView = () => (
    <ScrollView style={styles.contentContainer}>
      <Text>Event 1: Charity Run - 25th March</Text>
      <Text>Event 2: Tech Conference - 10th April</Text>
      <Text>Event 3: Art Exhibition - 5th May</Text>
      {/* Add more events as needed */}
    </ScrollView>
  );

  // Placeholder for CalendarView component with sample events
  const CalendarView = () => (
    <ScrollView horizontal style={styles.contentContainer}>
      <Text>April 10: Tech Conference</Text>
      <Text>May 5: Art Exhibition</Text>
      <Text>March 25: Charity Run</Text>
      {/* Implement your calendar view with events here */}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        {/* Using TouchableOpacity instead of Button for custom styling */}
        <TouchableOpacity onPress={() => setViewMode('list')} style={styles.switchButton}>
          <Text>List</Text> {/* Replace Text with Image for actual app */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewMode('calendar')} style={styles.switchButton}>
          <Text>Cal</Text> {/* Replace Text with Image for actual app */}
        </TouchableOpacity>
      </View>
      {viewMode === 'list' ? <ListView /> : <CalendarView />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  switchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 25, // Makes the buttons round. Adjust as needed for square.
  },
  contentContainer: {
    padding: 20,
  },
});
