import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
// Consider importing a calendar component library like react-native-calendars for the calendar view

export default function App() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Placeholder components for List and Calendar views
  const ListView = () => (
    <ScrollView style={{ flex: 1 }}>
      <Text>List of events (scroll vertically)</Text>
      {/* Render your list of events here */}
    </ScrollView>
  );

  const CalendarView = () => (
    <ScrollView horizontal style={{ flex: 1 }}>
      <Text>Calendar of events (scroll horizontally)</Text>
      {/* Implement your calendar view here */}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Button title="List View" onPress={() => setViewMode('list')} />
        <Button title="Calendar View" onPress={() => setViewMode('calendar')} />
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
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
