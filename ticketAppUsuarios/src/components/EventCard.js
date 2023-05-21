import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EventCard({ title, date, image, distance, category }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      {distance && <Text style={styles.distance}>{distance} km</Text>}
      {category && <Text style={styles.category}>{category}</Text>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
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
});
