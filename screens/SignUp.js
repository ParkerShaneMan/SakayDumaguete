import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setIsBordered, giveBorder } from '../components/bordertesting';
import * as DocumentPicker from 'expo-document-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import the firestore module
import MainPassengerNav from './MainPassengerNav';

setIsBordered(false);

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
  });
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const swiperRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);
  const [buttonText, setButtonText] = useState('CHOOSE A PIC!');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log('the chosen picture was:', selectedImage);
  }, [selectedImage]);

  const handlePress = (imageUri) => {
    setSelectedImage(imageUri);
    setButtonText('Picture Chosen');
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      console.log(result);
      console.log('the uri is:', result.uri);

      handlePress(result.uri);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserTypeSelection = (type) => {
    setSelectedType(type);
  };

  const onUpdateUserType = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        console.log('.');

        navigation.navigate(selectedType === 'passenger' ? 'MainPassengerNav' : 'MainDriverNav');
      } else {
        console.error('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error updating user type and names in Firestore:', error.message);
    }
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  const confirmLogin = () => {
    // Perform logout actions here
    // For example, you can navigate to the login screen or clear user data
    console.log('User logged in');
    closeModal();
    handleNextSlide();
  };

  const handleNextSlide = async () => {
    if (selectedType && form.email && form.password) {
      if (form.password === form.passwordConfirmation) {
        try {
          console.log('creating user in firebase...');
          const { user } = await auth().createUserWithEmailAndPassword(form.email, form.password);
          console.log('User registered successfully:', user.uid);
          swiperRef.current.scrollBy(1, true);
          onUpdateUserType();
        } catch (error) {
          console.error('Error registering user:', error.message);
          Alert.alert('Error registering user:', error.message);
        }
      } else {
        Alert.alert("Password and confirmation password don't match.");
      }
    } else {
      Alert.alert('Fields are missing. Cannot proceed to the next slide.');
    }
  };

  const slide = [
    {
      key: 1, //User Selection
      content: (
        <View style={[styles.slide1buttons]}>
          <TouchableOpacity
            style={[styles.useroption, selectedType === 'passenger']}
            onPress={() => {
              handleUserTypeSelection('passenger');
              swiperRef.current.scrollBy(1, true);
            }}
          >
            <Text style={styles.optionbuttontext}>
              I am a{'\n'}
              <Text style={{ fontSize: 50, fontFamily: 'Bebas', letterSpacing: 5 }}>
                Passenger
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.useroption, selectedType === 'driver']}
            onPress={() => {
              handleUserTypeSelection('driver');
              swiperRef.current.scrollBy(1, true);
            }}
          >
            <Text style={styles.optionbuttontext}>
              I am a{'\n'}
              <Text style={{ fontSize: 50, fontFamily: 'Bebas', letterSpacing: 5 }}>
                Driver
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      key: 2, //Email
      content: (
        <View style={styles.carouselContent}>
          <TouchableOpacity style={styles.circleButton} onPress={pickDocument}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
              <>
                <Text style={styles.buttonText}>{buttonText}</Text>
                <MaterialCommunityIcons name="plus" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.fieldsContainer}>
            <Text style={styles.fieldsLabel}>Your Name</Text>
            <View style={styles.horizontalField}>
              <TextInput
                style={styles.fields}
                placeholder="First Name"
                onChangeText={(firstName) => setForm({ ...form, firstName })}
              />
              <TextInput
                style={styles.fields}
                placeholder="Last Name"
                onChangeText={(lastName) => setForm({ ...form, lastName })}
              />
            </View>
          </View>

          <View style={[styles.fieldsContainer,]}>
            <Text style={styles.fieldsLabel}>Email</Text>
            <TextInput
              style={styles.fields}
              autoCapitalize="none"
              autoCorrectStyle={false}
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              value={form.email}
              onFocus={toggleActive}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>

          <View style={[styles.fieldsContainer, { marginVertical: 30 }]}>
            <Text style={styles.fieldsLabel}>Choose a Reliable Password</Text>
            <TextInput
              style={styles.fields}
              autoCapitalize="none"
              autoCorrectStyle={false}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#6b7280"
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
            />
            <TextInput
              style={styles.fields}
              autoCapitalize="none"
              autoCorrectStyle={false}
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#6b7280"
              value={form.passwordConfirmation}
              onChangeText={(passwordConfirmation) => setForm({ ...form, passwordConfirmation })}
            />
          </View>
          <Modal
            transparent={true}
            animationType="slide"
            visible={showLoginModal}
            onRequestClose={closeModal}>

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <MaterialCommunityIcons style={{ alignSelf: 'center', elevation: 10, }} name="emoticon-excited" size={50} color="#01b077" />
                <Text style={styles.modalText}>Welcome to SAKAY!</Text>
                <View style={styles.modalButtonsConthainer}>
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#01b077' }]} onPress={confirmLogin}>
                    <Text style={styles.modalButtonText}>Hooray!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ),
    },

  ];

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} style={styles.swiper} loop={false} scrollEnabled={false} activeDotColor="#00B03B">
        {slide.map((item) => (
          <View key={item.key} style={[styles.containerSub, { backgroundColor: item.backgroundColor }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.maintitle}>{item.title} Sakay</Text>
              <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={[styles.questionMark]}>
                <MaterialCommunityIcons name="help-circle" size={30} color="white" />
              </TouchableOpacity>
            </View>

            {(item.key === 2 || item.key === 3) && <Text style={styles.subtitle}>Sign Up</Text>}

            {item.content}

            {item.key !== 1 && (
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
              >
                <View style={styles.nextbtn}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.key === 3 ? 'Sign Up' : 'Sign Up'} </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#00494A',
  },
  fieldsContainer: {
    ...giveBorder(),
    width: 370,
  },
  fieldsLabel: {
    height: 44,
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Bebas',
  },
  horizontalField: {
    flex: 1,
    flexDirection: 'row',
    ...giveBorder(),
    marginVertical: 30,

  },
  fields: {
    height: 44,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    minWidth: 180,
    borderWidth: 1
  },
  carouselContent: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ...giveBorder(),
    minHeight: 10,

  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center'
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 75,
  },
  containerSub: {
    flex: 1,
    marginBottom: 100,
  },
  questionMark: {
    padding: 10, // Adjust padding as needed
    ...giveBorder(),
  },
  swiper: {
    ...giveBorder(),
  },
  maintitle: {
    color: 'white',
    fontSize: 90.19,
    fontFamily: 'Bebas',
    fontWeight: 'bold',
    maxHeight: 300,
    ...giveBorder(),
    flexDirection: 'column',
  },
  subtitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 47,
    fontFamily: 'Bebas',
    fontWeight: 'bold',
    ...giveBorder(),
  },
  slide1buttons: {
    flex: 1,
    flexDirection: 'column',
    padding: 7.5,
    // paddingTop:30,
    // paddingBottom:300,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    ...giveBorder(),
  },
  normaltext: {
    fontFamily: 'Open Sans',
    fontSize: 20,
  },
  useroption: {
    padding: 80,
    alignItems: 'center',
    ...giveBorder(),
    backgroundColor: '#01b077',
    borderRadius: 20,
    marginVertical: 5,
  },
  selectedButton: {
    flex: 1, // Each button takes half of the available space
    backgroundColor: '#00494a',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  optionbuttontext: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Open Sans', // Assuming 'OpenSans' is the correct font family name
  },
  nextbtn: {
    justifyContent: 'center',
    marginBottom: -100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    // paddingVertical: 40,
    width: 200,
    alignItems: 'center',
    minHeight: 75,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#072D40',
    padding: 20,
    borderRadius: 30,
    width: 300,
    fontFamily: "Open Sans"
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
    color: 'white'
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#007BFF', // Adjust the color as needed
    elevation: 10,
  },
  modalButtonText: {
    color: '#fff', // Adjust the text color as needed
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});