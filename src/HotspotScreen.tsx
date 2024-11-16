import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import HotspotManager, {
  Device,
  TetheringError,
} from '@react-native-tethering/hotspot';
import {checkPermissions} from './permissions';

type WifiScreenProps = {
  back: () => void;
};

export default function HotspotScreen({back}: WifiScreenProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [myIp, setMyIp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    checkPermissions();

    const getDeviceIp = async () => {
      try {
        const ip = await HotspotManager.getMyDeviceIp();
        setMyIp(ip);
        ToastAndroid.show(`Your device IP: ${ip}`, ToastAndroid.SHORT);
      } catch (error) {
        if (error instanceof TetheringError) {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        }
        console.error(error);
      }
    };

    getDeviceIp();

    const interval = setInterval(async () => {
      setLoading(true); 
      try {
        const connectedDevices = await HotspotManager.getConnectedDevices();
        if (connectedDevices.length > 0) {
          setDevices(connectedDevices);
        } else {
          ToastAndroid.show('No devices connected', ToastAndroid.SHORT);
        }
      } catch (error) {
        if (error instanceof TetheringError) {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleScanDevices = async () => {
    setLoading(true);
    try {
      const devices = await HotspotManager.getConnectedDevices();
      setDevices(devices);
    } catch (error) {
      if (error instanceof TetheringError) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.backButton}
        android_ripple={{color: '#fff'}}
        onPress={back}>
        <Text style={styles.backText}>Back to home</Text>
      </Pressable>

      <View style={styles.wrapper}>
        <Text style={styles.wrapperHeader}>Hotspot Information</Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={styles.button}
            android_ripple={{color: '#6a1b9a'}}
            onPress={async () => {
              try {
                const state = await HotspotManager.isHotspotEnabled();
                ToastAndroid.show(
                  `Hotspot state: ${state}`,
                  ToastAndroid.SHORT,
                );
              } catch (error) {
                if (error instanceof TetheringError) {
                  ToastAndroid.show(error.message, ToastAndroid.LONG);
                }
                console.log(error);
              }
            }}>
            <Text style={styles.buttonText}>Check Hotspot Enabled</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            android_ripple={{color: '#6a1b9a'}}
            onPress={async () => {
              try {
                const ip = await HotspotManager.getMyDeviceIp();
                setMyIp(ip);
                ToastAndroid.show(`Your device IP: ${ip}`, ToastAndroid.SHORT);
              } catch (error) {
                if (error instanceof TetheringError) {
                  ToastAndroid.show(error.message, ToastAndroid.LONG);
                }
                console.log(error);
              }
            }}>
            <Text style={styles.buttonText}>Get your hotspot IP</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.wrapperHeader}>Connected Devices</Text>
        <View style={{width: '100%'}}>
          <Pressable
            style={styles.button}
            android_ripple={{color: '#6a1b9a'}}
            onPress={handleScanDevices}>
            <Text style={styles.buttonText}>Find Connected Devices</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.wrapperHeader}>Your IP Address:</Text>
        <Text style={styles.deviceIp}>{myIp}</Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6a1b9a" />
          <Text style={styles.loaderText}>
            Scanning for new connected devices...
          </Text>
        </View>
      ) : (
        <View style={{marginVertical: 15}}>
          {devices.map((device, index) => (
            <View style={styles.devicesWrapper} key={index}>
              <Text style={styles.deviceText}>
                IP Address: {device.ipAddress}
              </Text>
              <Text style={styles.deviceText}>
                MAC Address: {device.macAddress}
              </Text>
              <Text style={styles.deviceText}>Status: {device.status}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  backButton: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  backText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    backgroundColor: '#ffffff', 
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  wrapperHeader: {
    fontSize: 18,
    color: '#6a1b9a', 
    marginBottom: 12,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  button: {
    width: '80%',
    padding: 14,
    backgroundColor: '#6a1b9a', 
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  deviceIp: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  devicesWrapper: {
    padding: 12,
    backgroundColor: '#fff', 
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  deviceText: {
    fontSize: 14,
    color: '#555', 
    marginBottom: 6,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6a1b9a',
  },
});
