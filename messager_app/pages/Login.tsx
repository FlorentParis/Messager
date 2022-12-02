import { Link } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import {useAppDispatch} from '../hook/ReduxHooks';
import setLoggedUser, {loginUser} from '../features/UserLoggedSlice';

export default function Login() {

    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(loginUser({username, password})).then(data => {
            if (data.payload.JWT) {
                dispatch(setLoggedUser(data.payload));
            } else {
                console.log(data);
            }
        })
    }

    return (
        <View>
            <Text>Username</Text>
            <TextInput onChangeText={setUsername} value={username}/>
            <Text>Password</Text>
            <TextInput onChangeText={setPassword} value={password} autoCapitalize='none' />
            <Button title="Send" onPress={handleSubmit}/>
            <View>
                <Text>You don't have an account yet ?</Text>
                <Link to='/Register'><Text>Register</Text></Link>
            </View>
        </View>
    )
}