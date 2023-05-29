import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';
import { API_BASE_URL } from '../constant';

const CATEGORIES = [
  'El evento parece ilegal o no cumple con nuestras políticas.',
  'El evento parece ser spam o fraude.',
  'El evento parece ser abusivo o dañino.',
  'El evento parece ser inapropiado o no relacionado con la categoría.',
  'El evento parece querer cobrar un precio sobre la entrada siendo gratuito',
  'Otro motivo.',
];

const DenunciaModal = ({ visible, onClose, eventId }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleDescriptionChange = (text) => {
    if (text.length <= 100) {
      setDescription(text);
    }
  };

  const handleDenunciaSubmit = () => {
    if (selectedCategory && description) {
        // Aquí podrías enviar la denuncia a tu servidor o hacer algo con ella
        AsyncStorageFunctions.getData('token')
          .then((token) => {
              console.log(token)
              fetch(`${API_BASE_URL}/user/event/complaint`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + token
                      },
                      body: JSON.stringify({
                          "event_id": eventId,
                          "category": selectedCategory,
                          "description": description,
                      }),
                  })
                  .then((response) => response.json())
                  .then((json) => {
                      console.log(json);
                  })
                  .catch((error) => {
                      console.error(error);
                  });
          })
          .catch((error) => {
              console.error(error);
          });
      onClose();
    }
  };

  const characterCount = 100 - description.length;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Realizar Denuncia</Text>

          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Categorías:</Text>
            {CATEGORIES.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton,
                ]}
                onPress={() => handleCategorySelection(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.selectedCategoryButtonText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descripción:</Text>
            <TextInput
              style={styles.descriptionInput}
              onChangeText={handleDescriptionChange}
              value={description}
              maxLength={100}
              placeholder="Ingrese una breve descripción (máximo 100 caracteres)"
            />
            <Text style={styles.characterCount}>{characterCount} caracteres restantes</Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, (!selectedCategory || !description) && styles.disabledButton]}
            onPress={handleDenunciaSubmit}
            disabled={!selectedCategory || !description}
          >
            <Text style={styles.submitButtonText}>Enviar Denuncia</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#E0E0E0',
  },
  categoryButtonText: {
    fontSize: 14,
  },
  selectedCategoryButtonText: {
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 8,
    height: 80,
  },
  characterCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default DenunciaModal;
