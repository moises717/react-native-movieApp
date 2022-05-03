import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { Movie } from '../interfaces/movieInterface';
import { useNavigation } from '@react-navigation/native';


interface Props {
    movie: Movie,
    height?: number,
    width?: number,
}


export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {

    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={0.8} style={{
            width,
            height,
            marginHorizontal: 2,
            paddingBottom: 20,
            paddingHorizontal: 5
        }} onPress={() => navigation.navigate('DetailScreen', { movie })}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{
                    uri: imageUrl,
                }} />
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        borderRadius: 18,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 9,
    },
});
