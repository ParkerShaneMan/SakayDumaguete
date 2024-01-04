import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Collapsible from 'react-native-collapsible';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FAQ  ({ navigation }) {
  // TODO add answers to FAQ
  const faqData = [
    { question: 'Why are drivers taking so long?', 
    answer: 'There could be several reasons why drivers are taking longer than expected. It could be due to high demand during peak hours, traffic congestion, or a shortage of available drivers. ' },
    { question: 'Can I use the app offline?', answer: 'No, as the core functionality of booking a pedicab and real-time update requires an internet connection.' },
    { question: 'How do i get drivers?', answer: 'To get drivers on the app, the platform typically employs a booking and onboarding process for drivers.' },
    { question: 'How long do I have to wait?', answer: 'The waiting time for a pedicab ride can vary depending on factors such as the availability of nearby drivers, demand in the area, and traffic conditions.' },
    { question: 'Can I save locations?', answer: 'Yes, our app allows users to save their frequently visited or preferred locations for easier booking in the future.' },
    { question: 'How do I change my account?', answer: 'To change account details on the app, users can typically access the app\'s settings or profile section. Within this section, there are usually options to edit personal information such as name, contact details, and payment preferences. Users may also have the ability to update their profile picture or change their password.' },
    { question: 'How do I report an issue?', answer: 'Reporting an issue on the  app can usually be done through the app\'s support or help center. Users should provide detailed information about the issue they are experiencing, including relevant screenshots or error messages if applicable.' },
    // Add more FAQ items as needednp
  ];

  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <View style = {{justifyContent: 'space-evenly', backgroundColor: '#00494A',     flexGrow:1,}}>
      <Text style = {styles.heading}> FAQ</Text>
      <View style = {styles.father}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.container}>
          <TouchableOpacity style = {{ 
            flexDirection: 'row',  justifyContent: 'center', overflow: 'hidden', 
            backgroundColor : '#00B076', borderRadius : 6,
            paddingLeft :10, minHeight : 75, alignItems: 'center',
            }} onPress={() => toggleSection(index)}>
            {/* <View style={}> */}
              {/* <View style={styles.itemcontainer}> */}
                <Text style={styles.question}>{item.question}</Text>
              {/* </View> */}
              <MaterialCommunityIcons style ={{alignSelf:'center', marginLeft: 'auto'}} name="arrow-bottom-right-thick" size={30} color="white" />
            {/* </View> */}
          </TouchableOpacity>
          
          <Collapsible collapsed={activeSection !== index}>
            <View style={{ padding: 3, backgroundColor: '#grey'}}>
              <Text style = {styles.answer}>{item.answer}</Text>
            </View>
          </Collapsible>
      </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  father: {
    flexGrow:1,
    alignItems: 'stretch',
    borderColor: 'red',
    paddingHorizontal: 10,
    marginBottom: 50
  },
  container: {
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  itemcontainer: {
    padding: '10px',
    backgroundColor: 'skyblue',
    marginVertical: 1,
  },
  heading: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'Bebas',
    fontWeight: 'bold',
    alignSelf: 'center',

  },
  question:{
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 27,
    flexWrap: 'wrap',
    marginRight:20,
    color: 'white',
    
  },
  answer:{
    fontFamily: 'Open Sans',
    fontWeight: '500',
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'white',

    borderColor: 'transparent',
    padding: 15,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    elevation: 5, // For Android
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
  }
});
