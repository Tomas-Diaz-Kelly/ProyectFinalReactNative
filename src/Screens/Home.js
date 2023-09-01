import { BackHandler, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import CategoryItem from '../Components/CategoryItem'
import { useGetCategoriesQuery } from '../Services/shopServices'

const Home = ({
  navigation
}) => {
  const {data: categories, isLoading, isError} = useGetCategoriesQuery()

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar los datos.</Text>
      </View>
    );
  }
  console.log(isError);

  
  return (
    <View style={styles.container}>
        <FlatList
            data = {categories}
            keyExtractor={category => category}
            renderItem={({item}) => <CategoryItem item={item} navigation = {navigation}/>}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wrapper}
            horizontal={true}
            style={styles.flatlist}
        />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    wrapper: {
      gap: 20,
      flexDirection:'column'
    },
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    flatlist: {
      width: '80%',
      backgroundColor:colors.white
    }
})