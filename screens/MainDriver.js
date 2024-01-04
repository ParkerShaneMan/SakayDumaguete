// DriverSetup.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Linking, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import database, { firebase } from '@react-native-firebase/database';

const DriverSetup = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [passengerLocations, setPassengerLocations] = useState([]);
  const [selectedPassenger, setSelectedPassenger] = useState(null);

  const handlePassengerClick = (passenger) => {
    setSelectedPassenger(passenger);
  };

  const handleOpenGoogleMaps = () => {
    if (selectedPassenger) {
      const { latitude, longitude } = selectedPassenger;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${driverLocation.latitude},${driverLocation.longitude}&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  useEffect(() => {
    // Request location permissions and get initial driver location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const passengersRef = firebase
        .app()
        .database('https://sakaydumaguete-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('passenger');

      passengersRef.on('value', (snapshot) => {
        const passengers = snapshot.val();
        if (passengers) {
          const passengerLocations = Object.values(passengers);
          setPassengerLocations(passengerLocations);
        }
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {driverLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showUserLocation={true}
        >
          {/* Custom marker for the driver's location */}
          <Marker coordinate={driverLocation}>
            <Image source={require('../assets/driver_logo.png')} style={styles.markerImage} />
          </Marker>

          {/* Passenger markers */}
          {passengerLocations.map((passenger, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: passenger.latitude,
                longitude: passenger.longitude,
              }}
              title={`Passenger ${index + 1}`}
              description={`Passenger ${index + 1}'s Location`}
              onPress={() => handlePassengerClick({ ...passenger, index })}
            >
            <Image source={require('../assets/PassengerLoc.png')} style={styles.passengerImage} />  
            </Marker>
          ))}
          
          {/* Destination marker for the selected passenger */}
          {selectedPassenger && (
            <Marker
              coordinate={{
                latitude: selectedPassenger.latitude,
                longitude: selectedPassenger.longitude,
              }}
              title={`Passenger ${selectedPassenger.index + 1}`}
              description={`Passenger ${selectedPassenger.index + 1}'s Location`}
            />
          )}

          <Marker
            coordinate={{
              latitude: 9.299822,
              longitude: 123.305620,
            }}
            title="Ceres Terminal"
            description="Terminal Outbound"
          />
          
          {/* Display route between driver and selected passenger */}
          {selectedPassenger && (
            <MapViewDirections
              origin={driverLocation}
              destination={{
                latitude: selectedPassenger.latitude,
                longitude: selectedPassenger.longitude,
              }}
              apikey={'AIzaSyB24deUErrqDKtitj7OWLqNykmkhMpN9XU'}
              strokeWidth={3}
              strokeColor="blue"
            />
          )}

        </MapView>
      )}

      <View style={styles.infoContainer}>
        <Text>Driver Location:</Text>
        {driverLocation && (
          <Text>
            Latitude: {driverLocation.latitude}, Longitude: {driverLocation.longitude}
          </Text>
        )}
      </View>
      {/* Open Google Maps button */}
      {selectedPassenger && (
        <TouchableOpacity style={styles.openMapsButton} onPress={handleOpenGoogleMaps}>
          <Text style={styles.openMapsButtonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      )}
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
  infoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  markerImage: {
    
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
  },
  openMapsButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  openMapsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  passengerImage: {
    width: 40, // Adjust the width as needed
    height: 50,
    resizeMode: 'stretch',
  },
});

export default DriverSetup;