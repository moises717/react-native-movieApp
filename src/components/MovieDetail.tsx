import { Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import formatter from 'currency-formatter';

import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditInterface';
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

export const MovieDetail = ({ movieFull, cast }: Props) => {

    return (
        <>
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="star-outline" color="gray" size={16} />
                    <Text style={{ marginLeft: 5 }}>{movieFull.vote_average}</Text>
                    <Text style={{ marginLeft: 5 }}>
                        - {movieFull.genres.map(genre => genre.name).join(', ')}
                    </Text>
                </View>
                <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 16 }}>
                    {movieFull.overview}
                </Text>

                <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>Presupuesto</Text>
                <Text style={{ marginBottom: 10, fontSize: 16 }}>
                    {/* format money */}
                    {formatter.format(movieFull.budget, { code: 'USD' })}
                </Text>


            </View>
            <View style={{
                marginTop: 10,
                marginBottom: 100,

            }}>
                <Text style={{ fontSize: 25, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>Actores</Text>

                <FlatList style={{ marginTop: 10, height: 80 }} data={cast} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <CastItem actor={item} />} horizontal={true} showsHorizontalScrollIndicator={false} />
            </View>
        </>
    );
};

