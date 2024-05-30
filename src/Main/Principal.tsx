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


import Lanches from "../Produtos/Lanches";

export default function Principal({ navigation }) {
  const [servico, setServico] = useState([])
  const { user, logar, deslogar} = useContext(AuthContext);

  console.log(user)

  const makeAPICall = async () => {
    try {
      const response = await fetch(`http://192.168.0.83:8080/servicos/${user.status}`, {mode: "cors", });
      const data = await response.json();
      setServico(data);
    } catch (e) {
      console.error("Error fetching restaurantes:", e);
    }
  };


  useEffect(() => {
    makeAPICall();
  }, []);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fundo.png")}
        resizeMode="cover"
        style={styles.fundoPreto}
      >
        <View style={styles.caixa}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.titulo}>Serviços para {user.status}</Text>
          <FlatList
          data={servico} 
          renderItem={({ item }) => (
          <View style={estilo.caixa}>
          <TouchableOpacity onPress={() => {
            item.nome === 'Lanches' ? navigation.navigate('Lanches') : console.log("Não implementado ainda");
          }}>
            <Text style={estilo.texto}>{item.nome}</Text>
          </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.nome} 
      />
        </View>
      </ImageBackground>
    </View>
  );
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
  logo: {
    marginBottom: 50,
  },
  caixa: {
    backgroundColor: "#1c5a94",
    borderRadius: 50,
    width: "95%",
    height: 600,
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