import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EventCard from '../components/EventCard';
import EventCardLarge from '../components/EventCardLarge';
import { fetchFromBack } from '../services/fetchFromBack';
import GetDayOfWeek from '../libs/DaysOfWeek';

export default function Home({ navigation }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchFromBack('/user/events')
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
                    }
                });
                setEvents(mappedEvents);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

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
