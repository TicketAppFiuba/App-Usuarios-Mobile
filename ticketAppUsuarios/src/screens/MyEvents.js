import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import EventCard from '../components/EventCard';

const MyEvents = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('liked');
  const [likedEvents, setLikedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    fetchData('liked')
      .then((data) => setLikedEvents(data))
      .catch((error) => console.error(error));

    fetchData('booked')
      .then((data) => setBookedEvents(data))
      .catch((error) => console.error(error));
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderEvents = () => {
    let events;

    if (activeTab === 'liked') {
      events = likedEvents;
    } else if (activeTab === 'booked') {
      events = bookedEvents;
    }

    if (events.length === 0) {
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

  const fetchData = (tab) => {
    // Simulación de una solicitud de red (fetch) para obtener eventos según la pestaña
    return new Promise((resolve) => {
      setTimeout(() => {
        // Datos de ejemplo para los eventos
        let data = [];

        if (tab === 'liked') {
          data = [
            {
                id: 1,
                title: 'Evento 1',
                date: '25 de mayo',
                image: 'https://picsum.photos/200/300?random=1',
                distance: '5',
                category: 'Música',
              },
              {
                id: 2,
                title: 'Evento 2',
                date: '30 de mayo',
                image: 'https://picsum.photos/200/300?random=2',
                distance: '10',
                category: 'Arte',
              },
              {
                id: 3,
                title: 'Evento 3',
                date: '5 de junio',
                image: 'https://picsum.photos/200/300?random=3',
                distance: '8',
                category: 'Deportes',
              }
          ];
        } else if (tab === 'booked') {
          data = [
            {
              id: 4,
              title: 'Evento 4',
              date: '15 de junio',
              image: 'https://picsum.photos/200/300?random=4',
              distance: '12',
              category: 'Cine',
            },
            {
              id: 5,
              title: 'Evento 5',
              date: '20 de junio',
              image: 'https://picsum.photos/200/300?random=5',
              distance: '6',
              category: 'Gastronomía',
            },
          ];
        }

        resolve(data);
      }, 2000); // Simulamos un retraso de 2 segundos para la solicitud de red
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
