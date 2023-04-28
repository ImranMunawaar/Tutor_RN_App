import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider, useSelector, useDispatch} from 'react-redux';
import store from './src/Redux/Store';
import NetInfo from '@react-native-community/netinfo';
import { firebase } from './src/firebase/config';

import SignUpScreen from './src/screens/auth/Signup';
import Home from './src/screens/home/Home';
import ProfileDetail from './src/screens/detailPages/ProfileDetail';
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import { setAllTutors } from './src/Redux/TutorsSlice';
//// new
const Stack = createNativeStackNavigator();
let persister = persistStore(store);
let user;
let unsubscribe;
const database = firebase.database();

//const Stack = createStackNavigator();

const HomeStack = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isConnected, setIsConnected] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    checkConnection();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log("==========fetch data from fire============");
      fetchDataFromFirebase();
    }
  }, [isConnected]);



  useEffect(() => {
    //getUser();
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  const checkConnection = async ()=>{
    unsubscribe = await NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
  }

  function fetchDataFromFirebase() {
    database.ref('users').once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        // Check if data is present
        const dataArr = Object.values(data);
        dispatch(setAllTutors(dataArr));
      })
      .catch((error) => {
        console.log("Error fetching data from Firebase:", error);
      });
  }
  
  


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        
      }}>
      {showSplash == true ? (
        <Stack.Screen name="preloader" component={SplashScreen} />
      ) : (
        <>
          {!(user) && <Stack.Screen name="signup" component={SignUpScreen} />}
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="profileDetail" component={ProfileDetail} />
          {(user) && <Stack.Screen name="signup" component={SignUpScreen} />}
        </>
      )}
    </Stack.Navigator>
  );
};

function App() {
  
  
  useEffect(()=>{
    getUser();
  })


  const getUser = async () => {
    user = JSON.parse(await AsyncStorage.getItem('user'));
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
