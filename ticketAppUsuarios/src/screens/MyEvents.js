import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import EventCard from '../components/EventCard';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';

import GetDayOfWeek from '../libs/DaysOfWeek';
import { API_BASE_URL } from '../constant.js';

const MyEvents = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('liked');
  const [likedEvents, setLikedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents(activeTab);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchEvents(tab);
  };

  const fetchEvents = (tab) => {
    setRefreshing(true);

    AsyncStorageFunctions.getData('token')
      .then((token) => {
        fetchData(tab, token)
          .then((data) => {
            if (tab === 'liked') {
              setLikedEvents(data);
            } else if (tab === 'booked') {
              setBookedEvents(data);
            }
            setRefreshing(false);
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
            setRefreshing(false);
          });
      });
  };

  const renderEvents = () => {
    let events = null;

    if (activeTab === 'liked') {
      events = likedEvents;
    } else if (activeTab === 'booked') {
      events = bookedEvents;
    }

    if (!events || events.length === 0) {
      return <Text>No hay eventos disponibles</Text>;
    }
    return events.map((event) => (
      <EventCard
        key={event.id}
        event_id={event.id}
        title={event.title}
        date={event.date}
        image={event.image}
        distance={event?.distance ? event.distance : ''}
        category={event.category}
        status={event.status}
        navigation={navigation}
        favorite={event.favorite}
      />
    ));
  };

  const fetchData = (tab, token) => {
    let url = '';

    if (tab === 'liked') {
      url = `${API_BASE_URL}/user/favorites`;
    } else if (tab === 'booked') {
      url = `${API_BASE_URL}/user/reservations`;
    }

    return fetch(url, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(url)
        console.log(data)
        let mappedEvents = [];
        if (tab === 'liked') {
          mappedEvents = data.map((event) => ({
            id: event.Event.id,
            title: event.Event.title,
            date: GetDayOfWeek(event?.Event.date),
            image: event?.Images[0]?.link ?? 'https://i.imgur.com/UYiroysl.jpg',
            distance: Math.ceil(event.Distance),
            category: event.Event.category,
            favorite: event.favorite,
            status: event.Event.state,
          }));
        } else {
          mappedEvents = data.map((event) => ({
            id: event.Event.id,
            title: event.Event.title,
            date: GetDayOfWeek(event?.Event.date),
            image: event?.Event.pic_id?.link ?? 'https://i.imgur.com/UYiroysl.jpg',
            distance: Math.ceil(event.Distance),
            category: event.Event.category,
            favorite: event.Event.favorite,
            status: event.Event.state,
          }));
        }

        return mappedEvents;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return [];
      });
  };

  const handleRefresh = () => {
    fetchEvents(activeTab);
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
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {renderEvents()}
      </ScrollView>
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
