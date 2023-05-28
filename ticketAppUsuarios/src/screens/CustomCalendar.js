import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Button, Image } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { API_BASE_URL } from '../constant';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';
import EventCard from '../components/EventCard';
import GetDayOfWeek from '../libs/DaysOfWeek';
import { useNavigation } from '@react-navigation/core';

const CustomCalendar = () => {

  const navigation = useNavigation();

  const [events, setEvents] = useState([]);
  const [eventsCalendar, setEventsCalendar] = useState({});
  const [token, setToken] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);

  const loadEvents = (events) => {
    const calendarEvents = {};

    events.forEach((item) => {
      const eventDate = item.Event.date.split('T')[0];
      console.log(eventDate);
      if (calendarEvents[eventDate]) {
        calendarEvents[eventDate].push({
          title: item.Event.title,
          direction: item.Event.direction,
          image: item?.Images[0].link ?? 'https://i.imgur.com/UYiroysl.jpg',
          event_id: item.Event.id,
          date: GetDayOfWeek(item.Event.date),
        });
      } else {
        calendarEvents[eventDate] = [
          {
            title: item.Event.title,
            direction: item.Event.direction,
            image: item?.Images[0].link ?? 'https://i.imgur.com/UYiroysl.jpg',
            event_id: item.Event.id,
            date: GetDayOfWeek(item.Event.date),
          },
        ];
      }
    });

    setEventsCalendar(calendarEvents);
  };

  const getEvents = (token) => {
    const url = `${API_BASE_URL}/user/calendar`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setEvents(json);
        loadEvents(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = (date) => {
    const formattedDate = date.dateString;
    const eventsForDate = eventsCalendar[formattedDate] || [];
    setSelectedEvents(eventsForDate);
  };

  useEffect(() => {
    AsyncStorageFunctions.getData('token').then((token) => {
      setToken(token);
      getEvents(token);
    });
  }, []);

  const getMarkedDates = () => {
    const markedDates = {};

    Object.keys(eventsCalendar).forEach((date) => {
      markedDates[date] = { selected: true };

      if (eventsCalendar[date].length > 0) {
        markedDates[date].marked = true;
        markedDates[date].dotColor = '#1286f7';
      }
    });

    return markedDates;
  };

  const renderDay = (day) => {
    const formattedDate = day.dateString;
    const eventDates = Object.keys(eventsCalendar);
    const markedDates = {};

    if (eventDates.includes(formattedDate)) {
      markedDates[formattedDate] = {
        selected: true,
        marked: true,
        dotColor: '#1286f7',
      };
    } else {
      markedDates[formattedDate] = {
        selected: true,
      };
    }

    return (
      <TouchableOpacity onPress={() => openModal(day)}>
        <View style={[styles.dayContainer, markedDates[formattedDate].marked && styles.markedDayContainer]}>
          <Text style={[styles.dayText, markedDates[formattedDate].selected && styles.selectedDayText]}>
            {day.day}
          </Text>
          {markedDates[formattedDate].marked && <View style={styles.dot} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={50}
        futureScrollRange={50}
        horizontal
        pagingEnabled
        onDayPress={openModal}
        markedDates={getMarkedDates()}
        renderDay={renderDay}
      />
      <View style={styles.eventContainer}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event, index) => (
            console.log(event),
            <EventCard
                key={index}
                title={event.title}
                event_id={event.event_id}
                navigation={navigation}
                date={event.date}
                image={event.image}
            />
          ))
        ) : (
          <Text>No hay eventos para esta fecha.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  eventCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  eventTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventSummary: {
    marginBottom: 5,
  },
  eventImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  markedDayContainer: {
    backgroundColor: '#1286f7',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
});

export default CustomCalendar;
