import React, { useEffect, useState } from 'react'
import { Feather as Icon, FontAwesome as Icon2 } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, Linking } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'

import styles from './styles';

interface Params {
  petpoint_id: number,
}

interface Data {
  petpoint: {
    image: string,
    image_url: string,
    petname: string,
    description: string,
    username: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
    latitude: string;
    longitude: string;
  },
  category: {
    title: string,
  }[]
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data)

  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    api.get(`petpoints/${routeParams.petpoint_id}`).then(res => {
      setData(res.data)
    })
  }, [])

  function handleNavigateBack() {
    navigation.goBack()
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: `Interesse em adotar o(a) ${data.petpoint.petname}`,
      recipients: [data.petpoint.email],
    })
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.petpoint.whatsapp}&text=Olá, ${data.petpoint.username}, tenho interesse em adotar o(a) ${data.petpoint.petname}!`)
  }

  function handleDirections() {
    Linking.openURL(`google.navigation:q=${data.petpoint.latitude},${data.petpoint.longitude}`);
  }

  if (!data.petpoint) {
    return null // Loading screen
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon style={{ marginTop: 20 }} name="arrow-left" size={25} color="#d11000" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: data.petpoint.image_url }} />

        <Text style={styles.petPointName}>{data.petpoint.petname}</Text>
        <Text style={styles.petPointCategory}>{data.category.map(category => category.title).join(', ')}</Text>

        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.address}>
            <Text style={styles.titleField}>Descrição</Text>
            <Text style={styles.dataField}>{data.petpoint.description}</Text>
          </View>

          <View style={styles.address}>
            <Text style={styles.titleField}>Nome do(a) doador(a)</Text>
            <Text style={styles.dataField}>{data.petpoint.username}</Text>
          </View>

          <View style={styles.address}>
            <Text style={styles.titleField}>Email</Text>
            <Text style={styles.dataField}>{data.petpoint.email}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <Icon2 name='whatsapp' size={24} color="#FFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleDirections}>
          <Icon2 name="car" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Como chegar</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail