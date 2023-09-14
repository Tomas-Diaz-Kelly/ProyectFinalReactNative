import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Features/User/userSlice";
import { deleteSession } from "../SQLite";
//import { Appearance } from 'react-native-appearance'; // Importa Appearance

const Header = ({ route, navigation }) => {
    let title;
    if (route.name === "Home") title = "Home";
    else if (route.name === "ItemListCategory") title = route.params.category;
    else if (route.name === "Detail") title = route.params.title;
    else title = route.name;

    const dispatch = useDispatch();
    const { email, localId } = useSelector((state) => state.userReducer.value);

    // Obtén el esquema de color actual del sistema
    //const colorScheme = Appearance.getColorScheme(); // 'light' o 'dark'

    // Define estilos de acuerdo al esquema de color
    /*
    const headerStyles = {
        backgroundColor: colorScheme === 'dark' ? colors.darkBackground : colors.white,
        color: colorScheme === 'dark' ? colors.lightText : colors.darkText,
    };
*/
    const onSignout = async () => {
        try {
            console.log("Deleting session...");
            const response = await deleteSession(localId);
            console.log("Session deleted: ");
            console.log(response);
            dispatch(signOut());
        } catch (error) {
            console.log("Error while sign out:");
            console.log(error.message);
        }
    };

    return (
        <View style={[styles.containerHeader]}>
            <Text style={styles.text}>{title}</Text>
            {navigation.canGoBack() ? (
                <Pressable
                    style={styles.pressable}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="back" size={24} color="black" />
                </Pressable>
            ) : null}
            {email ? (
                <Pressable
                    style={styles.signOut}
                    onPress={onSignout}
                >
                    <SimpleLineIcons name="logout" size={24} color="black" />
                </Pressable>
            ) : null}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        position: "relative",
    },
    text: {
        fontSize: 25,
        fontFamily: "josefine",
    },
    pressable: {
        position: "absolute",
        right: 30,
        top: "50%",
    },
    signOut: {
        position: "absolute",
        left: 30,
        top: "50%",
    },
});
