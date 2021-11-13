import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    petPointName: {
      color: '#564556',
      fontSize: 36,
      fontFamily: 'FredokaOne_400Regular',
      marginTop: 24,
    },
  
    petPointCategory: {
      fontFamily: 'Comfortaa_400Regular',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 24,
      marginTop: 8,
      color: '#d11000'
    },
  
    address: {
      marginTop: 32,
    },
  
    titleField: {
      color: '#322153',
      fontFamily: 'Comfortaa_700Bold',
      fontSize: 16,
    },
  
    dataField: {
      fontFamily: 'Comfortaa_400Regular',
      lineHeight: 24,
      marginTop: 8,
      textAlign: 'justify',
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  
    button: {
      width: '48%',
      backgroundColor: '#d11000',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 15,
      fontFamily: 'Comfortaa_500Medium',
    },
  });
