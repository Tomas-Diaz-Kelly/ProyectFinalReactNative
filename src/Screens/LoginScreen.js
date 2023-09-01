import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../Components/InputForm";
import SubmitButton from "../Components/SubmitButton";
import { colors } from "../Global/Colors";
import { useSignInMutation } from "../Services/authServices";
import { isValidEmail, isAtLeastSixCharacters } from "../Validations/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../Features/User/userSlice";
import { insertSession } from "../SQLite";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const dispatch = useDispatch();
  const [triggerSignIn, resultSignIn] = useSignInMutation();

  const validateEmail = (email) => {
    return isValidEmail(email);
  };

  const validatePassword = (password) => {
    return isAtLeastSixCharacters(password);
  };

  const onSubmit = () => {
    const isValidEmailValue = validateEmail(email);
    const isValidPasswordValue = validatePassword(password);

    if (isValidEmailValue && isValidPasswordValue) {
      triggerSignIn({
        email,
        password,
        returnSecureToken: true,
      });
    }

    setErrorEmail(isValidEmailValue ? '' : 'Email is not correct');
    setErrorPassword(isValidPasswordValue ? '' : 'Password must be at least 6 characters');
  };

  useEffect(() => {
    (async () => {
      try {
        if (resultSignIn.isSuccess) {
          // Insert session in SQLite database
          const response = await insertSession({
            idToken: resultSignIn.data.idToken,
            localId: resultSignIn.data.localId,
            email: resultSignIn.data.email,
          });

          dispatch(setUser({
            email: resultSignIn.data.email,
            idToken: resultSignIn.data.idToken,
            localId: resultSignIn.data.localId,
            profileImage: "",
            location: {
              latitude: "",
              longitude: "",
            },
          }));
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [resultSignIn]);

  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
        <InputForm
            label={"email"}
            onChange={(email) => setEmail(email)}
            error={errorEmail}
        />
        <InputForm
            label={"password"}
            onChange={(password) => setPassword(password)}
            error={errorPassword}
            isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>Not have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.subLink}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: "Josefin",
    },
    sub: {
        fontSize: 14,
        color: "black",
    },
    subLink: {
        fontSize: 14,
        color: "blue",
    },
});
