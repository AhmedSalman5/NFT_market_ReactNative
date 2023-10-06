import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react'
import NFTImage from '../components/NFTImage';
import NFTAvatars from '../components/NFTAvatars';
import NFTTitle from '../components/NFTTitle';
import NFTInfo from '../components/NFTInfo';
import NFTMoreInfo from '../components/NFTMoreInfo';
import Button from '../components/Button';


const NFTDetails = ({ route, navigation }) => {
    //console.log(route);
    const { NFTData } = route.params;

    const moveAnimation = useRef(new Animated.Value(0)).current;
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    // const duration = 1000;
    // const delay = duration + 200;

    const moveAnimationHandler =()=>{
        Animated.spring(moveAnimation,{
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
        }).start();
    }
    const fadeAnimationHandler =()=>{
        Animated.timing(fadeAnimation,{
            toValue: 1,
            duration: 1000,
            delay: 300,
            useNativeDriver: true,
        }).start();
    }
    useEffect(()=>{
        moveAnimationHandler();
        fadeAnimationHandler();
    },[moveAnimationHandler,fadeAnimationHandler])

    const pressHandler = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={{ flex: 1, transform:[{
                translateY:moveAnimation.interpolate({
                    inputRange:[0,1],
                    outputRange:[200,0],
                })
            }] }}>

                <NFTImage
                    image={NFTData.image}
                    imageStyles={styles.imageStyles}
                    love
                    arrow
                    pressHandler={pressHandler}
                />

                <View style={{ paddingHorizontal: SIZES.xLarge }}>

                    <View style={{ marginTop: -SIZES.xLarge }}>
                        <NFTAvatars avatars={NFTData.avatars} />
                    </View>

                    <View style={{ marginVertical: SIZES.medium }}>
                        <NFTTitle
                            _name={NFTData.name}
                            creator={NFTData.creator}
                            date={NFTData.date}
                        />
                    </View>

                    <View style={{ marginVertical: SIZES.medium }}>
                        <NFTInfo
                            price={NFTData.price}
                            views={NFTData.views}
                            comments={NFTData.comments}
                        />
                    </View>

                    <View style={{ marginVertical: SIZES.medium }}>
                        <NFTMoreInfo
                            address={NFTData.address}
                            tokenId={NFTData.tokenId}
                            tokenSt={NFTData.tokenSt}
                            blockchain={NFTData.blockchain}
                        />
                    </View>
                </View>


                <Animated.View style={[styles.buttonContainer,{
                    opacity:fadeAnimation,
                }]}>
                    <View style={styles.wrapper}>
                        <View>
                            <Text style={styles.text}>Top bid</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                padding: SIZES.small - 4,
                            }}>
                                <FontAwesome name='dollar' size={15} color='white' />
                                <Text style={styles.text}>{NFTData.topBid}</Text>
                            </View>
                        </View>

                        <Button
                            title='Place a bid'
                            stylesText={styles.textButton}
                            stylesButton={styles.button}
                        />

                    </View>
                </Animated.View>

            </Animated.View>
        </SafeAreaView>
    )
}

export default NFTDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        width: '100%',
        marginTop: -20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageStyles: {
        width: '100%',
        height: 400,
        borderRadius: 20,

    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: SIZES.small,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    wrapper: {
        backgroundColor: COLORS.cardBg,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
    },
    text: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
    },
    button: {
        backgroundColor: COLORS.second,
        padding: 16,
        width: 150,
        borderRadius: 20,
    },
    textButton: {
        fontSize: SIZES.medium + 2,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
    },
});