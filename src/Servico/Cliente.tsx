import React, { useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { AuthContext } from '../contexts/auth';

export default function Cliente() {
  const { user, logar, deslogar, location} = useContext(AuthContext);

  const latitudePos = location["coords"]["latitude"];
  const longitudePos = location["coords"]["longitude"];

  const foco = [
    { latitude: 23.52, longitude: 46.69, nome: 'foco1' }
  ];


  const renderStatus = () => {
    return user.status === 'cliente' ? (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitudePos,
          longitude: longitudePos,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: latitudePos,
            longitude: longitudePos,
          }}
          description="Você está aqui"
          title="Você">
          <View style={styles.myself}>
            <Text style={styles.textos}>Você</Text>
          </View>
        </Marker>


        {foco.map((foco, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: foco.latitude, longitude: foco.longitude }}>
            <View style={styles.foco}>
              <Text style={styles.textos}>{foco.nome}</Text>
            </View>
          </Marker>)
          )}


      </MapView>
    ) 
    : 
    (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitudePos,
          longitude: longitudePos,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: latitudePos,
            longitude: longitudePos,
          }}
          description="Você está aqui"
          title="Você">
          <View style={styles.myself}>
            <Text style={styles.textos}>Você</Text>
          </View>
        </Marker>
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
