import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../constant.js';

import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';

import FAQItem from '../components/FAQItem';
import DenunciaModal from '../components/DenunciaModal';
import ShareButton from '../components/ShareButton';
import GetDayOfWeek from '../libs/DaysOfWeek';

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

const EventDetails = ({ route, navigation }) => {
  const { event_id } = route.params;
  const [isDenunciaModalVisible, setDenunciaModalVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [event, setEvent] = useState();
  const [reservationId, setReservationId] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    AsyncStorageFunctions.getData('token')
    .then((token) => {

      fetch(`${API_BASE_URL}/user/event?event_id=${event_id}`, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((data) => {
          mappedEvent = {
            id: data.Event.id,
            title: data.Event.title,
            date: GetDayOfWeek(data.Event.date),
            image: data.Images[0]?.link ?? 'https://i.imgur.com/UYiroysl.jpg',
            category: data.Event.category,
            address: data.Event.direction,
            description: JSON.parse(data.Event.description)["blocks"][0]["text"],
            agenda: data.Diary.map((section) => {
              return {
                time: section.time,
                activity: section.description
              }
            }),
            faqs: data.FAQ.map((faq) => {
              return {
                question: faq.question,
                answer: faq.response
              }
            })
          }
          setEvent(mappedEvent);
      })
      .catch((error) => {
          console.error(error);
      })
    


      fetch(`${API_BASE_URL}/user/reservations`, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((event) => {
          if (event.Event.id === event_id) {
              setReservationId(event.Reservation.code)
              setBooked(true)
          }
        })
      })
      .catch((error) => {
        console.error("Reservations from user error: ", error);
      })
    })
  }, []);
    
  const handleReservation = () => {
    if (booked) {
      navigation.navigate('Ticket', {
        event_id: event?.id,
        booked: booked,
        title: event?.title,
        date: event?.date,
        address: event?.address,
        })
      return
    }
    AsyncStorageFunctions.getData('token')
    .then((token) => {
      fetch(`${API_BASE_URL}/user/event/reservation`, {
        method: 'POST',
        body: JSON.stringify({  event_id: event?.id, tickets: 1 }),
        headers: { 
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setReservationId(data.code)
        setBooked(true)
        navigation.navigate('Ticket', {
          event_id: event?.id,
          booked: booked,
          title: event?.title,
          date: event?.date,
          address: event?.address, 
          })
      })
      .catch((error) => {
        console.error("Making reservation error:", error);
      })
    })
  }

  const handleOpenDenunciaModal = () => {
    setDenunciaModalVisible(true);
  };

  const handleCloseDenunciaModal = () => {
    setDenunciaModalVisible(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event?.image ? event?.image : "https://i.imgur.com/UYiroysl.jpg" }} style={styles.image} />
      <TouchableOpacity style={styles.optionsButton} onPress={toggleOptions}>
        <Ionicons name="ellipsis-vertical-outline" size={32} color="white" style={styles.optionsIcon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <ShareButton />
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleOpenDenunciaModal}>
            <Text style={styles.optionText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{event?.date}</Text>
        <Text style={styles.location}>{event?.location}</Text>
      </View>
      <Text style={styles.description}>{event?.description}</Text>
      <View style={styles.sectionContainer}>
        {event?.agenda.map((item, index) => (
          <Text key={index} style={styles.agendaItem}>
            {item.time} - {item.activity}
          </Text>
        ))}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Dirección</Text>
        <Text style={styles.address}>{event?.address}</Text>
        {/* Renderizar mapa con la ubicación del evento */}
      </View>
      <View style={styles.sectionContainer}>
        {event?.faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handleReservation()}>
        { !booked? (
            <Text style={styles.buttonText}>Reservar Entrada</Text>
          ) : (
            <Text style={styles.buttonText}>Ver Ticket</Text>
          )
        }
      </TouchableOpacity>

      <DenunciaModal visible={isDenunciaModalVisible} onClose={handleCloseDenunciaModal} />
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
    height: 250,
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
    marginHorizontal: 90,
    display: 'flex',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  denunciaButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  denunciaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  optionsContainer: {
    position: 'absolute',
    top: 64,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    zIndex: 1,
  },
  optionsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButton: {
    marginBottom: 1,
  },
  shareButton: {
    position: 'absolute',
    top: 72,
    right: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export default EventDetails;
