import React from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';
import useMovieDetail from '../hooks/useMovieDetail';
import { MovieDetail } from '../components/MovieDetail';


interface Props extends StackScreenProps<RootStackParamList, 'DetailScreen'> { }

const windowHeight = Dimensions.get('window').height;

export function DetailScreen({ route, navigation }: Props) {
    const movie = route.params.movie;

    const { isLoading, movieFull, cast } = useMovieDetail(movie.id);

    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;


    return (
        <ScrollView>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" color="white" size={50} />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <View style={styles.borderImage}>
                    <Image source={{ uri: imageUrl }} style={styles.posterImage} />
                </View>
            </View>
            <View style={styles.marginContent}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            {
                isLoading ?
                    <ActivityIndicator size={30} color="gray" style={{ marginTop: 20 }} /> : <MovieDetail movieFull={movieFull!} cast={cast} />
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    posterImage: {
        flex: 1,
    },
    marginContent: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    borderImage: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    imageContainer: {
        width: '100%',
        height: windowHeight * 0.7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    backButton: {
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        top: 30,
        left: 10,
    },
});
