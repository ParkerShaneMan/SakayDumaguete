import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import MainPassengerNav from './MainPassengerNav';
import MainDriverNav from './MainDriverNav';

import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const createProfile = async (response) => {
    const name = "John Doe";
    database().ref(`/users/${response.user.uid}`).set({ name });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DDF8F5' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/Images/Logo.png')}
            style={styles.headerImg}
            alt="logo"
          />
          <Text style={styles.title}>Sign in to Sakay Duma App</Text>
          <Text style={styles.subtitle}>
            Getting a pedicab made easy...
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrectStyle={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="parkerlmanalaysay@su.edu.ph"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputControl}
              placeholder="testing123"
              placeholderTextColor="#6b7280"
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
                const { email, password } = form;
                if (email && password) {
                  try {
                    const response = await auth().signInWithEmailAndPassword(
                      email,
                      password
                    );

                    if (response.user) {
                      // Successfully logged in
                      Alert.alert("Successfully logged in");
                      navigation.navigate('MainPassengerNav');
                    }
                  } catch (e) {
                    Alert.alert(
                      "Error!",
                      "Invalid email or password. Please try again."
                    );
                  }
                }
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const { email, password } = form;
              if (email && password) {
                try {
                  const response = await auth().signInWithEmailAndPassword(
                    email,
                    password
                  );

                  if (response.user) {
                    // Successfully logged in
                    Alert.alert("Successfully logged in");
                    navigation.navigate('MainDriverNav');
                  }
                } catch (e) {
                  Alert.alert(
                    "Error!",
                    "Invalid email or password. Please try again."
                  );
                }
              }
            }}
          >
            <Text style={styles.formFooter}>
              Don't have an account?{" "}
              <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    color: '#1e1e1e',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: '#929292',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#929292',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  btn: {
    backgroundColor: '#195373',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#195373',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  }
});