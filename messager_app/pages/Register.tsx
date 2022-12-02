import { Link } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import useGetJWT from "../hook/useGetJWT";

export default function Register() {

    const getJWT = useGetJWT()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(username, password)
        /* getJWT(username, password)
        .then(data => {
            if (data.JWT) {
                console.log(data.JWT);
            } else {
                console.log(data)
            }
        }) */
    }

    return (
        <View>
            <Text>Username</Text>
            <TextInput onChangeText={setUsername} value={username}/>
            <Text>Password</Text>
            <TextInput onChangeText={setPassword} value={password}/>
            <Button title="Send" onPress={handleSubmit}/>
            <View>
                <Text>You already have an account ?</Text>
                <Link to='/Login'><Text>Login</Text></Link>
            </View>
        </View>
    )
}