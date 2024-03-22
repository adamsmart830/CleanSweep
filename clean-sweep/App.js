import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';

const eventData = [
  { id: 1, title: 'Charity Run', date: '2024-03-25', description: 'Join us for a charity run.', distance: 5 },
  { id: 2, title: 'Tech Conference', date: '2024-04-10', description: 'Annual tech conference.', distance: 10 },
  { id: 3, title: 'Art Exhibition', date: '2024-05-05', description: 'Explore modern art.', distance: 2 },
];

export default function App() {
  const [viewMode, setViewMode] = useState('list');
  const [sortMode, setSortMode] = useState('date'); // New state for sorting mode
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const sortEvents = (mode) => {
    setSortMode(mode);
  };

  const onDayPress = (day) => {
    const eventForDay = eventData.find(event => event.date === day.dateString);
    if (eventForDay) {
      setSelectedEvent(eventForDay);
      setModalVisible(true);
    }
  };

  const CalendarView = () => (
    <Calendar
      markedDates={eventData.reduce((acc, cur) => {
        acc[cur.date] = { marked: true, dotColor: 'green', activeOpacity: 0 };
        return acc;
      }, {})}
      onDayPress={onDayPress}
      enableSwipeMonths={true}
      theme={{
        arrowColor: 'green',
        todayTextColor: 'green',
        dotColor: 'green',
        selectedDayBackgroundColor: 'green',
      }}
    />
  );

  const sortedEvents = eventData.sort((a, b) => {
    if (sortMode === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return a.distance - b.distance;
    }
  });

  const ListView = () => (
    <ScrollView style={styles.contentContainer}>
      {sortedEvents.map((event) => (
        <TouchableHighlight
          key={event.id}
          style={styles.eventBubble}
          underlayColor="#DDDDDD"
          onPress={() => {
            setSelectedEvent(event);
            setModalVisible(true);
          }}
        >
          <Text>{event.title} - {event.date}</Text>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );

  const EventModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>{selectedEvent?.title}</Text>
            <Text>Date: {selectedEvent?.date}</Text>
            <Text>Distance: {selectedEvent?.distance} km</Text>
            <Text>Description: {selectedEvent?.description}</Text>
          </ScrollView>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#A4B494" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
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
      {viewMode === 'list' && (
        <View style={styles.sortContainer}>
          <TouchableOpacity onPress={() => sortEvents('date')} style={styles.sortButton}>
            <Text>Sort by Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sortEvents('distance')} style={styles.sortButton}>
            <Text>Sort by Distance</Text>
          </TouchableOpacity>
        </View>
      )}
      {viewMode === 'list' ? <ListView /> : <CalendarView />}
      <EventModal />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EFC4',
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
    backgroundColor: '#B3CBB9',
    marginHorizontal: 5,
    borderRadius: 25,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  sortButton: {
    backgroundColor: '#DAEAD7',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 20,
  },
  eventBubble: {
    backgroundColor: '#DAEAD7',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    width: '90%',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F0F5F4',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#A4B494',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
