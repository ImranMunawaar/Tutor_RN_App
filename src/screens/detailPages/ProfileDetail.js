import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import FormButton from '../../components/FormButton';
import * as CONSTANT from '../../constant/globalConstant';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetail = ({route, navigation}) => {
  const data = route?.params?.item;
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);
  const getUser = async () => {
    console.log('i am calling');
    const userObj = await AsyncStorage.getItem('user');
    if (userObj) {
      const parsedUserObj = JSON.parse(userObj);
      setUser(parsedUserObj);
      console.log('user', parsedUserObj);
    } else {
      setUser({});
      console.log('user', {});
    }
  };

  const handlePress = url => {
    const mailto = `mailto:${url}`;
    Linking.canOpenURL(mailto)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          Linking.openURL(mailto);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <LinearGradient
        colors={[CONSTANT.primaryColor, CONSTANT.secondary2Color]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <Header
          title={'Profile'}
          titleColor={'#fff'}
          //backColor={'#F7F7F7'}
          iconColor={'#fff'}
          backIcon={true}
          user={user}
        />
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileMainViewStyle}>
          <View>
            <TouchableOpacity
              style={{
                marginTop: -40,
              }}>
              <ImageBackground
                imageStyle={{borderRadius: 80 / 2, backgroundColor: '#D3D3D3'}}
                style={styles.profileImageBackgrounfStyle}
                source={
                  data?.profile_image
                    ? {
                        uri: `${data.profile_image}`,
                      }
                    : require('../../../assets/images/PlaceholderImage.png')
                }>
                <View style={styles.profileOnlineStatusStyle} />
              </ImageBackground>
            </TouchableOpacity>

            <Text style={styles.profileNameStyle}>{data?.name}</Text>
            <Text style={styles.profileTitleStyle}>{data?.gender}</Text>
            <Text style={styles.profileEarningStyle}>{data?.age}</Text>
            {data?.country && (
              <View style={{marginBottom: 20}}>
                {/* <Text style={styles.profileTopHeadingStyle}>
                  {constant.profileDetailLocation}
                </Text> */}
                <Text style={styles.profileHeadingValueStyle}>
                  {data?.country}
                </Text>
              </View>
            )}

            <View style={styles.drawerSeparatorStyle} />
            <View style={styles.drawerSeparatorStyle} />

            <Text style={styles.profileSectionHeadingStyle}>
              {'Description'}
            </Text>
            <View style={styles.profileBioParentStyle}>
              <Text style={styles.profileBioTextStyle}>{data?.bio}</Text>
            </View>
            <View style={{marginVertical: 10, marginHorizontal: 25}}>
              <FormButton
                buttonTitle={'Contact Now'}
                backgroundColor={CONSTANT.primaryColor}
                textColor={'#fff'}
                iconName={'chevron-right'}
                onPress={() => handlePress(data.email)}
              />
            </View>
            <View style={styles.drawerSeparatorStyle} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  drawerSeparatorStyle: {
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    width: '100%',
  },
  globalContainer: {
    flex: 1,
    backgroundColor: CONSTANT.whiteColor,
  },
  profileParentStyle: {
    flex: 1,
    backgroundColor: CONSTANT.grayColor,
  },
  profileMainViewStyle: {
    backgroundColor: CONSTANT.whiteColor,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    marginTop: 50,
    paddingBottom: 10,
  },
  profileImageBackgrounfStyle: {
    width: 80,
    height: 80,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  profileOnlineStatusStyle: {
    backgroundColor: '#22C55E',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderColor: CONSTANT.whiteColor,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  profileNameStyle: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: 0.5,
    color: CONSTANT.primaryColor,
    textAlign: 'center',
    marginVertical: 5,
  },
  profileTitleStyle: {
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.5,
    color: CONSTANT.fontColor,
    textAlign: 'center',
    fontWeight: "700"
  },
  profileEarningStyle: {
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 26,
    letterSpacing: 0.5,
    color: CONSTANT.fontColor,
    textAlign: 'center',
  },
  profileViewsParentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileTopHeadingStyle: {
    // fontFamily: 'Urbanist-Regular',
    fontSize: 13,
    lineHeight: 23,
    letterSpacing: 0.5,
    color: CONSTANT.fontColor,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  profileHeadingValueStyle: {
    //fontFamily: 'Urbanist-SemiBold',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0.5,
    color: CONSTANT.fontColor,
    textAlign: 'center',
    fontWeight: "700"
  },
  profileSectionHeadingStyle: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.5,
    color: CONSTANT.fontColor,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  profileBioParentStyle: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  profileBioTextStyle: {
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: 0.5,
    color: CONSTANT.fontColor,
  },
});
