import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import RNEventSource from 'react-native-event-source';
import {
  ChevronRightIcon,
  FaceSmileIcon,
  HandThumbUpIcon,
} from 'react-native-heroicons/solid';
import {useAppSelector} from '../hook/ReduxHooks';
import useBackendMessage from '../hook/useBackendMessage';
import useGetChannelByUsersId from '../hook/userGetChannelByUsersId';

export default function Message() {
  const channel = useAppSelector(state => state.channel);
  const loggedUser = useAppSelector(state => state.userLogged);

  const [allMessages, setAllMessages] = useState();
  const [messageContent, setMessageContent] = useState();

  const getChannelByUsersId = useGetChannelByUsersId();

  useEffect(() => {
    getChannelByUsersId(loggedUser.user_id, channel.user_id).then(res => {
      setAllMessages(res.channel.messages);
    });
  }, [channel]);

  const backendMessage = useBackendMessage();

  const handleSubmit = e => {
    e.preventDefault();
    console.log('click');
    backendMessage(channel.user_id, {
      author_id: loggedUser.user_id,
      message: messageContent,
    }).then(data => console.log(data));
    allMessages?.length > 0
      ? setAllMessages(oldMessages => [
          ...oldMessages,
          {
            author: {id: loggedUser.user_id},
            content: messageContent,
            createdAt: Date.now(),
          },
        ])
      : setAllMessages([
          {
            author: {id: loggedUser.user_id},
            content: messageContent,
            createdAt: Date.now(),
          },
        ]);
    setMessageContent('');
  };

  const handleMessage = e => {
    let data = JSON.parse(e.data);
    allMessages
      ? setAllMessages(oldMessages => [
          ...oldMessages,
          {
            author: {id: channel.user_id},
            content: data.message,
            createdAt: Date.now(),
          },
        ])
      : setAllMessages([
          {
            author: {id: channel.user_id},
            content: data.message,
            createdAt: Date.now(),
          },
        ]);
  };

  useEffect(() => {
    const url = new URL('http://localhost:9090/.well-known/mercure');
    url.searchParams.append('topic', 'https://example.com/my-private-topic');

    const eventSource = new RNEventSource(String(url), {withCredentials: true});

    eventSource.addEventListener('message', event => {
      handleMessage(event);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    console.log(allMessages);
  }, [allMessages]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.scrolableBox}>
          {allMessages?.map((message, key) => {
            return message.author.id == loggedUser.user_id ? (
              <View id={key} style={styles.boxMessage1}>
                <Text style={{color: '#fff'}}>{message.content}</Text>
              </View>
            ) : (
              <View id={key} style={styles.boxMessage2}>
                <Text style={{color: '#fff'}}>{message.content}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.bottomContent}>
        <ChevronRightIcon color="#0695FF" />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Aa"
            placeholderTextColor="#777"
            style={styles.input}
            value={messageContent}
            onChangeText={e => setMessageContent(e)}
            onSubmitEditing={e => handleSubmit(e)}
          />
          <FaceSmileIcon color="#0695FF" />
        </View>
        <HandThumbUpIcon color="#0695FF" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    minHeight: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  scrolableBox: {
    display: 'flex',
    paddingBottom: 80,
  },
  boxMessage1: {
    display: 'flex',
    backgroundColor: '#00B2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 2,
    borderRadius: 30,
    maxWidth: '80%',
    marginLeft: 'auto',
  },
  boxMessage2: {
    backgroundColor: '#262626',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 2,
    borderRadius: 30,
    maxWidth: '80%',
    marginRight: 'auto',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 30,
    paddingTop: 10,
    backgroundColor: '#000',
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    borderRadius: 50,
    padding: 5,
  },
  input: {
    width: '82%',
    color: '#fff',
    paddingHorizontal: 5,
  },
});
