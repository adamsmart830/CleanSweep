import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, Button, Alert } from 'react-native';

//this is an event item consists of the location,description,button signup this is info that comes from report page apply styling here
const EventItem = ({ location, description, signup }) => {
  return (
    <View style={styles.eventItem}>
      <Text style={styles.eventslocation}>{location}</Text>
      <Text style={styles.eventsdescription}>{description}</Text>
      <Button title="Sign Up" onPress={signup} />
    </View>
  );
};
//the actual page
const EventPage = () => {
  const events = [ //fake events these will eventually come from report page (having id is important for mapping)
    { id: '1', location: 'Test Event 1', description: 'This is a event test' },
    { id: '2', location: 'Test Event 2', description: 'This is a event test' }
  ];
//functioanlity for signup button
  const signupfunctionality = (location) => {
    Alert.alert('Sign Up', `Signed up for ${location}`);
  };
//we want to use safeareaview as best option for phones, statusbar we want to use dark-content which is what pretty much every app uses its really the default for ios/android device we are using scrollview so we can scroll the page (this doesnt really matter right now but for later)
//then for each event we are making it an eventitem mapping it with its key location description and signup and applying its styling from stylesheet
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        {events.map(event => (
          <EventItem
            key={event.id}
            location={event.location}
            description={event.description}
            signup={() => signupfunctionality(event.location)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
//our styling sheet
const styles = StyleSheet.create({
  container: {
    flex: 1, //allows for scrolling to work poprerly
  },
  scrollView: {
    marginHorizontal: 15, //so the boxes dont hit screen edges
  },
  eventItem: {
    backgroundColor: '#f0fff0',// a nice light green that doesnt clash with the white on the page
    padding: 14, //some padding
    marginBottom: 9, //some margin between event items so dont touch
  },
  eventslocation: {
    fontSize: 17,
    fontWeight: '700', //so its bolder than description
  },
  eventsdescription: {
    marginVertical: 4, // some margin
    fontSize: 14 //want font size to be smaller than location
  }
});

export default EventPage;
