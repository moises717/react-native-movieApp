import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';


import { useMovie } from '../hooks/useMovie';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColor } from '../helpers/getColor';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window');

export function HomeScreen() {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovie();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext);

    const getPosterIndex = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        const [primary = 'green', secondary = 'orange'] = await getImageColor(uri);

        setMainColors({ primary, secondary });

    };

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterIndex(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nowPlaying]);

    if (isLoading) {
        return <View>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>;
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{
                    marginTop: top + 10,
                }}>
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={(index: number) => getPosterIndex(index)}
                        />
                    </View>
                    {/* Popular movies */}
                    <HorizontalSlider movies={nowPlaying} title="En cine" />
                    <HorizontalSlider movies={popular} title="Populares" />
                    <HorizontalSlider movies={topRated} title="Top rated" />
                    <HorizontalSlider movies={upcoming} title="Muy pronto" />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
