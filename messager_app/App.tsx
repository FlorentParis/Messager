import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChevronLeftIcon,
  PencilSquareIcon,
  PhoneIcon,
  VideoCameraIcon,
} from 'react-native-heroicons/solid';
import Home from './pages/Home';
import Login from './pages/Login';
import HideIfNotLogged from './components/HideIfNotLogged';
import HideIfLogged from './components/HideIfLogged';
import Register from './pages/Register';
import {Provider} from 'react-redux';
import {store} from './store';
import Message from './pages/Message';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const navigation = useNavigation();

  return (
    <>
      <HideIfNotLogged>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Discussions',
              headerLeft: props => (
                <Image
                  style={styles.pic}
                  source={require('./assets/moi.jpeg')}
                />
              ),
              headerRight: props => (
                <PencilSquareIcon size={24} color="#0695FF" />
              ),
              headerStyle: styles.header,
              headerTitleStyle: styles.title,
            }}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              title: '',
              headerLeft: props => (
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <ChevronLeftIcon style={{marginRight: 10}} />
                  <Image
                    style={styles.pic}
                    source={require('./assets/moi.jpeg')}
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text
                      style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
                      Francis Huster
                    </Text>
                    <Text style={{color: '#aaa', fontSize: 12}}>
                      En ligne maintenant
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
              headerRight: props => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <PhoneIcon
                    size={22}
                    color="#0695FF"
                    style={{marginRight: 10}}
                  />
                  <VideoCameraIcon size={26} color="#0695FF" />
                </View>
              ),
              headerStyle: styles.header,
              headerTitleStyle: styles.title,
            }}
          />
        </Stack.Navigator>
      </HideIfNotLogged>

      <HideIfLogged>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerStyle: styles.header,
              headerTitleStyle: styles.title,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Register',
              headerStyle: styles.header,
              headerTitleStyle: styles.title,
            }}
          />
        </Stack.Navigator>
      </HideIfLogged>
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  pic: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
});
