import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function Mapeamento({ user, latitude, longitude }) {
  const [local, setLocal] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);

  const server = 'http://192.168.0.83';
  const porta = ':8080';

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      makeAPICall();
      setInitialRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [latitude, longitude]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(`${server}${porta}/focos/${latitude}/${longitude}`, { mode: 'cors' });
      const data = await response.json();
      setLocal(data);
    } catch (e) {
      console.error('Error fetching focos:', e);
    }
  };

  const renderStatus = () => {
    const userIsEmpresa = user.status === 'empresa';
    if (initialRegion === null) {
      return 
    }
  
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          description="Você está aqui"
          title="Você"
        >
          <View style={styles.myself}>
            <Text style={styles.textos}>Você</Text>
          </View>
        </Marker>
        
        {userIsEmpresa &&
          local.map((foco, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: foco[1], longitude: foco[2] }}
            >
              <View style={styles.myself}>
                <Text style={styles.textos}>nome:{foco[3]} indice:{foco[0]}</Text>
              </View>
            </Marker>
          ))}
      </MapView>
    );
  };
  return renderStatus();
}


const styles = StyleSheet.create({
  map: {
    width: '90%',
    height: '90%',
  },
  myself: {
    backgroundColor: '#144910',
    padding: 5
  },
  textos: {
    color: "white",
    fontSize: 10
  },
  foco : {
    backgroundColor: 'red',
    padding: 5
  }
});
