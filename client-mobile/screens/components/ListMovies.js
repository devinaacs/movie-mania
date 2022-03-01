import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Dimensions, StatusBar, ScrollView, Button, ImageBackground, } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-anchor-carousel';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../../queries/movie';

const ListMovies = () => {
    const navigation = useNavigation()
    const { loading, error, data } = useQuery(GET_MOVIES)
    console.log(loading, error)


    // GET MOVIE ID
    const [movieId, setMovieId] = useState(0)
    console.log(movieId)


    // LOOPING FOR CAROUSEL
    const [background, setBackground] = useState({})



    useEffect(() => {
        fetch('https://movie-mania-be-pg.herokuapp.com/pub/movies')
            .then((response) => response.json())
            .then((json) => {
                setBackground(json[0])
            })
            .catch((error) => console.error(error))
    }, []);

    const carouselRef = useRef(null);

    const { width, height } = Dimensions.get('window')

    if (loading) {
        return <ActivityIndicator size='large' color='pink' />;
    }

    if (error) {
        return <Text>Oops Something went wrong...</Text>
    }
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        carouselRef.current.scrollToIndex(index);
                        setBackground({
                            title: item.title,
                            imgUrl: item.imgUrl,
                            year: item.year,
                            synopsis: item.synopsis,
                            genre: item.Genre.name,
                            rating: item.rating,
                            cast1: item.Casts[0].name,
                            cast2: item.Casts[1].name,
                            cast3: item.Casts[2].name,

                        });
                        setMovieId(item.id)
                    }}
                >
                    <Image source={{ uri: item.imgUrl }} style={styles.carouselImage} />
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <MaterialIcons name='library-add' size={30} color='white' style={styles.carouselIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: '#000', width: '100%' }} blurRadius={100}>

            <StatusBar backgroundColor='#000' barStyle='light-content' />

            <View style={styles.carouselContentContainer}>
                <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10, marginVertical: 10 }}>Top Picks this Week</Text>

                        <View style={styles.carouselContainerView}>
                            <Carousel style={styles.carousel}
                                data={data.getMovies}
                                renderItem={renderItem}
                                itemWidth={200}
                                containerWidth={width - 20}
                                separatorWidth={0}
                                ref={carouselRef}
                                inActiveOpacity={0.4}
                            />
                        </View>

                        <View style={styles.movieInfoContainer}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.movieTitle}>{background.title}</Text>
                                <Text style={styles.movieStat}>{background.year + ' - ' + background.rating + '/10'}</Text>
                                {/* <Text style={styles.movieStat}>Casts: {background.cast1 + ', ' + background.cast2 + ', ' + background.cast3}</Text> */}
                            </View>
                            <View style={styles.playIconContainer}>
                                <FontAwesome5 name='play' size={22} color='#02ad94' style={{ marginLeft: 4 }} />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 14, marginTop: 14 }}>
                            <Text style={{ color: 'white', opacity: 0.8, lineHeight: 20 }}>
                                {background.synopsis}
                            </Text>
                        </View>

                        <Button
                            onPress={() => navigation.navigate('Movies', { movieId: movieId })}
                            title="See Movie Details"
                            style={styles.buttonDetail}
                        />
                    </View>

                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    carouselText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 2,
        fontWeight: 'bold'
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    carouselContentContainer: {
        flex: 1,
        backgroundColor: '#000',
        height: 720,
        paddingHorizontal: 14
    },
    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    carouselContainerView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
        overflow: 'visible',
    },
    movieInfoContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 14
    },
    movieTitle: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 6
    },
    movieStat: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 0.8
    },
    playIconContainer: {
        backgroundColor: '#212121',
        padding: 18,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        borderWidth: 4,
        borderColor: 'rgba(2, 173, 148, 0.2)',
        marginBottom: 14
    },
    buttonDetail: {
        color: '#ff1493'
    }
});

export default ListMovies;