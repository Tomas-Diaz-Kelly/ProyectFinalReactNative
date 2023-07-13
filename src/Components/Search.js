import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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
  
    const handleSearch = () => {
      if (keyword !== "") {
        onSearch(keyword);
      } else {
        // Acción adicional cuando el keyword está vacío (lista vuelve a estado normal)
        // Aquí puedes agregar la lógica que necesites para reiniciar o restablecer la lista
        console.log("Lista en estado normal");
      }
    };
    
    return (
        <View style ={styles.container}>
        <TextInput style ={styles.input} 
          placeholder='Search...'
          value={keyword}
          onChangeText={setKeyword}
        />
        <Pressable onPress={handleSearch}>
          <FontAwesome name="search" size={24} color="green" />
        </Pressable>
        <Pressable onPress={() => setKeyword("")}>
          <FontAwesome5 name="eraser" size={24} color="red" />
        </Pressable>
        <Pressable onPress={goBack}>
          <AntDesign name="back" size={24} color="black" />
        </Pressable>
        {error && <Text>{error}</Text>}
      </View>
    )
  }
  
  export default Search;
  
  const styles = StyleSheet.create({
      container: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
          gap: 18,
      },
      input: {
          width: 250,
          padding: 8,
          fontSize: 18,
          backgroundColor: colors.blue,
          borderRadius: 10,
      }
  })

