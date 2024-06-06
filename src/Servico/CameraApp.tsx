import axios from 'axios';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useContext, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { AuthContext } from '../contexts/auth';


export default function CameraApp() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mensagem, setMensagem] = useState('')
  const cameraRef = useRef(null);
  const server = 'http://192.168.15.11'
  const porta = ':8080'
  const {user, deslogar, location} = useContext(AuthContext);

  const latitude = location.coords.latitude
  const longitude = location.coords.longitude


  const makeAPICall = async () => {
    try {
      const response = await fetch(`${server}${porta}/criar_foco/${latitude}/${longitude}/${user.nome}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log("foco criado");
        setMensagem("FOCO CRIADO, não precisa mais mandar fotos!")
        setTimeout(() => setMensagem(''), 8000);
      } else {
        console.error("Failed to create focus:", response.status, response.statusText);
      }
    } catch (e) {
      console.error("Error apagando focos:", e);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({ base64: true });
      const resizedImage = await resizeImage(data.uri);
      console.log("Imagem criada")
      uploadImage(resizedImage.base64);
    }
  };

  const resizeImage = async (uri) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    return manipulatedImage;
  };

  const uploadImage = (base64) => {
    const formattedBase64 = `data:image/jpeg;base64,${base64}`;
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/lixo-na-praiaa/2",
      params: {
          api_key: "4GVVSjKtSOvGIeJa4dTN"
      },
      data: formattedBase64,
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
      })
    .then(response => {
      console.log(response.data);
      checkForTrash(response.data);
    })
    .catch(error => {
      console.log(error.message);
    });
  };
  const checkForTrash = (data) => {
    const predictions = data.predictions || [];
    const hasTrash = predictions.some(prediction => prediction.class === "Trash" && prediction.confidence > 0.6);

    if (hasTrash) {
      console.log("Trash!");
      makeAPICall()
    }
    else{
      console.log("No Trash")
    }
  };


  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={takePicture}>
            <Text style={styles.text}>Capture Focus</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
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
    backgroundColor: "#5f393971",
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mensagem: {
    color: '#ff0000',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 5,
    fontWeight: 'bold'
  }
});