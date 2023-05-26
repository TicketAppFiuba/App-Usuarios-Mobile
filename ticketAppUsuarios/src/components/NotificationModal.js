import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const NotificationModal = ({ visible, title, message, onClose, onSeeEvent }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && <Text style={styles.titleText}>{title}</Text>}
          <Text style={styles.messageText}>{message}</Text>
          <View style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }} >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onSeeEvent}>
              <Text style={styles.closeButtonText}>Ver Evento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default NotificationModal;
