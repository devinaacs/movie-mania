import React from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./components/Navbar";
import ListMovies from "./components/ListMovies"


const Home = ({ navigate }) => {
    return (
        <View style={styles.container} >
            <Navbar></Navbar>
            <ListMovies></ListMovies>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
});

export default Home;