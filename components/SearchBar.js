import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#6c757d" style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#adb5bd"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {value ? (
                <Ionicons 
                    name="close-circle" 
                    size={20} 
                    color="#6c757d" 
                    style={styles.clearIcon}
                    onPress={() => onChangeText('')}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        height: 44,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#212529',
        paddingVertical: 8,
    },
    clearIcon: {
        padding: 4,
    },
});

export default SearchBar;