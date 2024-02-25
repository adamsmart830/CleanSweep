// import { StyleSheet, Text, View } from 'react-native'; at the moment dont need any of these imports from react-native
import EventPage from './pages/EventPage'; //the page we are using
import LoginPage from './pages/LoginPage'; //the page we are using
export default function App() {
  return (
  //  <View style={styles.container}> dont need styling for now
      //<EventPage /> //goes to the page
      <LoginPage /> //goes to the page
  //  </View> dont need styling for now
  );
}
/* we dont need any styling for now we are just navigating to the eventpage directly on app open to work on it so styling unecessary for now
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
