// Import necessary React Native components
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Create a functional component for the TrianglesPage
const TrianglesPage = () => {
  return (
    // The main container View
    <View style={styles.container}>
      {/* Triangle 1 */}
      <View style={styles.triangle} />
      
      {/* Triangle 2 */}
      <View style={styles.triangle} />
      
      {/* Triangle 3 */}
      <View style={styles.triangle} />
      
      {/* Add more triangles as needed */}
    </View>
  );
};

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 87,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'green', // You can change the color as needed
    margin: 10,
  },
});

// Export the TrianglesPage component
export default TrianglesPage;
