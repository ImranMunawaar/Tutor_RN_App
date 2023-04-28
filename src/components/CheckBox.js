import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as CONSTANT from '../constant/globalConstant';

const Checkbox = ({ label, checked, onChange }) => {
    return (
      <TouchableOpacity onPress={onChange}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginBottom:15}}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: checked ? CONSTANT.secondaryColor : CONSTANT.shadeGrayColor,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {checked && (
              <View
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 7,
                  backgroundColor: CONSTANT.secondaryColor,
                }}
              />
            )}
          </View>
          <Text style={{color : CONSTANT.fontColor, fontSize: 16,   fontFamily: 'Urbanist-SemiBold',}}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  export default Checkbox;