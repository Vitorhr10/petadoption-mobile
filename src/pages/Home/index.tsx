import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as AuthSession from 'expo-auth-session'

import styles from './styles';
import { Button } from '../../components/Button';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthResponse {
  type: string;
  params: {
    access_token: string;
  }
}

const Home = () => {
  const navigation = useNavigation()

  const [ufs, setUfs] = useState<PickerItem[]>([]);
  const [cities, setCities] = useState<PickerItem[]>([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  async function handleNavigateToPetPoints() {
    
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { type, params} = await AuthSession.startAsync({ authUrl }) as AuthResponse;

    if(type === 'success') {
      navigation.navigate('PetPoints', {
        token: params.access_token,
        uf: selectedUf,
        city: selectedCity
      })
    }
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

export default Home