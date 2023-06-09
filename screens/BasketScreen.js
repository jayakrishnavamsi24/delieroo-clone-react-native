import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketItemsWithId, selectBasketTotal } from '../features/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Octicons';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';


const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View style={{flex: 1, backgroundColor: '#cccccc40'}}>
            <View style={{padding: 10, paddingBottom: 15,borderStyle: 'solid', borderBottomWidth: 0.2, borderColor: '#00CCBB', backgroundColor: '#ffffff'}}>
                <View>
                    <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>Basket</Text>
                    <Text style={{textAlign: 'center', color: 'gray', fontWeight: 400, fontSize: 12}}>FoodHub - A heaven for food lovers 😋</Text>
                </View>
                <TouchableOpacity onPress={navigation.goBack} style={{position: 'absolute', top: 5, right: 12, padding: 10, backgroundColor: 'transparent', borderRadius: 30}}>
                    <Icon name="x-circle-fill" size={38} color="#00CCBB" />
                </TouchableOpacity>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',backgroundColor: '#ffffff', paddingHorizontal: 15, paddingVertical: 15, marginVertical: 20}}>
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru",
                    }}
                    style={{height: 30,
                        width: 30,
                        backgroundColor: '#ccc',
                        padding: 4,
                        borderRadius: 17,
                        marginRight: 15
                    }}
                />
                <Text style={{flex: 1}}>Delivery in 50-75 min</Text>
                <TouchableOpacity>
                    <Text style={{color: '#00CCBB'}}>Change</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <View key={key} style={{display: 'flex', backgroundColor: '#ffffff',flexDirection: 'row', justifyContent: 'center', alignItems: 'center',paddingVertical: 15, paddingHorizontal: 15, marginBottom: 1.5}}>
                        <Text style={{color: '#00CCBB'}}>{items.length} x   </Text>
                        <Image 
                            source={{uri: urlFor(items[0]?.image).url()}}
                            style={{height: 50, width: 50, borderRadius: 25}}
                        />
                        <Text style={{flex: 1}}>  {items[0]?.name}</Text>
                        <Text style={{color: 'gray', fontWeight: 400}}>
                            <Currency quantity={items[0]?.price} currency='INR'/>
                        </Text>
                        <TouchableOpacity>
                            <Text style={{color: '#00CCBB'}} onPress={() => dispatch(removeFromBasket({id: key}))}>   Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={{paddingVertical: 30, paddingHorizontal: 20,backgroundColor: '#ffffff'}}>
                <View style={{display: 'flex', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'gray'}}>Subtotal</Text>
                    <Text style={{color: 'gray'}}>
                        <Currency quantity={basketTotal} currency='INR' />
                    </Text>
                </View>
                <View style={{display: 'flex', marginBottom: 20,flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: 'gray'}}>Delivery Fee</Text>
                    <Text style={{color: 'gray'}}>
                        <Currency quantity={50} currency='INR' />
                    </Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 500}}>Order Total</Text>
                    <Text style={{fontWeight: '900'}}>
                        <Currency quantity={basketTotal + 50} currency='INR' />
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} style={{backgroundColor: '#00CCBB', marginTop: 20, padding: 20, borderRadius: 7, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#ffffff', flex: 1, textAlign: 'center', fontSize: 15,fontWeight: 900}}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen