import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MUD_GREENISH_COLOR, WHITE_COLOR } from '../res/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { TECHOBER_LOGO, TECHOBER } from '../res/constant'
import { homeHeaderMessage } from '../util/util'



const HomeHeader = ({ navigation }) => {

    let message = homeHeaderMessage()

    return (
        <View style={styles.headerContainer}>
            <LinearGradient
                colors={['rgba(15,146,108,0.8)', 'rgba(3,136,169,1)']}
                style={styles.headerGraContainer}
                start={{
                    x: 0,
                    y: 0.5
                }}
                end={{
                    x: 1,
                    y: 0.2
                }}
            >
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headingTextWrapper}>
                            {`${message},Techober`}
                        </Text>
                        <TouchableOpacity
                            style={styles.expoloreButton}
                            onPress={() => navigation.navigate('AboutUs', { name: TECHOBER })}
                        >
                            <Text style={styles.expoloreTextWrapper}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        source={TECHOBER_LOGO}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>

            </LinearGradient>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    headerContainer: {
        height: 110,
        width: '100%',
        backgroundColor: MUD_GREENISH_COLOR,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12
    },
    headerGraContainer: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        display: 'flex',
        flexDirection: 'row'
    },
    headingContainer: {
        flex: .6,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft : 12,
        paddingTop: 12,
    },
    logoContainer: {
        flex: .4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingTextWrapper: {
        fontSize: 18,
        lineHeight : 18,
        color: WHITE_COLOR,
        //fontWeight: 'bold',

    },
    expoloreButton: {
        width: '100%',
        margin: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'tomato',
        borderRadius: 4
    },
    expoloreTextWrapper: {
        color: WHITE_COLOR,
        fontWeight: '500'
    }
})