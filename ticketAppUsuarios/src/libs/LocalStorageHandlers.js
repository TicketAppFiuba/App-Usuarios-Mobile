import { AsyncStorage } from 'react-native';

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
            // value previously stored
            return value
        }
        } catch(e) {
            // error reading value
        }
}

const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (e) {
            // saving error
        }
}

export {getData, storeData}
