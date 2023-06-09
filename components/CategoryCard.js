import { View,Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({ imgUrl, title}) => {
  return (
    <TouchableOpacity style={{marginRight: 7}}>
        <Image source={{
            uri: imgUrl,
        }}
        style={{height: 72, width: 72, borderRadius: 5}}
        />

      <Text style={{position: 'absolute', bottom: 4, left: 4, color: '#ffffff', fontSize: 12}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard