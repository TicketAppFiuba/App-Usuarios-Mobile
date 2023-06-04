import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../constant.js';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';

const Ticket = ({ route }) => {
  const { title, address, date, event_id } = route.params;
  const [code, setCode] = useState();
  const [eventImage, setEventImage] = useState(null);

  useEffect(() => {
    AsyncStorageFunctions.getData('token').then((token) => {
      fetch(`${API_BASE_URL}/user/reservations`, {
        headers: { authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((event) => {
            if (event?.id === event_id) {
              setCode(event.code);
              setEventImage(event?.link);
            }
          })
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  const truncatedAddress = address.length > 30 ? `${address.substring(0, 30)}...` : address;

  return (
    <View style={styles.container}>
      {eventImage && (
        <ImageBackground source={{ uri: eventImage }} style={styles.backgroundImage} />
      )}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Reserva</Text>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.qrCodeContainer}>
          <QRCode value={code} size={200} />
          <Text style={styles.qrCodeText}>{code}</Text>
        </View>
        <View style={styles.section}>
          <Ionicons name="location-outline" size={32} color="black" />
          <Text style={styles.sectionText} numberOfLines={1}>{truncatedAddress}</Text>
        </View>
        <View style={styles.section}>
          <Ionicons name="calendar-outline" size={32} color="black" />
          <Text style={styles.sectionText}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  labelContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  boxContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrCodeText: {
    fontSize: 16,
    marginTop: 16,
    color: '#333',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sectionText: {
    marginLeft: 8,
    fontSize: 24,
    color: '#333',
  },
});

export default Ticket;
