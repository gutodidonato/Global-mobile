import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../contexts/auth";
import Cliente from '../Servico/Mapeamento';


export default function Verificar({ navigation }) {
  const { user, logar, deslogar, location} = useContext(AuthContext);



  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fundo.png")}
        resizeMode="cover"
        style={styles.fundoPreto}
      >
        <View style={styles.caixa}>
          <Cliente/>
          </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
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
  caixa: {
    backgroundColor: "rgba(255, 255, 255, 0.678))",
    borderRadius: 50,
    width: "95%",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingTop: 0,
    marginBottom: 50
  }
});
