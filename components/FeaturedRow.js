import { View, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Feather';
import RestaurantCard from './RestaurantCard';
import createClient from '../sanity';


const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createClient.fetch(`
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
           type-> {
            name
           }
        },
      }[0]`,
      {id}
    ).then((data) => {
      setRestaurants(data.restaurants);
      setIsLoading(false); // Set isLoading to false when data is fetched
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false); // Set isLoading to false in case of error
    });
  }, [id]);

  return (
    <View style={{paddingTop: 15, paddingBottom: 5}}>
      <View style={{ paddingHorizontal: 8, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{title} </Text>
        <Icon name="arrow-right" size={24} color="#00CCBB" />
      </View>
      <Text style={{paddingHorizontal: 8, color: 'grey', fontSize: 10}}>{description} </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 8, paddingTop: 5}}>
        {!isLoading && (
         restaurants.map(restaurant => (
          <RestaurantCard 
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            genre={restaurant.type.name}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))
      )
      }

      </ScrollView>
    </View>
  )
}

export default FeaturedRow