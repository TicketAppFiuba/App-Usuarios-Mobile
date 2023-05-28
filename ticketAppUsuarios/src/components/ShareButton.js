import React from 'react';
import {Alert, Share, TouchableOpacity, StyleSheet, Text} from 'react-native';
import  {dynamicLinks}  from '@react-native-firebase/dynamic-links';

import { Ionicons } from '@expo/vector-icons';

const ShareButton = (event_id) => {

  const generateLink = async () => {
    
        const link = await dynamicLinks().buildShortLink({
            link: `https://romanvazquezlareu.page.link/jdF1?eventId=${event_id}`,
            domainUriPrefix: 'https://romanvazquezlareu.page.link/jdF1',
            android: {
                packageName: 'com.romanvazquezlareu.ticketappusuarios',
            },
          
        }, dynamicLinks.ShortLinkType.DEFAULT)
        console.log('link:', link)
     
}



  const onShare = async () => {
    const getLink = await generateLink();

    try {
      const result = await Share.share({
        message:
          getLink,
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