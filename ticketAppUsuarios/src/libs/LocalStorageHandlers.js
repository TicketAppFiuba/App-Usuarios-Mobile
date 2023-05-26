import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  getData: async (item) => {
    try {
      const value = await AsyncStorage.getItem(item);
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      // error reading value
    }
  },

  storeData: async (value, key) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('error al guardar: ' + e);
      // saving error
    }
  }
};
