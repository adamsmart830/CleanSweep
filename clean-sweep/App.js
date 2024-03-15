import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [events, setEvents] = useState([
    { id: 1, name: 'Charity Run', date: '2024-03-25', distance: 5 },
    { id: 2, name: 'Tech Conference', date: '2024-04-10', distance: 10 },
    { id: 3, name: 'Art Exhibition', date: '2024-05-05', distance: 3 },
  ]);
  const [sortType, setSortType] = useState('');

  // Function to sort events
  const sortEvents = (type) => {
    const sortedEvents = [...events].sort((a, b) => {
      if (type === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (type === 'distance') {
        return a.distance - b.distance;
      }
    });
    setEvents(sortedEvents);
    setSortType(type);
  };

  // ListView component with sample events
  const ListView = () => (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.sortButtons}>
        <Button title="Sort by Date" onPress={() => sortEvents('date')} />
        <Button title="Sort by Distance" onPress={() => sortEvents('distance')} />
      </View>
      {events.map(event => (
        <View key={event.id} style={styles.eventBubble}>
          <Text>{event.name} - {event.date} - {event.distance}km</Text>
        </View>
      ))}
    </ScrollView>
  );

  // Sample events for the calendar with marks
  const calendarEvents = events.reduce((acc, cur) => {
    acc[cur.date] = { marked: true, dotColor: 'blue', activeOpacity: 0 };
    return acc;
  }, {});

  // CalendarView component with a simple calendar
  const CalendarView = () => (
    <Calendar
      markedDates={calendarEvents}
      onDayPress={(day) => console.log('selected day', day)}
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
    alignSelf: 'stretch',
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
