import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../constant.js';

import * as Location from 'expo-location';

import EventCard from '../components/EventCard';
import EventCardLarge from '../components/EventCardLarge';
import GetDayOfWeek from '../libs/DaysOfWeek';

import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';

export default function Home({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchEvents = () => {
    AsyncStorageFunctions.getData('token')
      .then((token) => {
        let url = `${API_BASE_URL}/user/events`;
        if (location) {
          url += `?longitude=${location.coords.longitude}&latitude=${location.coords.latitude}`;
        }
        fetch(url, {
          headers: { authorization: `Bearer ${token}` }
        })
          .then((response) => response.json())
          .then((data) => {
            mappedEvents = data.map((event) => {
              return {
                id: event.Event.id,
                title: event.Event.title,
                date: GetDayOfWeek(event.Event.date),
                image: event.Images[0]?.link ?? 'https://i.imgur.com/UYiroysl.jpg',
                distance: Math.ceil(event.Distance),
                category: event.Event.category,
                favorite: event.favorite
              };
            });
            setEvents(mappedEvents);
          })
          .catch((error) => {
            console.error("Fetch events:", error);
          })
          .finally(() => {
            setRefreshing(false);
          });
      })
  };

  const getLocation = () => {
    Location.requestForegroundPermissionsAsync()
    .then(status => {
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
    })
    .then(()=>{
        Location.getCurrentPositionAsync({})
        .then(location => {
            setLocation(location);
            console.log(location)
        })
    })
    .catch(error => {
        console.log(error);
    });
  }


  useLayoutEffect(() => {
    getLocation()
    fetchEvents();
  }, [location]);



  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          right: 10,
          zIndex: 1,
        }}
        onPress={() => navigation.navigate('Notificaciones')}
      >
        <Ionicons name="notifications" size={26} color="gray" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 10,
          fontFamily: 'Roboto',
        }}>Eventos Más Populares</Text>

        {/* Horizontal Scroll Bar with events */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, paddingHorizontal: 10 }}>
            {events.map((event) => (
              <EventCardLarge
                key={event.id}
                title={event.title}
                date={event.date}
                image={event.image}
                navigation={navigation}
                event_id={event.id}
                favorite={event.favorite}
              />
            ))}
          </View>
        </ScrollView>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 10,
          fontFamily: 'Roboto',
        }}>Eventos Cercanos</Text>

        {/* Vertical Scroll Bar with events */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={{ flex: 1, flexDirection: 'column', marginTop: 10, }}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                image={event.image}
                distance={event.distance}
                category={event.category}
                navigation={navigation}
                event_id={event.id}
                favorite={event.favorite}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
