import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Collapsible from 'react-native-collapsible';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function About({ navigation }) {

    return (
        <View style={{ justifyContent: 'center', backgroundColor: '#00494A', flexGrow: 1, }}>
            <Text style={styles.heading}>About Us</Text>
            <Text style={styles.answer}>Welcome to Sakay Duma, the nexus of technology and community in the realm of public transportation. At Sakay Duma, we go beyond being a mere app; we are a movement reshaping the way people move and connect. Our mission is clear — to create a seamless and community-centric transportation experience. We believe in harnessing the power of communities, with shared insights and collaboration shaping a unique transportation ecosystem. Powered by cutting-edge machine learning, our technology ensures efficiency and reliability. Passengers enjoy real-time updates and tailored travel information, while drivers are empowered with intelligent tools for efficient navigation. Safety is paramount with robust features ensuring secure journeys. We are committed to sustainability, contributing to a greener future. Sakay Duma is not just an app; it's a community-driven adventure, inviting you to join us in redefining public transportation and fostering shared progress. Let's move forward together with Sakay Duma.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    father: {
        flexGrow: 1,
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
    question: {
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontSize: 27,
        flexWrap: 'wrap',
        marginRight: 20,
        color: 'white',

    },
    answer: {
        fontFamily: 'Open Sans',
        fontWeight: '500',
        fontSize: 20,
        paddingHorizontal: 10,
        marginHorizontal: 30,
        color: 'white',

        borderColor: 'transparent',
        padding: 15,
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        elevation: 5, // For Android

    }
});
