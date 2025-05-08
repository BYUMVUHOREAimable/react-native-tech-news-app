import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Article from "../components/Article";
import SearchBar from "../components/SearchBar";

// API configuration
const API_KEY = 'c1ef3317ba2e48c8aeab23ad33adb6e9';
const API_URL = 'https://newsapi.org/v2/top-headlines';

const HomeScreen = () => {
    // State management
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    // Fetch news articles from the API
    const getNews = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(API_URL, {
                params: {
                    country: 'us',
                    category: 'technology',
                    apiKey: API_KEY
                }
            });
            setArticles(response.data.articles);
            setFilteredArticles(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to load news. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await getNews();
        setRefreshing(false);
    };

    // Handle search functionality
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredArticles(articles);
            return;
        }
        const filtered = articles.filter(article => {
            const searchContent = `${article.title} ${article.description} ${article.source.name}`.toLowerCase();
            return searchContent.includes(query.toLowerCase());
        });
        setFilteredArticles(filtered);
    };

    // Initial data fetch
    useEffect(() => {
        getNews();
    }, []);

    // Render empty state or error message
    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                {error ? error : loading ? 'Loading articles...' : 'No articles found'}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tech News</Text>
                <Text style={styles.headerSubtitle}>Stay updated with the latest in technology</Text>
            </View>
            <SearchBar
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search articles..."
            />
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0d6efd" />
                </View>
            ) : (
                <FlatList
                    data={filteredArticles}
                    renderItem={({item}) =>
                        <Article
                            urlToImage={item.urlToImage}
                            title={item.title}
                            description={item.description}
                            author={item.author}
                            publishedAt={item.publishedAt}
                            sourceName={item.source.name}
                            url={item.url}
                        />}
                    keyExtractor={(item) => item.title}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    ListEmptyComponent={renderEmptyList}
                />
            )}
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6c757d',
    },
    listContainer: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
    }
})