import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../constant.js';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';


const Ticket = ({ route }) => {
  const { title, address, date, event_id } = route.params;
  const [code, setCode] = useState();

  useEffect(() => {
    AsyncStorageFunctions.getData('token')
      .then((token) => {
      fetch(`${API_BASE_URL}/user/reservations`, {
        headers: { authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((event) => {
            if (event.Event.id === event_id) {
              setCode(event.Reservation.code)
            }
          })
        })
        .catch((error) => {        
          console.error(error);
        });
    })
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <QRCode value={code} size={200} style={styles.qrCode} />
      <Text style={styles.qrCodeText}>{code}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={32} color="black" />
          <Text style={styles.detailText}>{address}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={32} color="black" />
          <Text style={styles.detailText}>{date}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  qrCode: {
    marginBottom: 16,
  },
  qrCodeText: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 24,
  },
});

export default Ticket;
