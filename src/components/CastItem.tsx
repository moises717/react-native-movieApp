import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Cast } from '../interfaces/creditInterface';

interface Props {
    actor: Cast;
}

export function CastItem({ actor }: Props) {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;

    return (
        <View style={styles.container}>
            {
                actor.profile_path && <Image source={{
                    uri: imageUrl,
                }} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                }} />
            }
            <View style={styles.actorInfo}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{actor.name}</Text>
                <Text style={{ fontSize: 16, opacity: 0.7 }}>{actor.character}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 7,
        marginRight: 10,
        marginLeft: 15,
        borderRadius: 10,
        height: 70,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 5,
    },
    actorInfo: {
        marginLeft: 10,
    },
});
