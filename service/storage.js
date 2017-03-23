import {
  AsyncStorage
} from 'react-native';

class Storage {
  async get(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      throw error;
    }
  }

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw error;
    }
  }
}

export default new Storage();
