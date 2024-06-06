import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Gerenciar() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [apagado, setApagado] = useState('');
  const server = 'http://192.168.15.11'
  const porta = ':8080'


  const makeAPICall = async () => {
    try {
      const response = await fetch(`${server}${porta}/deletar_foco/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log("Apagado");
        setId('');
        setNome('');
        setNomeEmpresa('');
        setApagado('Apagado!');
        setTimeout(() => setApagado(''), 3000);
      } else {
        console.error("Failed to delete focus:", response.status, response.statusText);
      }
    } catch (e) {
      console.error("Error apagando focos:", e);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Foco Apagado?</Text>
       <Text style={styles.text}>Id</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o id"  
            value={id}
            onChangeText={(text) => setId(text)}/>

          <Text style={styles.text}>Nome da Empresa</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o nome da empresa"
            onChangeText={(text) => setNomeEmpresa(text)}/>

          <Text style={styles.text}>Nome do foco</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o nome do foco"  
            value={nome}
            onChangeText={(text) => setNome(text)}/>

          <TouchableOpacity
            style={styles.button}
            onPress={()=>{makeAPICall()}}>
            <Text style={styles.buttonText}> Apagar foco</Text>
          </TouchableOpacity>
          <Text style={styles.apagado}>{apagado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    alignItems: "center",
    marginHorizontal: 'auto',
    backgroundColor: "#2c2c2c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "60%",
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 15
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#d4d4d4",
    borderColor: "#312e2e",
    width: "100%",
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
    width: "100%",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  apagado: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center'
  }
  
});