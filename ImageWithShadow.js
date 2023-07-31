import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const ImageWithShadow = ({ imageSource, customStyles }) => {
  return (
    <Shadow startColor="#FFFF" distance={20}>
      <Image style={[styles.imageStyles, customStyles]} source={imageSource} />
    </Shadow>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    
  },
});

export default ImageWithShadow;

