import 'url-search-params-polyfill';
import 'react-native-url-polyfill/auto';
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import createClient from '../sanity';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 3,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  profileImage: {
    height: 30,
    width: 30,
    backgroundColor: '#ccc',
    padding: 4,
    borderRadius: 17,
  },
  headerCont: {
    flex: 1,
    marginLeft: 3
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#999',
  },
  locationText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 4,
    color: 'black',
  },
  searchContWithSlider: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 8,
  },
  searchContainer: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbdbdb',
    padding: 8,
    flex: 1
  },
  userIcon: {
    // marginLeft: 'auto',
  },
  searchIcon: {
    marginRight: 8
  },
  sliderIcon: {
    marginLeft: 10
  }
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    createClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->{
            ...,
            "image": image.asset->url
          }
        }
      }
    `)
      .then(data => {
        setFeaturedCategories(data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Set isLoading to false in case of error
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://links.papareact.com/wru'
          }}
          style={styles.profileImage}
        />
        <View style={styles.headerCont}>
          <Text style={styles.headerText}> Deliver Now!</Text>
          <Text style={styles.locationText}>Current Location <Icon name="chevron-down" size={15} color="#00CCBB" /></Text>
        </View>
        <Icon name="user" size={28} color="#00CCBB" style={styles.userIcon} />
      </View>
      <View style={styles.searchContWithSlider}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#757474" style={styles.searchIcon} />
          <TextInput placeholder='Restaurants and cuisines' keyboardType='default' />
        </View>
        <Icon name="sliders" size={20} color="#00CCBB" style={styles.sliderIcon} />
      </View>
      <ScrollView>
        <Categories /> 
        {!isLoading && (
          featuredCategories.map(category => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              image={category.restaurants[0].dishes[0].image}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
