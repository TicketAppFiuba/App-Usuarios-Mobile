import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { storeData } from "../libs/LocalStorageHandlers";
import { AuthContext } from '../components/AuthProvider';


WebBrowser.maybeCompleteAuthSession();

export default function App({navigation}) {
  const { login, isLoggedIn } = useContext(AuthContext);
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
    if (!token) return;
    let url = `https://0f87-201-212-239-28.ngrok-free.app/user/login?token=${token}`
    console.log(url)
    fetch(url)
    .then((response) => {
      if (response.status === 403)
        handleUserSuspended();
      else 
       return response.json();
    })
    .then((jwt) => {
        storeData(jwt.access_token)
        .then((data)=>{
          login();
          navigation.navigate('Home');
        })
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
        <Button
          title="Login con Google"
          disabled={!request}
          onPress={() => promptAsync()}
        />
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