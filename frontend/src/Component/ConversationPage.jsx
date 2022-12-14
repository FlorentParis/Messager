import { FaceSmileIcon, GifIcon, HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react"
import useBackendMessage from "../Hook/useBackendMessage";

export default function ConversationPage(props) {

    const [allMessages, setAllMessages] = useState(props.channel?.channel?.messages);
    const [messageContent, setMessageContent] = useState();

    const backendMessage = useBackendMessage();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('click')
        backendMessage(props.userId, {author_id: props.loggedUserId, message: messageContent}).then(data => console.log(data))
        allMessages?.length > 0 ?
            setAllMessages(oldMessages => [...oldMessages, {author: {id: props.loggedUserId}, content: messageContent, createdAt: Date.now()}])
        : 
            setAllMessages([{author: {id: props.loggedUserId}, content: messageContent, createdAt: Date.now()}])
        setMessageContent('');
    }

    const handleMessage = (e) => {
        let data = JSON.parse(e.data);
        allMessages ?
            setAllMessages(oldMessages => [...oldMessages, {author: {id: props.userId}, content: data.message, createdAt: Date.now()}])
        : 
            setAllMessages([{author: {id: props.userId}, content: data.message, createdAt: Date.now()}])
    }

    useEffect(() => {
        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }
    }, [])

    useEffect(() => {
        setAllMessages(props.channel?.channel?.messages)
    }, [props.channel])

    useEffect(() => {
        console.log(allMessages)
    }, [allMessages])
    
    return (
        <div className="d-flex flex-column justify-content-end" style={{position: 'relative', width: 'calc(100% - 325px)', paddingBottom: '60px'}}>
            <div className="d-flex flex-column" style={{padding: '0 15px'}}>
                {allMessages?.map((message) => (
                    message.author.id == props.loggedUserId ?
                        <div className="d-flex text-white" style={{backgroundColor: '#00B2FF', maxWidth: 'max-content', padding: '5px 10px', marginBottom: '2px', borderRadius: '30px', alignSelf: 'end'}}>{message.content}</div>
                    : 
                        <div className="d-flex text-white" style={{backgroundColor: '#262626', maxWidth: 'max-content', padding: '5px 10px', marginBottom: '2px', borderRadius: '30px'}}>{message.content}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="d-flex w-100 align-items-center bg-black" style={{position: 'absolute', bottom: '0', height: '50px', padding: '10px'}}>
                <PlusIcon className="h-50 rounded-circle" style={{backgroundColor: '#00B2FF', marginRight: '10px', cursor: 'pointer'}} />
                <div className="d-flex w-100 h-100 align-items-center" style={{position: 'relative', borderRadius: '30px', overflow: 'hidden'}}>
                    <input placeholder="Ecrivez un message..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} type="text" className="w-100 border-0 rounded-1 text-white" style={{backgroundColor: '#262626', height: '30px', padding: '0 30px 0 10px', fontSize: '12px'}} />
                    <GifIcon className="h-75" style={{position: 'absolute', color: '#00B2FF', right: '30px', cursor: 'pointer'}} />
                    <FaceSmileIcon className="h-75" style={{position: 'absolute', color: '#00B2FF', right: '5px', cursor: 'pointer'}} />
                </div>
                <HandThumbUpIcon className="h-75" style={{color: '#00B2FF', marginLeft: '10px', cursor: 'pointer'}} />
            </form>
        </div>
    )
}