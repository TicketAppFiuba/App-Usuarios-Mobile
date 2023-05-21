import React, {useState} from 'react';
import {View, Text} from 'react-native';

import BottomNavigationBar from '../components/BottomNavigationBar';

export default function MyEvents({navigation}) {
    const [activeTab, setActiveTab] = useState(3);

    const handleTabChange = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    return (
        <View style={{flex: 1}}>
            <View style={{ flex: 1 }}>
                <Text>MyEvents</Text>
                {/* Contenido de tu aplicación */}
            </View>
        </View>
    );
}

