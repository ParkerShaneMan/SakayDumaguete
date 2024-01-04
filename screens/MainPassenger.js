// PassengerApp.js
import React, { useState, useEffect, useRef  } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { firebase } from '@react-native-firebase/database';

const PassengerApp = () => {
  const [passengerLocation, setPassengerLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const mapRef = useRef(null);

  const handleConnect = async () => {
    // Request location permissions for the passenger
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }

    // Get the location of the passenger
    let location = await Location.getCurrentPositionAsync();
    setPassengerLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Save passenger location to Firebase Realtime Database
    const passengersRef = firebase
    .app()
    .database('https://sakaydumaguete-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/passenger')
    const passengerKey = passengersRef.push().key;
    passengersRef.child(passengerKey).set({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Set the initial region with the fetched location
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });

    // Show loading pop-up while waiting for a pedicab
    setLoading(true);
    handleZoomToCurrentLocation()
  };

  const handleCancel = () => {
    // Remove passenger data from Firebase Realtime Database
    if (passengerLocation) {
      const passengersRef = firebase
        .app()
        .database('https://sakaydumaguete-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/passenger');

      // Find the passenger data by checking the coordinates
      passengersRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (
            childData.latitude === passengerLocation.latitude &&
            childData.longitude === passengerLocation.longitude
          ) {
            passengersRef.child(childSnapshot.key).remove();
          }
        });
      });
    }

   // Cancel waiting and close the loading pop-up
    setLoading(false);
  };

  const handleZoomToCurrentLocation = () => {
    // Zoom to the user's current location on the map
    if (mapRef.current && passengerLocation) {
      mapRef.current.animateToRegion({
        latitude: passengerLocation.latitude,
        longitude: passengerLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  };

  useEffect(() => {
    // Fetch the current location when the component mounts
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setPassengerLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    // Set the initial region after the location is fetched
    setInitialRegion({
      latitude: passengerLocation?.latitude || 0,
      longitude: passengerLocation?.longitude || 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  }, [passengerLocation]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showUserLocation={true}
      >
        {passengerLocation && (
          <Marker
            coordinate={{
              latitude: passengerLocation.latitude,
              longitude: passengerLocation.longitude,
            }}
            title="Passenger"
            description="Passenger's Location"
          />
          //9.299822, 123.305620
        )}

          <Marker
            coordinate={{
              latitude: 9.299822,
              longitude: 123.305620,
            }}
            title="Ceres Terminal"
            description="Terminal Outbound"
          />
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={handleConnect}>
          <Text style={styles.buttonText}>Wait for Pedicab</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomToCurrentLocation}>
          <Text style={styles.buttonText}>Zoom to Current Location</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Modal */}
      <Modal visible={loading} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Waiting for a pedicab...</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center', // Center horizontally
    backgroundColor: 'green',
    paddingVertical: 15, // Increase padding for larger button size
    paddingHorizontal: 20, // Increase padding for larger button size
    borderRadius: 10,
    marginBottom: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Increase font size for larger text
    fontWeight: '600',
  },
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
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PassengerApp;