import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useQuery } from '@apollo/client';
import { GET_MOVIE } from '../../queries/movie';



export default function Movies({ route, navigation }) {
    const { movieId } = route.params;
    console.log(movieId)
    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: {
            getMovieId: movieId
        }
    })
    console.log(loading, error, data)


    // const [movies, setMovies] = useState([]);
    // console.log(movies)

    // const [loading, setLoading] = useState(true)

    if (loading) {
        return <ActivityIndicator size='large' color='pink' />;
    }

    if (error) {
        return <Text>Oops something went wrong...</Text>
    }

    // useEffect(() => {
    //     fetch(`http://192.168.1.3:4002/pub/movies/${movieId}`)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setMovies(json)
    //             setLoading(false)
    //         })
    //         .catch((error) => console.error(error))
    // }, []);
    if (loading) {
        return (
            <Text>...</Text>
        )
    }
    return (
        <View style={styles.container} >
            <View >
                <Text style={styles.innerText}>{data.getMovie.title} ({data.getMovie.year})</Text>
                <View style={{ alignItems: "center" }}>
                    <Image source={{ uri: data.getMovie.imgUrl }} style={{ width: 200, height: 300 }} />
                </View>
                <Text style={styles.dataText}>Genre: {data.getMovie.Genre.name}</Text>
                <Text style={styles.dataText}>Rating: {data.getMovie.rating}/10</Text>
                <Text style={styles.dataText}>Synopsis:</Text>
                <Text style={styles.dataText}>{data.getMovie.synopsis}</Text>
                <Text style={styles.dataText}>Casts:</Text>
                <View style={styles.containerCast}>
                    <View style={[styles.box]} >
                        <Image source={{ uri: data.getMovie.Casts[0].profilePict }} style={{ width: 70, height: 100 }} />
                    </View >
                    <View style={[styles.box]}>
                        <Image source={{ uri: data.getMovie.Casts[1].profilePict }} style={{ width: 70, height: 100 }} />
                    </View>
                    <View style={[styles.box]}>
                        <Image source={{ uri: data.getMovie.Casts[2].profilePict }} style={{ width: 70, height: 100 }} />
                    </View>
                </View>

                <View style={styles.containerCast}>
                    <View style={[styles.box]} >
                        <Text style={styles.dataText}>{data.getMovie.Casts[0].name}</Text>
                    </View >
                    <View style={[styles.box]}>
                        <Text style={styles.dataText}>{data.getMovie.Casts[1].name}</Text>
                    </View>
                    <View style={[styles.box]}>
                        <Text style={styles.dataText}>{data.getMovie.Casts[2].name}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width: '100%',
    },
    innerText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        justifyContent: "center",
    },
    dataText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        justifyContent: "center",
    },
    containerCast: {
        backgroundColor: "black",
        flexDirection: "row",
        flexWrap: "wrap",
        width: '100%',
    },
    box: {
        flex: 1,
        height: 100,
        alignItems: 'center',
    },
}); 