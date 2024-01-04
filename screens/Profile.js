import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text,
    Modal
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setIsBordered, giveBorder } from '../components/bordertesting';

setIsBordered(false);

// In actual, change this to a link to the firebabase user's profile picture 

export default function Profile({ navigation }) {
    // Connect these to database and reflect values
    const [selectedImage, setSelectedImage] = useState(require('../assets/Images/newIcon.png'));
    const DummyName = "Miguel Partosa (Passenger)";
    const DummyNumber = '09173192571';
    const DummyEmail = 'miguelbpartosa@su.edu.ph';

    // actual functionalities 
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const closeModal = () => {
        setShowLogoutModal(false);
    };

    const confirmLogout = () => {
        // Perform logout actions here
        // For example, you can navigate to the login screen or clear user data
        console.log('User logged out');
        navigation.replace('Carousel');
        closeModal();
    };

    return (
        <View style={styles.container}>
            {/* Name and profile */}
            <View style={styles.infoBox}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.circleButton}
                    //incase we want functionality here 
                    onPress={() => console.log("pressed profile pic")}>
                    <Image source={selectedImage} style={styles.profileImage} />
                </TouchableOpacity>

                <Text style={styles.nameText}>{DummyName}</Text>
                <Text
                    style={styles.linkText}>
                    {DummyEmail}
                </Text>
                <Text style={styles.phoneText}>{DummyNumber}</Text>
            </View>

            {/* Settings buttons here */}
            <View style={styles.profileButtons}>
                <TouchableOpacity style={styles.profileButtonContainer}
                    onPress={() => {
                        console.log("pressed editprofile")
                        navigation.navigate('EditProfile')
                    }}>
                    <Text style={styles.profileButtonText}>Edit Profile</Text>
                    <MaterialCommunityIcons name="arrow-right-thick" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButtonContainer}
                    onPress={() => {
                        console.log("pressed faq")
                        navigation.navigate('FAQ')
                    }}>
                    <Text style={styles.profileButtonText}>FAQ</Text>
                    <MaterialCommunityIcons name="arrow-right-thick" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButtonContainer}
                    onPress={() => {
                        console.log("pressed about")
                        navigation.navigate('About')
                    }}>
                    <Text style={styles.profileButtonText}>About Sakay</Text>
                    <MaterialCommunityIcons name="arrow-right-thick" size={30} color="white" />
                </TouchableOpacity>
            </View>



            <Text onPress={handleLogout} style={styles.signOut}>Sign out of my account.</Text>

            <Modal
                transparent={true}
                animationType="slide"
                visible={showLogoutModal}
                onRequestClose={closeModal}>

                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <MaterialCommunityIcons style={{ alignSelf: 'center' }} name="alert-circle" size={40} color="#B41C00" />
                        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'grey' }]} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#B41C00' }]} onPress={confirmLogout}>
                                <Text style={styles.modalButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>


    );
}

const styles = StyleSheet.create({
    infoBox: {
        ...giveBorder(),
        alignItems: "center",
    },
    profileButtons: {
        flex: 1,
        ...giveBorder(),
    },
    profileButtonText: {
        color: 'white',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontSize: 22,
        left: 23,
        letterSpacing: 2
    },
    circleButton: {
        width: 100,
        height: 100,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 75,
    },
    nameText: {
        marginTop: 10,
        color: "#FFF",
        textAlign: 'center',
        fontFamily: "Bebas", // Use the actual font family name if available
        fontSize: 40,
    },
    linkText: {
        color: "#FFF",
        textAlign: "center",
        textDecorationLine: "underline",
        alignSelf: "center",
        marginTop: 23,
        fontFamily: "Bebas", // Use the actual font family name if available
        fontSize: 13,
    },
    phoneText: {
        color: "#FFF",
        textAlign: "center",
        alignSelf: "center",
        marginVertical: 7, // Use marginVertical for vertical margin
        fontFamily: "Bebas", // Use the actual font family name if available
        fontSize: 13,
    },
    container: {
        ...giveBorder(),
        backgroundColor: "#00494a",
        flex: 1,
        flexDirection: "column",
        paddingVertical: 36,
        paddingHorizontal: 0,
    },
    InfoBox: {
        ...giveBorder(),
        alignSelf: "stretch",
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 15,
        marginLeft: 80,
    },
    signOut: {
        color: "#B41C00",
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: 'bold',
        alignSelf: "center",
        fontFamily: "Open Sans", // Use the actual font family name if available
        fontSize: 13,
    },
    profileButtonContainer: {
        height: 50,
        alignItems: "center",
        borderRadius: 10.165,
        backgroundColor: "#01b077",
        alignSelf: "center",
        marginTop: 30,
        width: 360,
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 9,
        elevation: 5
    },

    //MOODALLL for logout 
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30,
        width: 300,
    },
    modalText: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 18,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#007BFF', // Adjust the color as needed
    },
    modalButtonText: {
        color: '#fff', // Adjust the text color as needed
        fontSize: 16,
        fontWeight: 'bold',
    },
});
