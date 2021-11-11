import React, { useEffect, useState } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'
import * as AuthSession from 'expo-auth-session'

import { Button } from '../../components/Button';

const Home = () => {
  const navigation = useNavigation()

  const [ufs, setUfs] = useState<PickerItem[]>([]);
  const [cities, setCities] = useState<PickerItem[]>([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  async function handleNavigateToPetPoints() {
    const CLIENT_ID = '60164303098-jj3sbtdgtoljpq4oqrvtvc5cnvsj4k9o.apps.googleusercontent.com';
    const REDIRECT_URI = 'https://auth.expo.io/@vitorhr10/mobile';
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const reponse = await AuthSession.startAsync({ authUrl });

    console.log(reponse);

    navigation.navigate('PetPoints', {
      uf: selectedUf,
      city: selectedCity
    })
  }

  interface IBGEUFResponse {
    sigla: string;
    nome: string;
  }

  interface IBGECityResponse {
    nome: string;
  }

  interface PickerItem {
    label: string;
    value: string;
  }

  interface AuthResponse {
    type: string;
    params: {
      access_token: string;
    }
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        const ufInitials = response.data.map(uf => ({
          label: uf.nome,
          value: uf.sigla,
        }));
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === null) return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => ({
          label: city.nome,
          value: city.nome,
        }));
        setCities(cityNames);
      });
  }, [selectedUf]);

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 91, height: 549, left: 300, top: 30 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>O lugar ideal para encontrar seu novo pet</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem animais de estimação disponíveis para adoção de forma fácil e direta.</Text>
      </View>

      <View style={styles.footer}>

          <Button
            title="Entrar com Google"
            icon="social-google"
            onPress={handleNavigateToPetPoints}
          />

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#564556',
    fontSize: 40,
    fontFamily: 'FredokaOne_400Regular',
    maxWidth: 260,
    marginTop: 72,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Comfortaa_400Regular',
    maxWidth: 260,
    lineHeight: 28,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#d11000',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Comfortaa_500Medium',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
  }
});

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: 56,
  },
  iconContainer: {
    top: 18,
    right: 12,
    color: '#A0A0B2',
    opacity: 0.5
  },
});

export default Home