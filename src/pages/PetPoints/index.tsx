import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import Emoji from 'react-native-emoji'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { SvgUri } from 'react-native-svg'
import api from '../../services/api'

import styles from './styles';

interface Category {
  id: number,
  title: string,
  image_url: string,
}

interface PetPoints {
  id: number,
  petname: string,
  image: string,
  image_url: string,
  latitude: number,
  longitude: number
}

interface Params {
  uf: string,
  city: string,
  token: string
}

interface Profile {
  email: string;
  given_name: string;
}

const PetPoints = () => {
  const [profile, setProfile] = useState({} as Profile)
  const [category, setCategory] = useState<Category[]>([])
  const [petPoints, setPetPoints] = useState<PetPoints[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const navigation = useNavigation()
  const route = useRoute()

  const { token } = route.params as Params

  const routeParams = route.params as Params

  async function loadProfile() {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
    const userinfo = await response.json();
    setProfile(userinfo);
  }

  useEffect(() => {
    loadProfile()
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Ooops...', 'Precisamos da sua permissão para obtermos a localização.')
        return
      }

      const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Lowest})
      const { latitude, longitude } = location.coords

      setInitialPosition([
        latitude,
        longitude
      ])
    }

    loadPosition()
  }, [])

  useEffect(() => {
    api.get('category').then(res => {
      setCategory(res.data)
    })
  }, [])

  useEffect(() => {
    api.get('petpoints', {
      params: {
        selectedCity: routeParams.city,
        selectedUf: routeParams.uf,
        category: selectedCategory
      }
    }).then(res => {
      setPetPoints(res.data)
    })
  }, [selectedCategory])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { petpoint_id: id })
  }

  function handleSelectItem(id: number) {
    setSelectedCategory([id])
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={25} color="#d11000" />
        </TouchableOpacity>

        <Text style={styles.description}>Bem vindo, {profile.given_name}</Text>

        <Text style={styles.description}>Escolha qual pet deseja adotar.</Text>

        <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {category.map(category => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={String(category.id)}
              style={[
                styles.item,
                selectedCategory.includes(category.id) ? styles.selectedItem : {}
              ]}
              onPress={() => handleSelectItem(category.id)}>
              <SvgUri width={42} height={42} uri={category.image_url} />
              <Text style={styles.itemTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>

        <Text style={styles.description}>Encontre no mapa seu pet.</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}>

              {petPoints.map(petPoint => (
                <Marker
                  key={String(petPoint.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(petPoint.id)}
                  coordinate={{
                    latitude: petPoint.latitude,
                    longitude: petPoint.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: petPoint.image_url }} />
                    <Text style={styles.mapMarkerTitle}>{petPoint.petname}</Text>
                  </View>
                </Marker>
              ))}

            </MapView>
          )}
        </View>
      </View>

    </>
  )
}

export default PetPoints