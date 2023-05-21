import React, {useState} from 'react';
import {View, Text} from 'react-native';

import BottomNavigationBar from '../components/BottomNavigationBar';

export default function Search({navigation}) {

    const [activeTab, setActiveTab] = useState(2);

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <View style={{flex: 1}}>
            <View style={{ flex: 1 }}>
                <Text>Search</Text>
                {/* Contenido de tu aplicación */}
            </View>
        </View>
    );
}

