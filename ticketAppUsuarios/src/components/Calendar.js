import React, { useState, useEffect } from 'react';
import { View, Button, Platform, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import * as Calendar from 'expo-calendar';
import { Linking } from 'react-native';

const CalendarScreen = ({eventDetails}) => {
  const [calendarPermission, setCalendarPermission] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    console.log(status)
    setCalendarPermission(status === 'granted');

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      const calendar = calendars.filter(calendar => calendar.allowsModifications)[0];
      setSelectedCalendar(calendar?.id || null);
    }
  };

  const addEventToCalendar = async (calendarId) => {
    if (calendarPermission && calendarId) {
      console.log(eventDetails)

      return await Calendar.createEventAsync(calendarId, eventDetails);
    }
  };

  const handleMenuItemPress = () => {
    addEventToCalendar(selectedCalendar).then((eventId) => {
      // Redirect the user to the Calendar app
      Linking.openURL(`content://com.android.calendar/events/${eventId}`);
    })
  
    setIsMenuVisible(false);
  };

  return (
    <View>
      {!calendarPermission ? (
        <Button title="Obtener permiso" onPress={fetchCalendars} />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleMenuItemPress}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>Agregar al calendario</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginHorizontal: 90,
    display: 'flex',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 4,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default CalendarScreen;
