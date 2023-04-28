import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import * as CONSTANT from '../../constant/globalConstant';

const TutorCard = React.memo(({chat, saved, item,navigation}) => {
  const navigationForward = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>  navigationForward.navigate('profileDetail' ,{item})}
      style={styles.freelancerCardParentStyle}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.freelancerImageBackgroundStyle}>
          <ImageBackground
            imageStyle={{borderRadius: 70 / 2}}
            style={styles.freelancerImageBackgroundStyle}
            source={
              item.profile_image
                ? {
                    uri: `${item.profile_image}`,
                  }
                : 
                require('../../../assets/images/PlaceholderImage.png')
            }></ImageBackground>
        </View>
        <View>
          <View style={styles.freelancerCardTitleParentStyle}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.freelancerCardTitleStyle}>
              {item.name}
            </Text>
          </View>
          <View style={styles.cardRatingParent}>
            {/* <FontAwesome name={'star'} size={18} color={'#FFD101'} />  */}
            <Text style={styles.cardratingTextStyle}>
              {item.gender}
            </Text>
            <Text style={styles.cardratingTextStyle}>
              {item.age}
            </Text>
          </View>
        </View>
      </View>

      
        <View style={{alignItems: 'center'}}>
        <Feather
            name={"arrow-right"}
            //type={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
            color={CONSTANT.primaryColor}
            size={25}
            style={{marginTop: 5}}
          />
          {/* <Text style={styles.freelancerStartingTextStyle}>
            {"Location"}
          </Text>
          <Text style={styles.freelancingCardPriceStyle}>
            {item?.country?.name}
          </Text> */}
        </View>
      
    </TouchableOpacity>
  );
});

export default TutorCard;


const styles = StyleSheet.create({
    freelancerCardParentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: CONSTANT.whiteColor,
        paddingVertical: 15,
      },
      freelancerCardTitleParentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        width: 200,
      },
      cardRatingParent: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
      },
      freelancerCardTitleStyle: {
        //fontFamily: 'Urbanist-SemiBold',
        fontSize: 16,
        lineHeight: 26,
        letterSpacing: 0.5,
        color: CONSTANT.fontColor,
        fontWeight: "bold"
      },
      freelancerStartingTextStyle: {
        fontSize: 13,
        lineHeight: 23,
        letterSpacing: 0.5,
        color: CONSTANT.shadeGrayColor,
      },
      freelancingCardPriceStyle: {
        //fontFamily: 'Urbanist-SemiBold',
        fontSize: 16,
        lineHeight: 26,
        letterSpacing: 0.5,
        color: CONSTANT.fontColor,
        fontWeight : "600"
      },
      freelancerImageBackgroundStyle: {
        width: 50,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#D3D3D3',
        borderRadius: 70 / 2
      },
      cardratingTextStyle: {
        marginRight: 8,
        fontSize: 14,
        letterSpacing: 0.5,
        lineHeight: 24,
        color: CONSTANT.fontColor,
        fontWeight : "400"
      },
})
