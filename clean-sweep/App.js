// App.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReportPage from './pages/ReportPage';
import Test from './pages/Test';
import theme from './pages/theme';

const App = () => {
  return (
    <View style={styles.container}>
      <BoilerplatePage />
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
