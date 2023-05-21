import { Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home';
import MyEvents from './src/screens/MyEvents';
import Ticket from './src/screens/Ticket';
import Search from './src/screens/Search';
import EventDetails from './src/screens/EventDetails';
import BottomNavigationBar from './src/components/BottomNavigationBar';

const Stack = createNativeStackNavigator();

export default function App() {

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
  }

  useEffect(() => {
    if (requestUserPermission()) {
      // return fcm token for the device
      messaging().getToken().then(token => {
        console.log(token);
      });
    }
    else {
      console.log('permission rejected', authStatus);
    }

    messaging()
      .getInitialNotification()
      .then( async (remoteMessage) => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
    });

    messaging().onNotificationOpenedApp( async (remoteMessage) => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="MyEvents" component={MyEvents} options={{headerShown: false}}/>
                <Stack.Screen name="Ticket" component={Ticket} options={{
                    headerStyle: {
                    headerTransparent: true,
                    backgroundColor: 'white',
                    position: 'absolute',
                    },
                    headerTitle: "Ticket",
                }}/>
                <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
                <Stack.Screen name="EventDetails" component={EventDetails} options={{
                    headerStyle: {
                    headerTransparent: true,
                    backgroundColor: 'white',
                    position: 'absolute',
                    },
                    headerTitle: "Detalles del evento",
                }}/>
            </Stack.Navigator>
            <BottomNavigationBar
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
        </NavigationContainer>
    ); 
}

