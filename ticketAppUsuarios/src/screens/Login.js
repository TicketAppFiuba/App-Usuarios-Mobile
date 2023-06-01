import 'expo-dev-client'
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, { useState, useContext } from 'react';
import { Button, View, Modal, Text } from 'react-native';
import AsyncStorageFunctions from '../libs/LocalStorageHandlers.js';
import { API_BASE_URL } from '../constant.js';
import { AuthContext } from '../components/AuthProvider';


export default function Login({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const { login, isLoggedIn, setBackToken } = useContext(AuthContext);

  const closeModal = () => {
    setShowModal(false);
  };

  GoogleSignin.configure({
    webClientId: '977817656055-8dcuholuoqi1eq5ll8bu149p2j1taa9g.apps.googleusercontent.com',
  });
  
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
  });

  const onGoogleButtonPress = async () => {
    await GoogleSignin.signOut();
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential)
    user_sign_in.then((user) => {
      console.log(user)
      setInputs({
        email: user.user.email,
        name: user.user.displayName,
      })
      fetch(`${API_BASE_URL}/user/login?email=${user.user.email}&name=${user.user.displayName}`)
      .then((response) => {
        if (response.status == 400) {
          // suspended
          console.log('Usuario suspendido')
          setShowModal(true);
          // Exit then chain
          return Promise.reject();
        }
        return response.json();
      })
      .then((json) => {
        AsyncStorageFunctions.storeData(json.access_token, 'token')
        .then(() => {
          login();
          setBackToken(json.access_token);
          navigation.navigate('Home')
        })
      })
      .catch((error) => {
        console.log("Login fetch: ", error)
      })

    })
    .catch((error) => {
      console.log("google Signin: ", error)
    })

  }
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>

            <Text style={{
                fontWeight: 'bold',
                fontSize: 48,
                paddingBottom: 20,
            }}>
                𝓣𝓲𝓬𝓴𝓮𝓽 𝓐𝓹𝓹
            </Text>
      <Button
      title="Google Sign-In"
      style={{
        width: 192,
        height: 48,
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        borderRadius: 10,
      }}
  
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
          }}>
            <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>Tu cuenta ha sido suspendida. Comunicate con un organizador</Text>
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
