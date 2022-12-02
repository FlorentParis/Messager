import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import {MagnifyingGlassIcon, PencilSquareIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import useGetChannelByUsersId from "../Hook/userGetChannelByUsersId";

export default function UserList(props) {
    const [userList, setUserList] = useState([]);

    const getUserList = useGetUserList();
    const getChannelByUsers = useGetChannelByUsersId();

    const userChoice = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        props.setUserId(userId);
        getChannelByUsers(props.loggedUserId, userId).then(res => props.setChannel(res));
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
    }, [])

    return (
        <div className="h-100 overflow-scroll" style={{width: '250px', borderRight: '0.5px solid gray'}}>
            <div style={{padding: '20px 10px'}} className="d-flex text-white justify-content-between">
                <span style={{fontWeight: "700"}}>Discussions</span>
                <PencilSquareIcon style={{height: '20px', width: "25px", cursor: 'pointer'}} />
            </div>
            <div className="d-flex align-items-center" style={{padding: '0 10px 20px 10px', position: 'relative'}} >
                <input placeholder="Rechercher (Ctrl + K)" className="w-100 border-0 rounded-1 text-white" style={{backgroundColor: '#262626', height: '30px', padding: '0 30px 0 10px', fontSize: '12px'}} />
                <MagnifyingGlassIcon style={{height: '15px', position: 'absolute', right: '20px', color: '#6c757d'}} />
            </div>
            {userList.map((user) => (
                user.id != props.loggedUserId ? 
                <form className='w-100 mx-auto' onSubmit={userChoice}>
                    <button style={{height: '60px'}} className='d-flex border-0 w-100 bg-transparent text-white' type='submit' value={user.id}>
                        <UserCircleIcon className="h-100" />  
                        <div className="d-flex flex-column" style={{padding: '5px 0 5px 3px'}}>
                            <span style={{fontWeight: '600', textAlign: 'left'}}>{user.username}</span>
                            <div className="d-flex" style={{fontSize: '10px', color: '#6c757d'}}>
                                <p>Blabla...</p>
                                <span> • 23/11/2022</span>
                            </div>
                        </div>
                    </button>
                </form>
                : ''
            ))}
        </div>
    )
}