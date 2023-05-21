import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationsScreen = () => {
  const notifications = [
    {
      id: 1,
      title: 'Nueva notificación',
      message: '¡Hola! Tienes un nuevo mensaje en tu bandeja de entrada.',
      date: '20 de mayo 2023',
    },
    {
      id: 2,
      title: 'Recordatorio',
      message: 'Recuerda asistir al evento el próximo viernes a las 19:00 horas.',
      date: '18 de mayo 2023',
    },
    {
      id: 3,
      title: 'Actualización de evento',
      message: 'Se ha cambiado la ubicación del evento. Consulta los detalles actualizados.',
      date: '15 de mayo 2023',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {notifications.map((notification) => (
        <View key={notification.id} style={styles.card}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.date}>{notification.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
});

export default NotificationsScreen;
