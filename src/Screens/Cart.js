import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux'; 
import { usePostCartMutation } from '../Services/shopServices';
import { emptyCart } from '../Features/Cart/cartSlice'; 

const Cart = () => {
    const { items: CartData, total, updatedAt, user } = useSelector(state => state.cartReducer.value)
    const [triggerPostCart, result] = usePostCartMutation()
    const dispatch = useDispatch(); 

    const onConfirm = () => {
        // Realiza la acción de confirmar la orden
        triggerPostCart({ items: CartData, total, user, updatedAt })

        // Despacha la acción para vaciar el carrito después de confirmar la orden.
        dispatch(emptyCart());
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={CartData}
                keyExtractor={cartItem => cartItem.id}
                renderItem={({ item }) => {
                    return (
                        <CartItem
                            cartItem={item}
                        />
                    )
                }}
            />
            <View style={styles.totalContainer}>
                <Pressable
                    onPress={onConfirm}
                >
                    <Text>
                        Confirm Order
                    </Text>
                </Pressable>
                <Text>Total: ${total}</Text>
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20,
    }
})
