import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GREENISH_COLOR } from '../res/colors'

const { height, width } = Dimensions.get('window')

const Ads = () => {
    return (
        <View style={styles.bannerAd}>
        </View>
    )
}

export default Ads

const styles = StyleSheet.create({
    bannerAd: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: GREENISH_COLOR,
        height: 90,
        marginHorizontal: 20,
        marginTop : 10,
        borderRadius: 8
    }
})