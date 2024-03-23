import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';

const pfp = require('../assets/cleansweep_logo.jpg');
const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
         <Image
              style={styles.profilepic}
              source={pfp}
            />
          <TouchableOpacity>
            <Text>achievements</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>settings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>privacy settings</Text> 
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Hours Helped!</Text> 
          </TouchableOpacity>
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
    marginHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  profilepic: {
    marginTop: 30,
    marginBottom: 25,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfilePage;
