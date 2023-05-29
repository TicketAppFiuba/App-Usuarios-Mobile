import React, { useEffect } from 'react';
import {Alert, Share, TouchableOpacity, StyleSheet, Text} from 'react-native';
import  dynamicLinks  from '@react-native-firebase/dynamic-links';

import { Ionicons } from '@expo/vector-icons';

const ShareButton = ({event_id, image, title, date, address, description }) => {
  
  const [link, setLink] = React.useState(null);


  useEffect(() => {
    console.log(image)
    fetch("https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAbbkZ7L80kW6Ke93RnFxVXbXYX8sSre7s", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "suffix": {
          "option": "SHORT"
        },
        "dynamicLinkInfo": {
          "domainUriPrefix": "https://ticketAppFiuba.page.link",
          "link": `https://ticketApp/event=${event_id}`,
          "socialMetaTagInfo": {
            "socialTitle": `${title} el ${date} en ${address}`,
            "socialDescription": "¡No te lo pierdas!",
            "socialImageLink": `${image}`
          },
          "androidInfo": {
            "androidPackageName": "com.romanvazquezlareu.ticketAppUsuarios",
            "androidFallbackLink": "https://play.google.com/",
          },
        }
    })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("JSON: ", json)
      setLink(json.shortLink)
    })
    .catch((error) => {
      console.error("ERROR: ", error)
    })

  }, [event_id])
  




  const onShare = async () => {
    console.log("AAA", link)
      Share.share({
        message:
        link,
        url: link,
        
      })
    .then((result) => {
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
  };
  return (
    <TouchableOpacity onPress={onShare}>
      <Ionicons name="share-social-outline" size={32} color="white" />
    </TouchableOpacity>
  );
};


export default ShareButton;