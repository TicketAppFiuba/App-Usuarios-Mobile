import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import EventCard from '../components/EventCard';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';

import GetDayOfWeek from '../libs/DaysOfWeek';
import { API_BASE_URL } from '../constant.js';

const MyEvents = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('liked');
  const [likedEvents, setLikedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    AsyncStorageFunctions.getData('token')
      .then((token) => {
        fetchData('liked', token)
          .then((data) => setLikedEvents(data))
          .catch((error) => console.error("fetch liked: ", error));

        fetchData('booked', token)
          .then((data) => setBookedEvents(data))
          .catch((error) => console.error("fetch booked: ", error));
      })
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderEvents = () => {
    let events = null;

    if (activeTab === 'liked') {
      events = likedEvents;
    } else if (activeTab === 'booked') {
      events = bookedEvents;
    }

    if (!events) {
      return <Text>No hay eventos disponibles</Text>;
    }

    return events.map((event) => (
        <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            image={event.image}
            distance={event.distance}
            category={event.category}
            navigation={navigation}
        />

    ));
  };

  const fetchData = (tab, token) => {
    // Simulación de una solicitud de red (fetch) para obtener eventos según la pestaña
    return new Promise((resolve) => {
      // Datos de ejemplo para los eventos
      let data = [];

      if (tab === 'liked') {
        data = fetch(`${API_BASE_URL}/user/favorites`, {
            headers: {authorization: `Bearer ${token}`}
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            mappedEvents = data.map((event) => {
              return {
                id: event.Event.id,
                title: event.Event.title,
                date: GetDayOfWeek(event?.Event.date),
                image: event.Images[0]?.link ?? 'https://i.imgur.com/UYiroysl.jpg',
                distance: Math.ceil(event.Distance),
                category: event.Event.category,
              }
            });
            return mappedEvents;
          })
          .catch((error) => {
              console.error("fetch favorites: ", error);
          })
        } else if (tab === 'booked') {
          data = fetch(`${API_BASE_URL}/user/reservations`,{
            headers: {authorization: `Bearer ${token}`}
          })
          .then((response) => response.json())
          .then((data) => {
            mappedEvents = data.map((event) => {
              return {
                id: event.Event.id,
                title: event.Event.title,
                date: GetDayOfWeek(event?.Event.date),
                image: event.Images[0]?.link ?? 'https://i.imgur.com/UYiroysl.jpg',
                distance: Math.ceil(event.Distance),
                category: event.Event.category,
              }
            });
            return mappedEvents;
          })
          .catch((error) => {
              console.error("fetch: ", error);
          })
      }

      resolve(data);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Eventos</Text>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'liked' && styles.activeTab]}
          onPress={() => handleTabChange('liked')}
        >
          <Text style={styles.tabText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'booked' && styles.activeTab]}
          onPress={() => handleTabChange('booked')}
        >
          <Text style={styles.tabText}>Reservados</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>{renderEvents()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default MyEvents;
