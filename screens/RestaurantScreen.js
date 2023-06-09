import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { urlFor } from '../sanity';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';


const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    }
  } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({
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
    }))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
  
  }, []);

  return (
    <SafeAreaView>
        <BasketIcon />
        <ScrollView>
            <View style={{position: 'relative'}}>
                <Image
                    source={{
                        uri: urlFor(imgUrl).url(),
                    }} 
                    style={{height: 200, backgroundColor: 'gray', padding: 30}}
                />
                <TouchableOpacity onPress={navigation.goBack} style={{position: 'absolute', top: 20, left: 12, padding: 10, backgroundColor: '#ffffff', borderRadius: 30}}>
                    <Icon name="arrow-left" size={22} color="#00CCBB" />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{padding: 12}}>
                    <Text style={{fontWeight: 'bold', fontSize: 23}}>{title}</Text>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                        <View style={{display: 'flex', opacity: 0.6, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 3}}>
                            <FontAwesomeIcon name="star" size={18} color="green" style={{opacity: 0.7}} />
                            <Text style={{color: 'grey', fontSize: 12, fontWeight: 500}}>
                                <Text style={{color: 'green', fontWeight: 500}}>  {rating}</Text>   {genre}
                            </Text>
                        </View>
                        <View style={{display: 'flex',opacity: 0.6, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
                            <FontAwesomeIcon5 name="map-marker-alt" size={18} color="gray" style={{opacity: 0.6, marginRight: 3}} />
                            <Text style={{color: 'grey', fontSize: 12, fontWeight: 500}}>
                                <Text style={{color: 'gray', fontWeight: 500}}> Nearby</Text> {address}
                            </Text>
                        </View>
                    </View>
                    <Text style={{color: 'gray', fontWeight: 500, fontSize: 12, marginVertical: 5}}>{short_description}</Text>
                </View>
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 15}}>
                    <AntDesignIcon name="questioncircleo" size={16} color="gray" style={{opacity: 0.6}} />
                    <Text style={{fontWeight: 'bold', fontSize: 12, flex: 1, marginLeft: 14}}>
                        Have a food allergy? 
                    </Text>
                    <Icon name="chevron-right" size={22} color="#00CCBB" />
                </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 130}}>
                <Text style={{padding: 15, fontWeight: 'bold', fontSize: 18}}>Menu</Text>
                {dishes.map(dish => (
                    <DishRow
                      key={dish._id}
                      id={dish._id}
                      name={dish.name}
                      description={dish.short_description}
                      price={dish.price}
                      image={dish.image} 
                    />
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RestaurantScreen