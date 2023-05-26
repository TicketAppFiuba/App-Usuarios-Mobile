import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import AsyncStorageFunctions from '../libs/LocalStorageHandlers';

const NotificationsScreen = () => {
  const [remoteMessages, setRemoteMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    setRefreshing(true);

    AsyncStorageFunctions.getData('notifications')
      .then(storagedRemoteMessages => {
        const messages = storagedRemoteMessages ? JSON.parse(storagedRemoteMessages) : [];
        setRemoteMessages(messages);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error al leer Notifications:', error);
        setRefreshing(false);
      });
  };

  const formatDate = unix_timestamp => {
    var date = new Date(unix_timestamp);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();

    const DaysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = DaysOfWeek[date.getDay()];

    var formattedTime = dayOfWeek + ' ' + hours + ':' + minutes.substr(-2);

    return formattedTime;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchNotifications} />
      }
    >
      {remoteMessages.map((remoteMessage, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{remoteMessage.notification.title}</Text>
          <Text style={styles.message}>{remoteMessage.notification.body}</Text>
          <Text style={styles.date}>{formatDate(remoteMessage.sentTime)}</Text>
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
