import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { API_BASE_URL } from '../constant.js';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';

export default function EventCard({ event_id, title, date, image, distance, category, navigation, status, favorite }) {
  const [isLiked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(favorite);
  }, [favorite]);

  const handleLike = () => {
    setLiked(!isLiked);
    let url;
    // send like to server
    AsyncStorageFunctions.getData('token')
      .then((token) => {
        fetch(`${API_BASE_URL}/user/event/favorite?event_id=${event_id}`, {
          method: isLiked ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          }
        })
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error('Error sending like:', error);
          }
        );
  };

  const handlePress = () => {
    navigation.navigate('EventDetails', {event_id: event_id});
  };

  const statusDisplay = () => {
    if (status === 'published') {
      return;
    } else if (status === 'cancelled') {
      return 'Cancelado';
    } else if (status === 'finished') {
      return 'Finalizado';
    } else {
      return 'Desconocido';
    }
  };

  const statusOpacity = () => {
    if (status === 'published') {
      return 1;
    } else {
      return 0.3;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image }} style={[styles.image, { opacity: statusOpacity() }]} />
      {distance && <Text style={styles.distance}>{distance} km</Text>}
      {category && <Text style={styles.category}>{category}</Text>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      {status? <Text style={styles.status}>{statusDisplay(status)}</Text> : null}
      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={32} color={isLiked ? 'red' : 'black'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  distance: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  category: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
