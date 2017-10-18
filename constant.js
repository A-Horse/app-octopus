import { Platform } from 'react-native';

let endpoint;
if (__DEV__) {
  if (Platform.OS === 'android') {
    // endpoint = 'http://192.168.232.201:8888';
    // endpoint = 'http://10.207.22.66:8888';
    endpoint = 'http://10.0.2.2:8888';
  } else {
    endpoint = 'http://127.0.0.1:8888';
  }
} else {
  endpoint = 'http://www.octopuese.xyz';
}
export const endpointUrl = endpoint;

export const apiUrl = endpoint + '/api';
export const storageUrlPrefix = endpoint + '/storage/';

export const DEFAULT_BOARD_COVER_SRC = '/static/image/board-cover/world-circle.png';

export const JWT = 'jwt';

export const JWTS_TOKEN = 'jwts-token';

export const AUTH_DATA = 'AUTH_DATA';

export const ColorRed = '#e35a55';
export const ColorBlue = '#4285f4';
export const NavBarBgColor = '#e35a55';
export const NavBarColor = '#fff';
export const ScreenBgColor = '#fff';

export const PlaceholderColor = '#c9c9c9';
export const BorderColor = '#e8e8e8';
export const TextPrimaryColor = '#000';
