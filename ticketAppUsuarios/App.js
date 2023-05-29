import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home';
import MyEvents from './src/screens/MyEvents';
import Ticket from './src/screens/Ticket';
import Search from './src/screens/Search';
import EventDetails from './src/screens/EventDetails';
import Notifications from './src/screens/Notifications';
import Login from './src/screens/Login';
import CustomCalendar from './src/screens/CustomCalendar';

import { navigationRef } from './src/components/RootNavigation';
import * as RootNavigation from './src/components/RootNavigation';
import { API_BASE_URL } from './src/constant.js';
import AsynStorageFunctions from './src/libs/LocalStorageHandlers.js';

import BottomNavigationBar from './src/components/BottomNavigationBar';
import NotificationModal from './src/components/NotificationModal';
import { AuthProvider } from './src/components/AuthProvider';


const Stack = createNativeStackNavigator();

export default function App() {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationEventId, setNotificationEventId] = useState('');

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    console.log('link handle', link);
    const regex = /\/event=(\d+)/;
    const match = link.url.match(regex);
    const eventId = match[1]
    console.log('event id', eventId);
    RootNavigation.navigate('EventDetails', { event_id: eventId })
  };


  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };
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
        AsynStorageFunctions.getData('token')
          .then((jwt) => {
            console.log('jwt', jwt);
            fetch(`${API_BASE_URL}/user/firebase_token?token=${token}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt}`,
              }
            })
            .catch((error) => {
              console.error("Firebase token error:", error);
            })
            
        })
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
            remoteMessage,
        );
        RootNavigation.navigate('EventDetails', { event_id: remoteMessage.data.event_id });
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        AsynStorageFunctions.getData('notifications')
        .then((storagedRemoteMessages) => {
          let messages = storagedRemoteMessages ? JSON.parse(storagedRemoteMessages) : [];
          // Agrega la nueva notificación al principio del arreglo
          messages.unshift(remoteMessage);
        
          // Limita el arreglo a las últimas 10 notificaciones
          messages = messages.slice(0, 10);
          // Almacena el arreglo actualizado en AsyncStorage
          AsynStorageFunctions.storeData(JSON.stringify(messages), 'notifications')
          .then(() => {
            console.log("Notificaciones guardadas")
          })
          .catch((error) => {
            console.error("Error al guardar las notificaciones", error);
          })
        })
        .catch((error) => {
          console.error("Error al obtener las notificaciones", error);
        })
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("Remote mesage", remoteMessage)
        
        AsynStorageFunctions.getData('notifications')
        .then((storagedRemoteMessages) => {
          let messages = storagedRemoteMessages ? JSON.parse(storagedRemoteMessages) : [];
          // Agrega la nueva notificación al principio del arreglo
          messages.unshift(remoteMessage);
        
          // Limita el arreglo a las últimas 10 notificaciones
          messages = messages.slice(0, 10);
          // Almacena el arreglo actualizado en AsyncStorage
          AsynStorageFunctions.storeData(JSON.stringify(messages), 'notifications')
          .then(() => {
            console.log("Notificaciones guardadas")
          })
          .catch((error) => {
            console.error("Error al guardar las notificaciones", error);
          })
        })
        .catch((error) => {
          console.error("Error al obtener las notificaciones", error);
        })
        setNotificationMessage(remoteMessage.notification.body);
        setNotificationTitle(remoteMessage.notification.title);
        setNotificationEventId(remoteMessage.data.event_id);
        setNotificationVisible(true);
    });
    
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log("link", link)
        if (!link) {
          return;
        }
        const regex = /\/event=(\d+)/;
        const match = link.url.match(regex);
        const eventId = match[1]
        console.log('event id', eventId);
        RootNavigation.navigate('EventDetails', { event_id: eventId })
        
      })
      .catch(err => console.error('An error occurred', err));
    const removeLinkListener = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => removeLinkListener();
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
          <AuthProvider>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="MyEvents" component={MyEvents} options={{headerShown: false}}/>
                <Stack.Screen name="CustomCalendar" component={CustomCalendar} options={{headerShown: false}}/>
                <Stack.Screen name="Ticket" component={Ticket} options={{
                    headerStyle: {
                    headerTransparent: true,
                    backgroundColor: 'white',
                    position: 'absolute',
                    },
                    headerTitle: "Ticket",
                }}/>
                <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
                <Stack.Screen name="Notificaciones" component={Notifications} />
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
            <NotificationModal
              visible={notificationVisible}
              message={notificationMessage}
              title={notificationTitle}
              onClose={handleCloseNotification}
              onSeeEvent={() => {
                handleCloseNotification();
                RootNavigation.navigate('EventDetails', { event_id: notificationEventId });
              }}
            />
          </AuthProvider>
        </NavigationContainer>
    ); 
}

