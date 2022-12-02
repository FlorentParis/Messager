import {encode as btoa} from 'base-64';

export default function useGetJWT() {
    return function (username: string, password: string) {
        const credentials = btoa(`${username}:${password}`);

        return fetch('http://localhost:8245/login', {
            method: 'GET',
            credentials: "include",
            mode: "cors",
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
        .then(data => data.json())
    }
}