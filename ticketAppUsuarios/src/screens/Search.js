import React, {useState} from 'react';
import { View } from 'react-native';

import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';

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
        // Agrega más eventos aquí...
      ]);

  const handleSearch = (searchText) => {
    // Realiza la lógica de búsqueda con el texto ingresado
    // Por ejemplo, puedes utilizar un fetch para obtener los eventos coincidentes con el término de búsqueda
    fetch(`https://api.example.com/events?q=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes establecer los eventos encontrados en el estado
        // Supongamos que los datos de respuesta tienen la siguiente estructura:
        // { events: [{ id, title, date, image }, ...] }
        setEvents(data.events);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SearchBar onSearch={handleSearch} />
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
      </View>
    </View>
  );
}
