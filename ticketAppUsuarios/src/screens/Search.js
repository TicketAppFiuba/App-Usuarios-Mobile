import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

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
  const [events, setEvents] = useState([
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
      date: '30 de mayo',
      image: 'https://picsum.photos/200/300?random=3',
      distance: '10',
      category: 'Arte',
    },
    {
      id: 4,
      title: 'Evento 4',
      date: '30 de mayo',
      image: 'https://picsum.photos/200/300?random=4',
      distance: '10',
      category: 'Arte',
    },
    // Agrega más eventos aquí...
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (searchText) => {
    // Realiza la lógica de búsqueda con el texto ingresado y la categoría seleccionada
    // Por ejemplo, puedes utilizar un fetch para obtener los eventos coincidentes con el término de búsqueda y la categoría
    // fetch(`https://api.example.com/events?q=${searchText}&category=${selectedCategory}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Aquí puedes establecer los eventos encontrados en el estado
    //     // Supongamos que los datos de respuesta tienen la siguiente estructura:
    //     // { events: [{ id, title, date, image }, ...] }
    //     setEvents(data.events);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            image={event.image}
            distance={event.distance}
            category={event.category}
            navigation={navigation}
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
