import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  getData: async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      // error reading value
    }
  },

  storeData: async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      console.log('error al guardar token jwt: ' + e);
      // saving error
    }
  }
};
