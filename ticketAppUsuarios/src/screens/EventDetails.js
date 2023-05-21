import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import FAQItem from '../components/FAQItem';

const event = {
  id: 1,
  title: 'Recital de The Cure',
  date: '10 de julio 2023',
  location: 'Estadio XYZ',
  image: 'https://picsum.photos/800/400?random=1',
  description: '¡No te pierdas el esperado recital de The Cure en vivo! Disfruta de sus clásicos y sus últimas canciones en una noche inolvidable.',
  address: 'Calle Principal 123, Ciudad de Ejemplo',
  agenda: [
    { time: '19:00', activity: 'Apertura de puertas' },
    { time: '20:00', activity: 'Banda telonera: The Smiths' },
    { time: '21:00', activity: 'Concierto principal de The Cure' },
  ],
  faqs: [
    { question: '¿Cuál es el precio de las entradas?', answer: 'El precio de las entradas varía según la ubicación. Puedes encontrar más información en nuestro sitio web oficial o en puntos de venta autorizados.' },
    { question: '¿Se permiten cámaras fotográficas?', answer: 'Por respeto a los artistas, no se permite el uso de cámaras fotográficas o grabadoras durante el recital. Sin embargo, podrás disfrutar de la cobertura oficial del evento a través de nuestros medios oficiales.' },
    { question: '¿Se venden entradas en la puerta?', answer: 'No se venderán entradas en la puerta. Te recomendamos adquirir tus entradas con anticipación para asegurar tu lugar en el recital.' },
  ],
};

  

const EventDetails = ({ route }) => {
//   const { event } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.location}>{event.location}</Text>
      </View>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Agenda</Text>
        {event.agenda.map((item, index) => (
          <Text key={index} style={styles.agendaItem}>
            {item.time} - {item.activity}
          </Text>
        ))}

      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Dirección</Text>
        <Text style={styles.address}>{event.address}</Text>
        {/* Renderizar mapa con la ubicación del evento */}
      </View>
      <View style={styles.sectionContainer}>
          {event.faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>{}}>
        <Text style={styles.buttonText}>Reservar Entrada</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  date: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    color: 'white',
    fontSize: 14,
  },
  description: {
    marginVertical: 20,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetails;
