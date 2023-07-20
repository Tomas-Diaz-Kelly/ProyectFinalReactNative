import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

const Header = () => {
  return (
    <View 
        style={styles.containerHeader}>
      <Text style ={styles.text}>BarberShop</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        height: '65%',
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
    },
    text: {
        fontSize: 35,
        fontFamily: 'Josefin'
    }
})