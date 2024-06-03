import React, {useState, createContext, useEffect} from 'react';
import { signInWithEmailAndPassword, getAuth, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, get, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export const AuthContext = createContext({});



function AuthProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState({});

  useEffect(()=>{
    async function loadStorage(){
      const userStored = await AsyncStorage.getItem('Auth_user')
    if (userStored){
      setUser(JSON.parse(userStored));
    }
  }
  (async () => {
      
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
    console.log(location)
    loadStorage()

  }, [])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  const auth = getAuth();

  async function deslogar(){
    const auth = getAuth()
    console.log("Deslogar...")
    await signOut(auth);
    await AsyncStorage.removeItem('Auth_user');
    setUser({})
    console.log("Deslogado")
  }

  async function logar(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const db = getDatabase();
      const userRef = ref(db, 'usuarios/' + uid);
      const snapshot = await get(userRef);
      const userData = {
        uid: uid,
        nome: snapshot.val().nome,
        email: userCredential.user.email,
        cpf: snapshot.val().cpf,
        status: snapshot.val().status
      };
      setUser(userData);
      storageUser(userData);
    } catch (error) {
      alert("Ops, algo deu errado: " + error.message);
    }
  }


  async function storageUser(data){
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
  }


  return (
    <AuthContext.Provider value={{ user, logar, deslogar, location }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;