import React, { Fragment, useState } from 'react'
import {
    Text,
    Button,
    TextInput,
    View,
    StyleSheet,
    Dimensions,
    Platform
} from "react-native"

import AsyncStorage from "@react-native-community/async-storage";
import authenticate from './../../api/login'

export default function Login({ navigation }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errLogin, setErrLogin] = useState("");

    const login = async () => {
        try {
            const authToken = await authenticate(user, password, console.log)
            await AsyncStorage.setItem("app_token", authToken)
            navigation.replace("Feed", { userName: user })
        } catch (err) {
            setErrLogin(err.message)
        }
    }

    return (
        <Fragment>
            <View style={styleSheet.container}>
                <TextInput
                    style={styleSheet.inputs}
                    placeholder="Usuario"
                    onChangeText={text => setUser(text)}
                />
                <TextInput
                    style={styleSheet.inputs}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <Text>{errLogin}</Text>
            </View>

            <View style={styleSheet.buttonView}>
                <Button title="Entrar" onPress={login} />
            </View>
        </Fragment>
    )
}

Login.navigationOptions = () => {
    let opt = {
        title: "Login"
    }

    if (Platform.OS == "android") opt.header = null

    return opt
}

const styleSheet = StyleSheet.create({
    container: {
        flexGrow: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    inputs: {
        width: widthScreen * 0.8,
        textAlign: "center",
        marginTop: 40,
        fontSize: 30
    },
    buttonView: {
        alignItems: "center",
        marginBottom: 50
    }
})

const widthScreen = Dimensions.get("screen").width
