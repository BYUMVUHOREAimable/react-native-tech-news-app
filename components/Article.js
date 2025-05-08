import * as WebBrowser from 'expo-web-browser';
import moment from "moment";
import React from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

// Default image for articles without images
const DEFAULT_IMAGE = 'https://via.placeholder.com/400x200?text=No+Image+Available';

const Article = (props) => {
    const goToSource = () => {
        WebBrowser.openBrowserAsync(props.url);
    }

    // Format the date using moment.js
    const formattedDate = moment(props.publishedAt).format("MMM Do YY");

    return (
        <Pressable style={styles.container} onPress={goToSource}>
            <Image 
                source={{uri: props.urlToImage || DEFAULT_IMAGE}}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                <Text style={styles.description} numberOfLines={3}>
                    {props.description || 'No description available'}
                </Text>
                <View style={styles.footer}>
                    <View style={styles.authorContainer}>
                        <Text style={styles.authorLabel}>by </Text>
                        <Text style={styles.author}>{props.author || 'Unknown'}</Text>
                    </View>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <View style={styles.sourceContainer}>
                    <Text style={styles.sourceLabel}>Source: </Text>
                    <Text style={styles.source}>{props.sourceName}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default Article;

const styles = StyleSheet.create({
    container: {
        width: "92%",
        alignSelf: "center",
        borderRadius: 12,
        backgroundColor: "#fff",
        marginTop: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    image: {
        height: 200,
        width: "100%",
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
        lineHeight: 24,
    },
    description: {
        fontSize: 14,
        color: "#4a4a4a",
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    authorContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    authorLabel: {
        fontSize: 13,
        color: "#6c757d",
    },
    author: {
        fontSize: 13,
        fontWeight: "600",
        color: "#495057",
    },
    date: {
        fontSize: 13,
        color: "#6c757d",
    },
    sourceContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    sourceLabel: {
        fontSize: 13,
        color: "#6c757d",
    },
    source: {
        fontSize: 13,
        fontWeight: "600",
        color: "#0d6efd",
    }
})