import { StyleSheet, Text, Image, View, Alert, TouchableOpacity } from "react-native";
import React from "react";
import logomm from '../../assets/movie-mania-navbar.png'
import ticket from '../../assets/ticket.png'
import location from '../../assets/location.png'

const Navbar = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.box]} >
                < TouchableOpacity onPress={() => Alert.alert(
                    "COMING SOON",
                    "Under Construction",
                    [{
                        text: "OK",
                        onPress: () => console.log("OK Pressed")
                    }]
                )}>
                    <Image style={styles.logoImgSide} source={ticket} />
                    <Text>Ticket</Text>
                </TouchableOpacity>
            </View >
            <View style={[styles.box1]}>
                <Image source={logomm} style={styles.logoImg} ></Image>
            </View>
            <View style={[styles.box]}>
                <TouchableOpacity onPress={() => Alert.alert(
                    "COMING SOON",
                    "Under Construction",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("OK Pressed")
                        }
                    ]
                )}>
                    <Image source={location} style={styles.logoImgSide} ></Image>
                    <Text>Theather</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default Navbar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        flexWrap: "wrap",
        width: '100%',
    },
    box: {
        flex: 0.2,
        height: 60,
        alignItems: 'center',
    },
    box1: {
        flex: 0.6,
        alignItems: 'center',
    },
    logoImg: {
        flex: 1,
        aspectRatio: 3,
        resizeMode: 'contain',
    },
    logoImgSide: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
    }
});