import { PermissionsAndroid, Platform } from 'react-native';

// Function to check and request permissions
export const checkPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for Hostpot scanning',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for hotspots in your area',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
  );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission required');
        return;
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
