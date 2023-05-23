import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import fetchFromBack from '../services/fetchFromBack';

const Ticket = ({ route }) => {
  const { title, code, address, date, event_id } = route.params;

  useEffect(() => {
    fetchFromBack(`/event/${event_id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => {        console.error(error);
      });
  }, []);

  const event = {
    title: title,
    code: 'ABC123',
    address: address,
    date: date,
  };

  const qrCodeValue = event.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <QRCode value={qrCodeValue} size={200} style={styles.qrCode} />
      <Text style={styles.qrCodeText}>{event.code}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={32} color="black" />
          <Text style={styles.detailText}>{event.address}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={32} color="black" />
          <Text style={styles.detailText}>{event.date}</Text>
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
    fontSize: 18,
    marginBottom: 16,
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
