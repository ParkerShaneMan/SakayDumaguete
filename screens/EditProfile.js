import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setIsBordered, giveBorder } from '../components/bordertesting';
import * as DocumentPicker from 'expo-document-picker';

setIsBordered(false);

export default function EditProfile  ({ navigation }) {

    const [activeSection, setActiveSection] = useState(null);

    // Connect to database justin farin STINKYYY
    const [selectedImage, setSelectedImage] = useState(require('../assets/Images/newIcon.png'));
    const [name, setName] = useState('Justin Loser Farin');
    const [phone, setPhone] = useState('09628947294');
    const [email, setEmail] = useState('justinffaring@su.edu.ph');
    const [userType, setUserType] = useState('Passenger');


    const toggleSection = (index) => {
        setActiveSection(activeSection === index ? null : index);
    };

    const saveChanges = () => {
        // Implement logic to save changes to the database
        console.log('Changes saved!');
    };

    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync();
          console.log(result);
          console.log('the uri is:', result.assets[0].uri);
    
          handlePress(result.assets[0].uri);
        } catch (err) {
          console.error(err);
        }
      };

  return (

<View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => 
        {pickDocument();
        console.log('pressed profile pic')}}
      >
        <Image source={selectedImage} style={styles.profileImage} />
        <MaterialCommunityIcons
          style={styles.editIcon}
          name="pencil-circle"
          size={45}
          color="white"
        />
      </TouchableOpacity>

      {/* Text fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <View style={styles.fieldEdit}>
            <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            />
            <MaterialCommunityIcons
            style={{marginLeft:-30,alignContent: 'center'}}
            name="pencil-circle"
            size={30}
            color="#00494A"
            />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.fieldEdit}>
            <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setName(text)}
            />
            <MaterialCommunityIcons
            style={{marginLeft:-30,alignContent: 'center'}}
            name="pencil-circle"
            size={30}
            color="#00494A"
            />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone:</Text>
        <View style={styles.fieldEdit}>
            <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setName(text)}
            />
            <MaterialCommunityIcons
            style={{marginLeft:-30,alignContent: 'center'}}
            name="pencil-circle"
            size={30}
            color="#00494A"
            />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>User Type:</Text>
        <View style={styles.fieldEdit}>
            <TextInput
            style={styles.input}
            value={userType}
            onChangeText={(text) => setName(text)}
            />
            <MaterialCommunityIcons
            style={{marginLeft:-30,alignContent: 'center'}}
            name="pencil-circle"
            size={30}
            color="#00494A"
            />
        </View>
      </View>

      {/* Save changes button */}
      <TouchableOpacity style={{top: 30,width:270,paddingVertical:10,borderRadius: 25, alignSelf: 'center', backgroundColor:"#02b001",
      }} title="Save Changes" onPress={saveChanges} >
        <Text style= {{fontFamily: 'Open Sans', fontWeight: 'bold',fontSize:30, color: 'white', textAlign: 'center', letterSpacing: 3}}>Save Changes</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00494A',
    padding: 20,
  },
  fieldEdit: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 75,
  },
  editIcon: {
    alignSelf: 'center',
    bottom: 20,
    left: 20,
    elevation: 30,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Bebas',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    ...giveBorder(),
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    alignSelf: 'flex-start',
    left: 50,
    color: 'white',
    fontSize: 14,
    marginBottom: 20,
    width: 100,
    fontFamily: 'Open Sans',
  },
  input: {
    width: 300,
    height: 40,
    
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingLeft: 30,
  },
});