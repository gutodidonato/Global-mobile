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
import Cliente from "../ServicoDetec/Cliente"; "../ServicoDetec/Cliente"

export default function Maps({ navigation }) {
  const { user, logar, deslogar, location} = useContext(AuthContext);



  return (
    <View style={styles.container}>

          <Cliente/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000005ce",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
  }
});
