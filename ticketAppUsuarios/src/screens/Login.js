import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AuthContext } from '../components/AuthProvider';

import messaging from '@react-native-firebase/messaging';
import fetchFromBack from "../services/fetchFromBack";

WebBrowser.maybeCompleteAuthSession();

export default function App({navigation}) {
  const { login, isLoggedIn, setBackToken } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:"651976534821-nbuletbjnpgr8rf0q03quv7d8osn4onp.apps.googleusercontent.com"
  });

  const handleUserSuspended = () => {
    alert("Su usuario fue suspendido, por favor comuniquese con el servicio de soporte");
  };

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getJwt();
    }
  }, [response, token]);

  const getJwt = async () => {
    // if (!token) return;
    let url = `https://4805-181-167-107-74.sa.ngrok.io/user/login?token=asd&name=tomas&mail=mail`
    fetch(url)
    .then((response) => {
      if (response.status === 403)
        handleUserSuspended();
      else {
        return response.json();
      }
    })
    .then((jwt) => {
        setBackToken(jwt.access_token);
        login();
        messaging().getToken().then(fcm_token => {
          fetchFromBack('/user/firebase_token', { method: 'PUT', token: fcm_token})
        });

        navigation.navigate('Home');
    })
    .catch((error) => {
        console.error(error);
    })
    
  };

  return (
    <View style={styles.container}>
        <Text style={{
            fontWeight: 'light',
            fontSize: 40,
            paddingBottom: 40,
        }}>
            TicketApp
        </Text>
        { isLoggedIn ? (
            <Button
            title="Continuar a la aplicación"
            disabled={!request}
            onPress={() => navigation.navigate('Home')}
          />
        ) : (
          <Button
            title="Login con Google"
            disabled={!request}
            onPress={() => promptAsync().then(() => getJwt())}
        />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});