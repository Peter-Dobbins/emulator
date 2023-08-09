import React from 'react';
import { Image, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ImageWithShadow = ({ imageSource, customStyles }) => {
  return (
    <View style={{ width: '100%' }}>
      <Shadow startColor="#FFFF" distance={20}>
        <Image style={[customStyles]} source={imageSource} />
      </Shadow>
    </View>
  );
};

export default ImageWithShadow;

