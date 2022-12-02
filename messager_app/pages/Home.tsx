import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {
  CameraIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  VideoCameraIcon,
} from 'react-native-heroicons/solid';
import {setUserChoice} from '../features/ChannelSlice';
import {useAppDispatch, useAppSelector} from '../hook/ReduxHooks';
import useGetUserList from '../hook/useGetUserList';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(state => state.userLogged);
  const getUserList = useGetUserList();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserList().then(data => setUserList(data.users));
  }, []);

  const chooseUser = (id: number) => {
    dispatch(setUserChoice(id));
    navigation.navigate('Message');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrolableBox}>
        <View style={styles.input}>
          <MagnifyingGlassIcon size={20} style={styles.icon} />
          <Text style={styles.text}>Rechercher</Text>
        </View>
        <View style={styles.containerOnline}>
          <View style={styles.cardUser}>
            <View style={styles.picUser}>
              <VideoCameraIcon style={{color: '#fff'}} />
            </View>
            <Text style={styles.nameUser}>Créer un salon</Text>
          </View>
        </View>
        <View>
          {userList.map((user, key) => {
            return loggedUser.user_id != user.id ? (
              <TouchableOpacity
                style={styles.containerConv}
                id={key}
                onPress={() => chooseUser(user.id)}>
                <View style={styles.picUser}>
                  <VideoCameraIcon style={{color: '#fff'}} />
                </View>
                <View style={styles.infosConv}>
                  <Text style={styles.nameConv}>{user.username}</Text>
                  <Text style={styles.lastMessageConv}>
                    Je te cherche tu es ou ? • dim
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              ''
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={styles.buttonNav}>
          <ChatBubbleOvalLeftIcon size={30} style={{color: '#0695FF'}} />
          <Text style={styles.textNavSelect}>Discussions</Text>
        </View>
        <View style={styles.buttonNav}>
          <VideoCameraIcon size={30} style={{color: '#777'}} />
          <Text style={styles.textNav}>Appels</Text>
        </View>
        <View style={styles.buttonNav}>
          <UsersIcon size={30} style={{color: '#777'}} />
          <Text style={styles.textNav}>Personnes</Text>
        </View>
        <View style={styles.buttonNav}>
          <CameraIcon size={30} style={{color: '#777'}} />
          <Text style={styles.textNav}>Stories</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    minHeight: '100%',
    paddingHorizontal: 20,
  },
  scrolableBox: {
    marginBottom: 85,
  },
  input: {
    backgroundColor: '#1C1C1C',
    height: 35,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 3,
  },
  text: {
    color: '#777',
    fontSize: 18,
  },
  icon: {
    marginRight: 3,
    color: '#777',
  },
  containerOnline: {
    paddingVertical: 15,
  },
  cardUser: {
    display: 'flex',
    width: 60,
  },
  picUser: {
    backgroundColor: '#282828',
    height: 60,
    width: 60,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 12,
  },
  containerConv: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  infosConv: {
    paddingVertical: 11,
    paddingHorizontal: 12,
    display: 'flex',
    justifyContent: 'space-between',
  },
  nameConv: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  lastMessageConv: {
    color: '#777',
  },
  bottomNav: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 85,
    justifyContent: 'space-around',
    width: '110%',
    paddingTop: 5,
    backgroundColor: '#000',
  },
  buttonNav: {
    display: 'flex',
    alignItems: 'center',
  },
  textNavSelect: {
    color: '#0695FF',
    fontSize: 10,
    paddingTop: 3,
  },
  textNav: {
    color: '#777',
    fontSize: 10,
    paddingTop: 3,
  },
});
