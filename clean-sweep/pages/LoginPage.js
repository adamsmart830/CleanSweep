import React from 'react'; //we need this for variables
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //we need this for navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventPage from './EventPage';
import ProfilePage from './ProfilePage';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const logo = require('../assets/cleansweep_logotransparent.png');
//for testing purposes need navigation so can go back to login page simply restarting app doesnt work
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color,size}) => {
            let icon;
            let Itype;

            if (route.name === 'logintest') {
              icon = 'login';
              Itype = AntDesign;
            } else if (route.name === 'eventtest') {
              icon = 'calendar-outline';
              Itype = Ionicons;
            }
            else if (route.name == 'profiletest') {
              icon = 'person';
              Itype = Ionicons;
            }
            return <Itype name={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="logintest" component={LoginPage} options={{ title: 'Login' }} />
        <Tab.Screen name="eventtest" component={EventPage} options={{ title: 'Events' }} />
        <Tab.Screen name="profiletest" component={ProfilePage} options={{ title: 'Profile' }} />
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}


const LoginPage = ({ navigation }) => {
  const [username, User] = React.useState(''); //usestate for username with setter function as User
  const [password, Pass] = React.useState(''); //usestate for password with setter function as Pass
  const [error, Error] = React.useState(''); //usestate for error message with setter function as Error

  //login
  const logon = () => {
    //this will obviously be changed later im just testing if works
    if (username === 'christian' && password === 'rcos') {
      Error(''); //we can remove the error message as properly logged in
      navigation.navigate('eventtest'); // go to the event page
    } else {
      Error('user/pass incorrect test'); //if we couldnt login then incorrect
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Image
             source={logo}
             style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={User} //this is the setter function for username
            value={username} //this is the value of the username
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={Pass} //this is the setter function for password
            value={password} //this is the value of the password
            secureTextEntry={true}
          />
          <Text style={styles.error}>{error}</Text> 
          <TouchableOpacity onPress={logon} style={styles.button}>  
            <Text style={styles.buttontext}>Login</Text> 
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//stylesheet
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
  input: {
    height: 42,
    width: '95%',
    margin: 12,
    backgroundColor: '#f0fff0', 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
    borderRadius: 5, 
    shadowOffset: { width: 0, height: 2.25 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 3.5, 
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f0fff0',
    padding: 10,
    width: '95%',
    height: 42, 
    borderRadius: 5, 
    shadowOffset: { width: 0, height: 2.25 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 3.5, 
  },
  buttontext: {
    color: '#454545',
    textAlign: 'center',
  },
  error: {
    fontSize: 14,
    color: 'red', 
  },
  logo: {
    width: 250, 
    height: 100, 
    marginBottom: 0, 
    marginTop: 150,
  }
});

export default App;
