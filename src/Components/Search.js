import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import { AntDesign } from '@expo/vector-icons';

const Search = ({
    onSearch,
    error = "",
    goBack
}) => {
    const [keyword, setKeyword] = useState("")
    const {width, height}  = useWindowDimensions()

  return (
    <View style ={width > 350 ? styles.container : styles.containerSm}>
        <TextInput style ={styles.input} 
            placeholder='Search...'
            value={keyword}
            onChangeText={setKeyword}
        />
        <Pressable onPress={()=>onSearch(keyword)}>
            <FontAwesome name="search" size={24} color="black" />
        </Pressable>
        <Pressable onPress={()=> setKeyword("")}>
            <FontAwesome5 name="eraser" size={24} color="black" />
        </Pressable>
        <Pressable onPress={goBack}>
            <AntDesign name="back" size={24} color="black" />
        </Pressable>
       { error ?
         <Text>
            {error}
        </Text>
        : null}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        gap: 35,
    },
    containerSm: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    input: {
        width: 250,
        padding: 5,
        marginRight: 5,
        fontSize: 18,
        backgroundColor: colors.gray,
        borderRadius: 10,
    }
})