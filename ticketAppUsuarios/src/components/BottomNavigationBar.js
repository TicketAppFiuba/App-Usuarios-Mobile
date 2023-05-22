import React from 'react';
import { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';

const BottomNavigationBar = ({ activeTab, onTabChange }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleTabChange = (tabIndex, routeName) => {
        onTabChange(tabIndex);
        navigation.navigate(routeName);
    };

    return (
        <View>
            { isLoggedIn ? (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => handleTabChange(1, 'Home')}
                    >
                        <Ionicons
                            name={activeTab === 1 ? 'home' : 'home-outline'}
                            size={26}
                            color={activeTab === 1 ? '#1286f7' : 'gray'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.tab}
                    onPress={() => handleTabChange(2, 'Search')}
                    >
                        <Ionicons
                            name={activeTab === 2 ? 'search' : 'search-outline'}
                            size={26}
                            color={activeTab === 2 ? '#1286f7' : 'gray'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => handleTabChange(3, 'MyEvents')}
                    >
                        <Ionicons
                            name={activeTab === 3 ? 'bookmark' : 'bookmark-outline'}
                            size={26}
                            color={activeTab === 3 ? '#1286f7' : 'gray'}
                        />
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        paddingBottom: 14,
        paddingTop: 14,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomNavigationBar;
