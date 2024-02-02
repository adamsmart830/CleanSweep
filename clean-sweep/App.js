// App.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReportPage from './pages/ReportPage';

const App = () => {
  return (
    <View style={styles.container}>
      <ReportPage />
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
