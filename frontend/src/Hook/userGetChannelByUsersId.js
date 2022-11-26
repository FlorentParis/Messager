export default function useGetChannelByUsersId() {
    return function (userId1, userId2) {
        return fetch(`http://localhost:8245/channelByUsersId/${userId1}&${userId2}`, {
            method: 'GET',
            // credentials: 'include',
            mode: "cors"
        })
        .then(data => data.text())
    }
}