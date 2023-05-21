import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getData } from '../libs/LocalStorageHandlers';

import EventCard from '../components/EventCard';
import EventCardLarge from '../components/EventCardLarge';

export default function Home({ navigation }) {
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
          date: '5 de junio',
          image: 'https://picsum.photos/200/300?random=3',
          distance: '8',
          category: 'Deportes',
        },
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
      ]);

        const handleNotificationsPress = () => {
            // Lógica para manejar el evento de clic en las notificaciones
            console.log('Notificaciones clickeadas');
        };
    return (
        <View style={{ flex: 1, paddingTop: 10 }}>
            <TouchableOpacity
                style={{
                position: 'absolute',
                top: 20,
                right: 10,
                }}
                onPress={handleNotificationsPress}
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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, paddingHorizontal: 10 }}>
                    {events.map((event) => (
                        <EventCardLarge
                            key={event.id}
                            title={event.title}
                            date={event.date}
                            image={event.image}
                            navigation={navigation}
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
                <ScrollView showsVerticalScrollIndicator={false}>
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

                    />
                    ))}
                    </View>
                </ScrollView>
                

            </View>
        </View>
    );
}
