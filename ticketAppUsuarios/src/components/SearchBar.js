import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText);
    }, 300); // Ajusta el tiempo de espera deseado (en milisegundos)

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
  },
});

export default SearchBar;
