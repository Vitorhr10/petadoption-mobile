import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
