import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BottomNavigationBar from '../components/BottomNavigationBar';

export default function Home({navigation}) {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text>Bienvenido</Text>
                {/* Contenido de tu aplicación */}
            </View>
        </View>
    );
}
