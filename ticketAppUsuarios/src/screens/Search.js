import React, { useState, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

import { API_BASE_URL } from '../constant.js';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';
import GetDayOfWeek from '../libs/DaysOfWeek.js';

import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';

const categories = [
  'Cena o gala',
  'Clase, curso o taller',
  'Competencia',
  'Concierto',
  'Conferencia',
  'Encuentro',
  'Evento deportivo',
  'Feria',
  'Festival',
  'Fiesta',
  'Networking',
  'Otro',
  'Performance',
  'Promoción',
  'Seminario',
  'Show',
  'Torneo',
  'Visita',
];

export default function Search({ navigation }) {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useLayoutEffect(() => {
    AsyncStorageFunctions.getData('token')
      .then((token) => {
        fetch(`${API_BASE_URL}/user/events`, {
          headers: { authorization: `Bearer ${token}` }
        })
          .then((response) => response.json())
          .then((data) => {
            setEvents(data);
          })
          .catch((error) => {
            console.error("Fetch events: ", error);
          })
      })
  }, []);

  const handleSearch = (searchText) => {
    AsyncStorageFunctions.getData('token')
      .then((token) => {
        let url = `${API_BASE_URL}/user/events?title=${searchText}`;
        if (selectedCategory !== '') {
          url += `&category=${selectedCategory}`;
        }
        fetch(url, {
          headers: { authorization: `Bearer ${token}` }
        })
          .then((response) => response.json())
          .then((data) => {
            setEvents(data);
          })
          .catch((error) => {
            console.error("Fetch events: ", error);
          })
      })
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SearchBar onSearch={handleSearch} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={{
            maxHeight: 70,
          }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {selectedCategory !== '' && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCategory}>
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        )}
        {/* Renderizar las tarjetas de eventos */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Renderizar las tarjetas de eventos */}
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event?.Event.title}
            date={GetDayOfWeek(event?.Event.date)}
            image={event?.Images[0] ? event?.Images[0]["link"] : 'https://picsum.photos/700'}
            distance={event?.Event.distance}
            category={event?.Event.category}
            navigation={navigation}
            event_id={event?.Event.id}
          />
        ))}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    height: 54,
  },
  categoryButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#1286f7',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: '#FFFFFF',
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});
