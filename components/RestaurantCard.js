import { View, Text,Image, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';


const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}) => {
    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
        navigation.navigate('Restaurant', {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        })
    }}>
        <View style={styles.touchableOpacityStyles}>
            <Image source={{
                uri: urlFor(imgUrl).url()
            }}
            style={styles.image}
            />
            <View style={{paddingHorizontal: 10, paddingBottom: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 10}}>{title}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                    <FontAwesomeIcon name="star" size={18} color="green" style={{opacity: 0.5}} />
                    <Text style={{color: 'grey', fontSize: 12,opacity: 0.5, fontWeight: 500}}>
                        <Text style={{color: 'green', fontWeight: 500}}>  {rating}</Text>    {genre}
                    </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="map-pin" size={22} color="gray" style={{opacity: 0.4, marginRight: 3}} />
                    <Text style={{fontSize: 10, color: 'gray', fontWeight: 500}}>Nearby {address}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image: {
        height: 130, 
        width: 230,   
    },
    touchableOpacityStyles: {
        marginTop: 10, 
        backgroundColor: '#ffffff', 
        marginRight: 10, 
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            },
            android: {
              elevation: 0,
            },
          }),
    }
})

export default RestaurantCard