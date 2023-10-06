import { View, Text, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants';
import React from 'react'

const NFTDate = ({ date }) => {
    return (
        <View>
            <Text style={styles.textDate}>{date}</Text>
        </View>
    )
}

export default NFTDate;

const styles = StyleSheet.create({
    textDate: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
});