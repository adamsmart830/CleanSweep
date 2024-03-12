// App.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfilePage from './pages/ProfilePage';
const App = () => {
  return (
    <View style={styles.container}>
      <ProfilePage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;