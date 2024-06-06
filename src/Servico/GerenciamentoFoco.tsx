import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Gerenciar() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');



  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Foco Apagado?</Text>
       <Text style={styles.text}>Id</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o id"  
            value={id}
            onChangeText={()=>console.log("mudado")}/>

          <Text style={styles.text}>Nome da Empresa</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o id"  
            value={nome}
            onChangeText={()=>console.log("mudado")}/>

          <Text style={styles.text}>Nome do foco</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o id"  
            value={nome}
            onChangeText={()=>console.log("mudado")}/>
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
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
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
});