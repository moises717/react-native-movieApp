import { View, Text } from 'react-native';
import React from 'react';
import { Movie } from '../interfaces/movieInterface';
import { MoviePoster } from './MoviePoster';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    title?: string,
    movies?: Movie[]
}

export function HorizontalSlider({ movies, title }: Props) {
    return (
        <View style={{ height: (title) ? 260 : 220 }}>
            {title && <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>{title}</Text>}
            <FlatList data={movies} renderItem={({ item }: any) => <MoviePoster height={200} width={140} movie={item} />} keyExtractor={(item) => item.id.toString()} horizontal={true} showsHorizontalScrollIndicator={false} />
        </View>
    );
}
