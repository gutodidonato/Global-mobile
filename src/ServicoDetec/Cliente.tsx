import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native';
import React from 'react';
import ImageViewer from './ImageViewer/Index';
// ...rest of the import statements remain unchanged

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View>
      <View>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View >
      {/* ...rest of the code remains same */}
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
    </View>
    </View>
  )}