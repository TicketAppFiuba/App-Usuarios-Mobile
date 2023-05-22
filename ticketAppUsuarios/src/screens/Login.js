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
    expoClientId:"651976534821-njeiiul5h073b0s321lvn9pevadj3aeg.apps.googleusercontent.com",
    androidClientId:"651976534821-njeiiul5h073b0s321lvn9pevadj3aeg.apps.googleusercontent.com", // cambiar por id real
  });

  const handleLogin = () => {
    // promptAsync();
    login();
    navigation.navigate('Home');
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
    .then((response) => response.json())
    .then((jwt) => {
        storeData(jwt.access_token)
        .then((data)=>{
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
          onPress={handleLogin}
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