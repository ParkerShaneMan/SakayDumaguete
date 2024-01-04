import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setIsBordered, giveBorder } from '../components/bordertesting';

setIsBordered(false);

export default function Onboarding({navigation}){
    return (
        <View style={styles.container}>
          {/* App Logo */}
          <View style = {{...giveBorder(), marginBottom:-30, marginTop: 50}}>
            <Image source={require('../assets/Images/newIcon.png')} style={styles.logo} />
            <Text style = {{
              textAlign:  'center',color:"white",fontSize:25, fontWeight: 'bold',
              fontFamily: 'Bebas',
              }}>
              SAKAY DUMA
              </Text>
          </View>
    
          <View style = {{...giveBorder(),marginTop:-30}}>
            {/* Signup Button */}
            <TouchableOpacity style={[styles.accessbutton, {backgroundColor:'#01BB77'}]} 
            onPress={() => {
              console.log('Signup pressed')
              navigation.navigate('SignUp')}
            }>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
      
            {/* Login Button */}
            <TouchableOpacity style={[styles.accessbutton, {backgroundColor:'#01b000'}]} onPress={() => {
              console.log('Login pressed') 
              navigation.navigate('Login')}}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

            {/* Login with facebook and google removed for now */}
          <View style = {{justifyContent: 'space-evenly', marginTop: -30, opacity: 0}}>
            <Text style={{
              fontSize: 17, fontFamily: 'Open Sans', alignSelf: 'center', fontWeight: 'bold',
              color: 'white'
            }}>Log in with</Text>
            <View style = {{
              ...giveBorder(), flexDirection: 'row', alignContent: 'center', 
              textAlign: 'center', alignItems: 'center'
              }}>  

              <TouchableOpacity
                  onPress={() => {
                    //handle on press
                  }}>
                  <View style={[
                    styles.icons]}>

                    <MaterialCommunityIcons
                      name="facebook"
                      color="white"
                      size={45} />

                    {/* <Text style={[styles.socialButtonText]}>Facebook</Text> */}

                    <View style={{ width: 32 }} />

                  </View>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => {
                    //handle on press
                  }}>
                  <View style={[
                    styles.icons]}>

                    <MaterialCommunityIcons
                      name="google"
                      color="white"
                      size={45} />

                    {/* <Text style={[styles.socialButtonText]}>Google</Text> */}


                  </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

// Styles
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#00494A',
    },
    logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
    },
    accessbutton: {
    backgroundColor: '#3498db',
    padding: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 15,
    width: 350,
    alignItems: 'center',

    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 2 },
    },
    icons :{
      backgroundColor: 'transparent', // Facebook color
      borderWidth:3,
      borderColor: 'white',
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    socialButtonText:{
    color: 'white',
    },
    buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Open Sans',
    },
});