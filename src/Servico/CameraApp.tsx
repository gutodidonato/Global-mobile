import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

export default function CameraApp() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraStream = async () => {
    if (!hasPermission) return;
  
    const camera = await Camera.getCameraPermissionsAsync();
    if (!camera || !camera.granted) return;
  
    const library = await MediaLibrary.getPermissionsAsync();
    if (!library || !library.granted) return;
  
    setCameraRef(!camera); 
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={() => Camera.requestCameraPermissionsAsync().then(({ status }) => setHasPermission(status === 'granted'))} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      uploadImage(photo.base64);
    }
  };

  const uploadImage = (base64) => {
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/fishes-troublemakers-polution/3",
      params: {
        api_key: "dcancgRDUVTmAWQjWwwm",
      },
      data: {
        image: base64,
      },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} onCameraReady={handleCameraStream}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Capture Focus</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
