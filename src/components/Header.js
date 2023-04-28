import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as CONSTANT from '../constant/globalConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAllTutors } from '../Redux/TutorsSlice';
const Header = ({
  title,
  titleColor,
  img,
  backColor,
  iconColor,
  backIcon,
  hideProfileImage,
  fun,
  noIcon,
  navigation,
  user
}) => {
  const navigationforword = useNavigation();
 

  const dispatch = useDispatch();
  const signOutUser = async () => {
    await AsyncStorage.removeItem('user');
    //dispatch(setAllTutors(null))
    navigationforword.reset({
      index: 0,
      routes: [{name: 'signup'}],
    });
  };

  return (
    <View style={[styles.headerMainView, {backgroundColor: backColor}]}>
      {noIcon ? (
        <View />
      ) : (
        <>
          {!backIcon ? (
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => navigationforword.openDrawer()}
              style={styles.headerDrawerIcon}>
              <Feather name={'menu'} color={iconColor} size={27} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => {
                if (fun) {
                  fun();
                } else {
                  navigationforword.goBack();
                }
              }}
              style={styles.headerDrawerIcon}>
              <Feather
                name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
                type={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
                color={iconColor}
                size={25}
              />
            </TouchableOpacity>
          )}
        </>
      )}
      <Text
        style={{
          color: titleColor,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>

      <>
        {!hideProfileImage ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('', 'Are you sure you want to sign out?', [
                {
                  text: 'Yes',
                  onPress: async () => {
                    signOutUser();
                  },
                },
                {
                  text: 'No',
                },
              ]);
            }}
            style={styles.headerPhoto}>
            <Text style={styles.thumbnailText}>{user?.email ? (user?.email[0]).toUpperCase() : "A"}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPhoto}></View>
        )}
      </>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerMainView: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerDrawerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: CONSTANT.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailText: {
    fontSize: 20,
    letterSpacing: 0.5,
    lineHeight: 24,
    color: CONSTANT.whiteColor,
    fontWeight: '700',
  },
});
