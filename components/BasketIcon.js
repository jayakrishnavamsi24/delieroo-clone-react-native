import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter';


const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    if(items.length === 0) return null;

  return (
    <View style={{position: 'absolute', left: 0, right: 0, bottom: 20, flex: 1, zIndex: 50}}>
        <TouchableOpacity onPress={() => navigation.navigate("Basket")} style={{backgroundColor: '#00CCBB', marginHorizontal: 20, padding: 15, borderRadius: 7, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#ffffff', fontWeight: 900, fontSize: 15,backgroundColor: '#01A296', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 3}}>{items.length}</Text>
            <Text style={{color: '#ffffff', flex: 1, textAlign: 'center', fontSize: 15,fontWeight: 900}}> View Basket </Text>
            <Text style={{color: '#ffffff', fontWeight: 900, fontSize: 15}}>
                <Currency quantity={basketTotal} currency='INR'/>
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketIcon