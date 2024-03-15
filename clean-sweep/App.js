import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Import the Calendar component
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Sample events for the calendar
  const events = {
    '2024-03-25': { marked: true, dotColor: 'blue', activeOpacity: 0 },
    '2024-04-10': { marked: true, dotColor: 'red', activeOpacity: 0 },
    '2024-05-05': { marked: true, dotColor: 'green', activeOpacity: 0 },
  };

  // ListView component with sample events
  const ListView = () => (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.eventBubble}><Text>Event 1: Charity Run - 25th March</Text></View>
      <View style={styles.eventBubble}><Text>Event 2: Tech Conference - 10th April</Text></View>
      <View style={styles.eventBubble}><Text>Event 3: Art Exhibition - 5th May</Text></View>
    </ScrollView>
  );

  // CalendarView component with a simple calendar
  const CalendarView = () => (
    <Calendar
      // Mark sample events on the calendar
      markedDates={events}
      // When a day is pressed, show events for that day
      onDayPress={(day) => console.log('selected day', day)}
      // Style the calendar
      theme={{
        selectedDayBackgroundColor: 'orange',
        todayTextColor: 'red',
        dotColor: 'red',
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setViewMode('list')} style={styles.switchButton}>
          <Text>List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewMode('calendar')} style={styles.switchButton}>
          <Text>Cal</Text>
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
    borderRadius: 25,
  },
  contentContainer: {
    padding: 20,
  },
  eventBubble: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
});
