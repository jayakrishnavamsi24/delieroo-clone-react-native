import { View, Text, TouchableOpacity, Image } from 'react-native'
import Currency from 'react-currency-formatter';
import React, {useState} from 'react'
import { urlFor } from '../sanity';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';


const DishRow = ({id, name, description, price, image}) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({id, name, description, price, image}))
  }

  const removeItemFromBasket = () => {
    if(!items.length > 0) return;
    dispatch(removeFromBasket({id}));
  }

  return (
    <>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)} style={{backgroundColor: '#ffffff', paddingVertical: 15, paddingHorizontal: 15, borderStyle: 'solid', borderWidth: 0.1, borderColor: 'gray', fontWeight: 200}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight: 10}}>
                    <Text style={{fontWeight: 500,fontSize: 15}}>{name}</Text>
                    <Text style={{color: 'gray', fontWeight: 500, fontSize: 12, marginVertical: 5}}>{description}</Text>
                    <Text style={{color: 'gray', fontWeight: 400}}>
                        <Currency quantity={price} currency='INR'/>
                    </Text>
                </View>
                <View>
                    <Image
                    source={{
                        uri: urlFor(image).url()
                    }}
                    style={{height: 80, width: 80, padding: 4, backgroundColor: 'gray', }}
                    />
                </View>
            </View>
        </TouchableOpacity>
        {isPressed && (
            <View style={{backgroundColor: '#ffffff', paddingHorizontal: 20, paddingBottom: 15}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                        <FontAwesome name="minus-circle" size={34} color={items.length > 0 ? "#00CCBB" : "gray"} />
                    </TouchableOpacity>
                    <Text>   {items.length}   </Text>
                    <TouchableOpacity onPress={addItemToBasket}>
                        <FontAwesome name="plus-circle" size={34} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
            </View>
        )}
    </>
  )
}

export default DishRow