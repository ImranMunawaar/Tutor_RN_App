import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as CONSTANT from '../../constant/globalConstant';
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={[CONSTANT.primaryColor,CONSTANT.secondary2Color]}
      start={{ x: 0, y: 0 }}
      end={{ x: -1, y: 1}}
      style={styles.preloaderMainView}>
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        style={styles.animatedContainer}>
        <View style={styles.animatedContainerInner}>
          <View style={styles.animatedContainerIneer2}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('../../../assets/images/logo1.png')}
            />
          </View>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  preloaderMainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.primaryColor,
  },
  animatedContainer: {
    height: 220,
    width: 220,
    borderRadius: 220 / 2,
    backgroundColor: '#FFFFFF40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainerInner: {
    height: 190,
    width: 190,
    borderRadius: 190 / 2,
    backgroundColor: '#FFFFFF60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainerIneer2: {
    color: CONSTANT.secondary2Color,
    height: 160,
    width: 160,
    borderRadius: 160 / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    //marginRight: 10,
  },
});
