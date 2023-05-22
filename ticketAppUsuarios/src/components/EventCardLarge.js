import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EventCardLarge = ({ event_id, title, date, image, navigation }) => {
    const handlePress = () => {
        navigation.navigate('EventDetails', {event_id: event_id});
    };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 500,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default EventCardLarge;
