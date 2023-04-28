import {StyleSheet, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as CONSTANT from '../../constant/globalConstant';


const SkeletonTutorCard = () => {
  return (
    <View style={styles.freelancerCardParentStyle}>
      <View style={{flexDirection: 'row'}}>
        <SkeletonPlaceholder>
          <View
            style={[
              styles.homefreelancerImageBackgroundStyle,
              {borderRadius: 50},
            ]}
          />
        </SkeletonPlaceholder>
        <View>
          <SkeletonPlaceholder>
            <View style={styles.freelancerCardTitleParentStyle}>
              <View
                style={{
                  height: 10,
                  width: 100,
                  alignItems: 'center',
                  marginTop: 10,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={styles.cardRatingParent}>
              <View style={{height: 10, width: 70, marginVertical: 10}} />
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <SkeletonPlaceholder>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 40,
              alignItems: 'center',
              marginTop: 20,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonTutorCard;

const styles = StyleSheet.create({
    cardRatingParent: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
      },
      homefreelancerImageBackgroundStyle: {
        width: 50,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
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
      freelancerCardTitleStyle: {
        //fontFamily: 'Urbanist-SemiBold',
        fontSize: 16,
        lineHeight: 26,
        letterSpacing: 0.5,
        color: CONSTANT.fontColor,
        fontWeight: "700",
      },

})
