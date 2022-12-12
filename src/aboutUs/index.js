import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import React from 'react'
import { GREENISH_COLOR, MUD_GREENISH_COLOR, WHITE_COLOR } from '../../res/colors'
import { Avatar } from 'react-native-paper'
import { FACEBOOK, INSTAGRAM, PINTEREST, TWITTER } from '../../res/constant'

const AboutUs = () => {
    return (
        <ScrollView>
            <View>
                <ReuseText
                    text={'About Us'}
                    style={styles.aboutUs}
                />

                <ReuseText
                    text={"Techober is a blog that covers the latest trends in the world of technology and startups." +
                        "Our focus areas are gadgets, smartphones, tablets, wearable tech and early age startups." +
                        "If you want to contribute on this blog, feel free to contact at editor[at]techober.com"}
                    style={styles.aboutUsTextWrapper}
                />
            </View>
            <View>
                <ReuseText
                    text={'Contact Us'}
                    style={styles.aboutUs}
                />
                <ReuseText
                    text={'Phone'}
                    style={styles.aboutUsSub} />

                <ReuseText
                    text={' +92 51 2825565'}
                    style={styles.aboutUsTextWrapper}
                />

                <ReuseText
                    text={'Email'}
                    style={styles.aboutUsSub} />
                <ReuseText
                    text={' editor[at]techober.com'}
                    style={styles.aboutUsTextWrapper}
                />
                <ReuseText
                    text={'Address'}
                    style={styles.aboutUsSub} />

                <ReuseText
                    text={' 3rd Floor, CIS Technology Park, Shahrah-e-Jamhuriat, Islamabad 44000, Pakistan'}
                    style={styles.aboutUsTextWrapper}
                />
            </View>

            <View>
                <ReuseText
                    text={'Social Media Platforms'}
                    style={styles.aboutUs}
                />
            </View>
            <View style={styles.socialMedia}>
                <Icon
                    icon={'facebook'}
                    color={'#0469E5'}
                    onPress={() => Linking.openURL(FACEBOOK)}
                />
                <Icon
                    icon={'twitter'}
                    color={'#1DA1F2'}
                    onPress={() => Linking.openURL(TWITTER)}
                />
                <Icon
                    icon={'instagram'}
                    color={'#EF01C0'}
                    onPress={() => Linking.openURL(INSTAGRAM)}
                />
                <Icon
                    icon={'pinterest'}
                    color={'#B7081B'}
                    onPress={() => Linking.openURL(PINTEREST)}
                />
            </View>
        </ScrollView>
    )

}

const ReuseText = ({ text = null, style = { style } }) => {
    return (
        <Text style={style}>{text}</Text>
    )
}

const Icon = ({ icon, color, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={{ padding: 4, margin: 4 }}
        >
            <Avatar.Icon
                icon={icon}
                size={50}
                color={WHITE_COLOR}
                style={{ backgroundColor: color }}
            />
        </TouchableOpacity>
    )
}
export default AboutUs

const styles = StyleSheet.create({
    aboutUs: {
        fontSize: 22,
        fontWeight: 'bold',
        color: MUD_GREENISH_COLOR,
        paddingHorizontal: 8,
        paddingTop: 8,
        margin: 4
    },
    aboutUsTextWrapper: {
        paddingHorizontal: 8,
        margin: 4,
        fontSize: 15,
        lineHeight: 15 * 1.3,
        color: MUD_GREENISH_COLOR,
        textAlign: 'justify'

    },
    socialMedia: {
        paddingHorizontal: 8,
        margin: 4,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-around'
    },
    aboutUsSub: {
        fontSize: 18,
        fontWeight: '600',
        color: MUD_GREENISH_COLOR,
        paddingHorizontal: 8,
        paddingTop: 4,
        margin: 4
    }

})