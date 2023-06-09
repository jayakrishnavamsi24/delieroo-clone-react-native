import { View, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import CategoryCard from './CategoryCard'
import createClient, { urlFor } from '../sanity';


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createClient.fetch(`
      *[_type == "category"] `
    ).then((data) => {
      setCategories(data);
      setIsLoading(false); // Set isLoading to false when data is fetched
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false); // Set isLoading to false in case of error
    });
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal: 8,
        paddingTop: 20
    }}>
        {!isLoading && (
         categories.map(category => (
          <CategoryCard 
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}
          />
        ))
      )
      }
    </ScrollView>
  )
}

export default Categories