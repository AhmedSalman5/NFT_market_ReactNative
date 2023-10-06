import { View, Text, StyleSheet, Keyboard, SafeAreaView, TouchableWithoutFeedback, FlatList, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import {FlashList} from '@shopify/flash-list'
import { StatusBar } from "react-native";
import { COLORS, FONTS, SIZES, DATA } from '../constants';
import NFTCard from '../components/NFTCard';
import HomeHeader from '../components/HomeHeader';

const Home = () => {

    const [nftsData, setNftsData] = useState(DATA);

    //  Function to Search Handler
    const searchHandler = (value) => {
        if (value) {
            const filteredData = DATA.filter(
                (nft) => nft.name.toLowerCase().includes(value.toLowerCase()),
            );
            setNftsData(filteredData);
        } else {
            setNftsData(DATA);
        }
    };


    const NotFoundNFT = () => {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Opps . . . !</Text>
                <Text style={styles.notFoundText}>Not fount the NFT</Text>
            </View>
        )
    }

    // Search Animation
    const moveSearchAnimation = useRef(new Animated.Value(0)).current;
    const searchAnimationHandler = () => {
        Animated.spring(moveSearchAnimation, {
            toValue: 0,
            friction: 4,
            useNativeDriver: true,
        });
    }
    useEffect(() => {
        searchAnimationHandler();
    }, [searchAnimationHandler])


    return (
        <SafeAreaView style={styles.container}>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>

                    <Animated.View style={{
                        transform: [
                            {
                                translateY: moveSearchAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 200],
                                })
                            }
                        ]
                    }}>
                        <HomeHeader searchHandler={searchHandler} />
                    </Animated.View>


                    {!nftsData.length ? (
                        <NotFoundNFT />
                    ) :
                        <View style={{ marginHorizontal: 5, }}>
                            <FlatList
                                data={nftsData}
                                renderItem={({ item }) => <NFTCard NFTData={item} />}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    }

                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingTop: StatusBar.currentHeight + 10,
    },
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SIZES.xLarge,
    },
    notFoundText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: SIZES.xLarge,
    },
});