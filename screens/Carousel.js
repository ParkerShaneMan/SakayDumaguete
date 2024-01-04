import React,{useRef} from 'react';
import { View, Text, Image, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
// import { giveBorder, setBordered, getIsBordered } from '../components/bordertesting';
//components

// border for testing?
let isBordered = false;
const giveBorder = (exempt) => {
  return (isBordered && !exempt)
    ? {
        borderBlockColor: '#000000',
        borderWidth: 1,
      }

    : {};
};


export default function Carousel({ navigation}) {
  const slide = [
    {
      key: 1,
      content: 'Welcome to SAKAY!',
      photo: require('.././assets/CarouselPhotos/1.jpg'),
    },
    {
      key: 2,
      content: 'Your new commute buddy is here',
      photo: require('.././assets/CarouselPhotos/2.jpg'),
    },
    {
      key: 3,
      content: 'Make your commutes worry-free',
      photo: require('.././assets/CarouselPhotos/3.jpg'),
    },
    {
      key: 4,
      content: 'Enhancing the driver and commuter experience',
      photo: require('.././assets/CarouselPhotos/4.jpg'),
    },  
    {
      key: 5,
      content: 'Ready to make your commutes easy?',
    },
  ];
  return (
    <View style={styles.container}>
        <ImageBackground
          source={require('../assets/Images/SAKAY BG Carousel.png')}
          style={styles.backgroundImage}
          onError={(error) => console.log('Image load error:', error)}
        >
      <Swiper style= {styles.swiper} loop={false} activeDotColor = '#00B03B'>
        {slide.map((item) => (
        <View key={item.key} style={[styles.containerSub, { backgroundColor: item.backgroundColor }]}>
            {/* this is for sakay title and question mark icon to FAQ */}
          <View style={{...giveBorder(),justifyContent: 'space-between',flexDirection: 'row', alignItems: 'center', marginTop:50}}> 
            <Text style={styles.maintitle}>{item.title} Sakay</Text>
            <TouchableOpacity  
              onPress={() =>{
                console.log("entering faq")
                navigation.navigate('FAQ')}} 
              style={[styles.questionMark]}>
              <MaterialCommunityIcons name="help-circle" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={[,styles.carouselContent, item.key === 5 && styles.carouselContentKey4]}>
            <Text style = {{textAlign:'center',color:"white",fontSize:37, fontWeight: 'bold',fontFamily: 'Bebas'}}>{item.content}</Text>
            {item.key !== 5 && (
              <Image source = {item.photo} style = {{width:carouselImageSize, height:carouselImageSize}}></Image>
            )}

            {/* arrow here  */}
            {item.key !== 5 && (
              <LottieView
              // ref = {animationRef}
              source={require('../assets/Animations/ArrowCar.json')}
              loop={true}
              autoPlay={true}
              style={{ alignSelf: 'center',marginBottom: -150, height: 150 }}
              colorFilters={[
              {
                keypath: "Some.Key.Path.In.Your.Animation", // Provide the actual keypath
                color: "#FF0000", // Replace with your desired color
              }
              ]}
              />
            )}
          </View>

          {item.key === 5 && (
            <div style = {{padding:30, borderWidth: 3}}></div>,
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Onboarding')
              }}>
              <View style={styles.proceedbtn}>
                <Text style={{fontSize:30,fontWeight:'bold', color: 'white'}}>GET STARTED </Text>
              </View>
            </TouchableOpacity>
          )}


            
          </View>
        ))}
      </Swiper>
      </ImageBackground>
    </View>
  );
}


const carouselImageSize = 380;
const styles = StyleSheet.create({  
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#00494A',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch' for different effects
  },
  carouselContent:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ...giveBorder(),
    minHeight: 10,
  }, 
  carouselimage: {
    height: carouselImageSize,
    width: carouselImageSize,
  },
  carouselContentKey4: {
    marginTop: 100,
    alignItems: 'center',
    // alignContent: 'flex-start',
  },  
  containerSub: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
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
  proceedbtn: {
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: "#01B000",
    alignSelf:'center',
    paddingVertical: 10,
    width: 300,
    alignItems: 'center',
    minHeight: 100,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
