import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../contexts/auth";
import CameraApp from "../Servico/CameraApp";
import Gerenciar from "../Servico/GerenciamentoFoco";


export default function Principal({ navigation }) {
  const [servico, setServico] = useState([])
  const { user, location} = useContext(AuthContext);

  let latitude, longitude;

  if (location && location.coords) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fundo.png")}
        resizeMode="cover"
        style={styles.fundoPreto}
      >
        <View style={styles.caixa}>
            <View style={styles.cameraNossa}>
              <Image source={require("../assets/logo.png")} style={styles.logo} />
              {user.status === 'usuario' ? (
              <CameraApp user={user} latitude={latitude} longitude={longitude} />
            ) : (
              <Gerenciar />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000005ce",
    alignItems: "center",
    justifyContent: "center",
  },
  fundoPreto: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
  },
  cameraNossa: {
    width: '80%',
    height: '90%'
  },
  logo: {
    marginBottom: 50,
    marginHorizontal: 'auto',
  },
  caixa: {
    backgroundColor: "rgba(255, 255, 255, 0.527))",
    borderRadius: 50,
    width: "90%",
    height: "90%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100,
    paddingTop: 40,
    marginBottom: 50
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20
  }

});

const estilo = StyleSheet.create({
  caixa: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10
  },
  texto: {
    color: "white"
  }
})
