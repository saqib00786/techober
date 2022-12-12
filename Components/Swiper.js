import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { LinearGradient } from 'expo-linear-gradient'
import { WHITE_COLOR } from '../res/colors'
import { DecodeTitle, destructuredPostData } from '../util/util'
import Badge from './Badge'
import { DATE_FORMAT } from '../res/constant'

const { height, width } = Dimensions.get('window')

const SwiperBanner = ({ data, navigation }) => {
    return (
        <View style={styles.swiper}>

            <Swiper
                style={{ height: 300 }}
                showsButtons={false}
                activeDotColor={WHITE_COLOR}
                dotStyle={{ opacity: 1, borderColor: 'white', borderWidth: 1 }}
                autoplay={true}
                autoplayTimeout={4}
            >
                {
                    data.map((item) => {

                        let { jetpack_featured_media_url, title,
                            date, category } = destructuredPostData(item)

                        let titleCovert = DecodeTitle(title.rendered)

                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => navigation.navigate('BlogDetail', { id: item.id, name: titleCovert })}
                            >
                                <ImageBackground
                                    style={styles.banner}
                                    borderRadius={6}
                                    //resizeMode='contain'
                                    source={{ uri: jetpack_featured_media_url }}
                                >
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,1)']}
                                        style={styles.cardGrad}
                                    >
                                        <View style={{ width: '95%', height: 80, alignSelf: 'center' }}>
                                            <Badge
                                                category={category}
                                                date={date}
                                                type={DATE_FORMAT}
                                            />
                                        </View>

                                        <View style={styles.textContainer}>
                                            <Text numberOfLines={2} style={styles.swiperTextWrapper}>
                                                {titleCovert}
                                            </Text>
                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })
                }

            </Swiper>

        </View >

    )
}

export default SwiperBanner
const styles = StyleSheet.create({
    swiper: {
        width: width,
        height: width / 2,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    banner: {
        height: width / 2,
        borderRadius: 10,
        marginHorizontal: 12,
    },
    cardGrad: {
        height: width / 2,
        borderRadius: 8
    },
    swiperTextWrapper: {
        color: WHITE_COLOR,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 4,
        paddingHorizontal: 8
    },
    textContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },



})