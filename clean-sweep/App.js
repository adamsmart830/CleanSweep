import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [viewMode, setViewMode] = useState('list'); // Initial view mode

  const ListView = () => (
    <ScrollView style={styles.listView}>
      <Text style={styles.eventText}>Event 1: Charity Run - March 25th</Text>
      <Text style={styles.eventText}>Event 2: Tech Conference - April 10th</Text>
      <Text style={styles.eventText}>Event 3: Art Exhibition - May 5th</Text>
    </ScrollView>
  );

  const CalendarView = () => (
    <ScrollView horizontal style={styles.calendarView}>
      <Text style={styles.eventText}>March 25th: Charity Run</Text>
      <Text style={styles.eventText}>April 10th: Tech Conference</Text>
      <Text style={styles.eventText}>May 5th: Art Exhibition</Text>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setViewMode('list')} style={styles.switchButton}>
          {/* Placeholder for an image button. Replace with <Image> for actual use */}
          <Text>List View</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewMode('calendar')} style={styles.switchButton}>
          {/* Placeholder for an image button. Replace with <Image> for actual use */}
          <Text>Calendar View</Text>
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
    paddingLeft: 10,
  },
  switchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  listView: {
    padding: 20,
  },
  calendarView: {
    padding: 20,
  },
  eventText: {
    marginBottom: 10, // Add space between events
  },
});
