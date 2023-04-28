import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as CONSTANT from  '../constant/globalConstant';


const FormButton = ({
  buttonTitle,
  iconName,
  textColor,
  loader,
  backgroundColor,
  disabled,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}
      {...rest}>
      <Text style={[styles.buttonText, {color: textColor}]}>{buttonTitle}</Text>
      {iconName && (
        <Feather
          style={{marginHorizontal: 7}}
          name={iconName}
          size={22}
          color={textColor}
        />
      )}
      {loader && <ActivityIndicator size="small" color={textColor} />}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
      buttonText: {
        fontSize: 18,
        letterSpacing: 0.5,
        lineHeight: 27,
        fontWeight: '700',
        //fontFamily: 'Urbanist-SemiBold',
      },
      errorText: {
        color: CONSTANT.redColor,
        borderRadius: 6,
        paddingHorizontal: 10,
        // lineHeight: 26,
        letterSpacing: 0.5,
        fontSize: 14,
        textAlign:  'right' ,
        //fontFamily: 'Urbanist-Regular',
        width: '95%',
      },
})
