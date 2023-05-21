import React from 'react';
import {Alert, Share, TouchableOpacity, StyleSheet, Text} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const ShareButton = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <TouchableOpacity onPress={onShare}>
      <Ionicons name="share-social-outline" size={32} color="white" />
    </TouchableOpacity>
  );
};


export default ShareButton;