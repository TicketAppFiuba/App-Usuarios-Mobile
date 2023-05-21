import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = ({ activeTab, onTabChange }) => {
    const navigation = useNavigation();

    const handleTabChange = (tabIndex, routeName) => {
        onTabChange(tabIndex);
        navigation.navigate(routeName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabChange(1, 'Home')}
            >
                <Ionicons
                    name={activeTab === 1 ? 'home' : 'home-outline'}
                    size={24}
                    color={activeTab === 1 ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabChange(2, 'Search')}
            >
                <Ionicons
                    name={activeTab === 2 ? 'search' : 'search-outline'}
                    size={24}
                    color={activeTab === 2 ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabChange(3, 'MyEvents')}
            >
                <Ionicons
                    name={activeTab === 3 ? 'person' : 'person-outline'}
                    size={24}
                    color={activeTab === 3 ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        paddingBottom: 8,
        paddingTop: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomNavigationBar;
