import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from "react-native-animatable"
import { useNavigation } from '@react-navigation/native'


const PreparingOrderScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
        navigation.navigate("Delivery");
    }, 4000);
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: '#00CCBB', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.Image
        source={require("../assets/orderLoadingCompressed.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={{width: windowWidth * 1.2, height: windowWidth * 1.1, resizeMode: 'contain' }}
      />
      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        style={{color: '#ffffff', fontWeight: 'bold'}}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Animatable.View animation='slideInUp' iterationCount={1} style={{
            position: 'absolute',
            bottom: 80,
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          <ActivityIndicator style={{width: 64, height: 64}} color="white" />
      </Animatable.View>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen
