import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';

import * as Progress from 'react-native-progress'

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    const handleCallPress = () => {
        const phoneNumber = '9908615249'; // Replace with your phone number
        Linking.openURL(`tel:${phoneNumber}`);
    };

  return (
    <View style={{backgroundColor: '#00CCBB', flex: 1}}>
        <SafeAreaView style={{zIndex: 50}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 15,paddingVertical: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{backgroundColor: 'transparent', borderRadius: 30}}>
                    <Icon name="close" size={38} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{color: '#fff', fontWeight: 300}}>Order Help</Text>
            </View>
            <View style={{backgroundColor: '#ffffff', marginHorizontal: 15, padding: 20, borderRadius: 5, shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <View>
                        <Text style={{color: 'gray', fontWeight: 400}}>Estimated Arrival </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 30}}>45-55 Minutes</Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://links.papareact.com/fls'
                        }}
                        style={{height: 80, width: 80}}
                    />
                </View>
                <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
                <Text style={{color: 'gray', fontSize: 11, marginTop: 10}}>
                    Your order at FoodHub is being prepared
                </Text>
            </View>
        </SafeAreaView>

        <MapView
            initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            style={{flex: 1, marginTop: -30,zIndex: 0}}
            mapType='mutedStandard'
        >
            <Marker
              coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.long
              }}
              title={restaurant.title}
              description={restaurant.short_description}
              identifier='origin'
              pinColor='#00CCBB'
            />
        </MapView>
        <SafeAreaView style={{paddingTop: -10, paddingBottom: 20, backgroundColor: '#ffffff', paddingHorizontal: 15,display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Image
                source={{
                    uri: "https://links.papareact.com/wru",
                }}
                style={{
                    height: 45,
                    width: 45,
                    backgroundColor: '#ccc',
                    borderRadius: 25,
                    marginRight: 15,
                }}
            />
            <View style={{display: 'flex', flex: 1,flexDirection: 'column', justifyContent: 'flex-start', }}>
                <Text style={{fontWeight: 500, fontSize: 15}}>
                    Jaya Krishna Vamsi
                </Text>
                <Text style={{color: 'gray', fontSize: 13, fontWeight: 400}}>Your Rider</Text>
            </View>
            <TouchableOpacity onPress={handleCallPress}>
                <Text style={{ color: '#00CCBB', fontWeight: 'bold', marginRight: 10 }}>Call</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen