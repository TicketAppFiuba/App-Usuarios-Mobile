import React, { useState, useEffect } from 'react';
import { View, Button, Platform, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import * as Calendar from 'expo-calendar';
import { MaterialIcons } from '@expo/vector-icons';

const CalendarScreen = ({eventDetails}) => {
  const [calendarPermission, setCalendarPermission] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    console.log(status)
    setCalendarPermission(status === 'granted');

    if (status === 'granted') {
      const calendarList = await Calendar.getCalendarsAsync();
      setCalendars(calendarList);
      setSelectedCalendar(calendarList[0]?.id || null);
    }
  };

  const addEventToCalendar = async (calendarId) => {
    if (calendarPermission && calendarId) {
      console.log(eventDetails)


      await Calendar.createEventAsync(calendarId, eventDetails);
    }
  };

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleMenuItemPress = (calendarId) => {
    addEventToCalendar(calendarId);
    setIsMenuVisible(false);
  };

  const renderMenu = () => {
    return (
      <Modal visible={isMenuVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {calendars.map((calendar) => (
              <TouchableOpacity
                key={calendar.id}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(calendar.id)}
              >
                <Text>{calendar.title}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cerrar" onPress={() => setIsMenuVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      {!calendarPermission ? (
        <Button title="Obtener permiso" onPress={fetchCalendars} />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleMenuPress}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>Agregar al calendario</Text>
          </TouchableOpacity>
          {renderMenu()}
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
