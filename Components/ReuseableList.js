import {
    StyleSheet, Text, View, Dimensions,
    RefreshControl, TouchableOpacity, Image
} from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { WHITE_COLOR } from '../res/colors'
import { DecodeTitle, destructuredPostData } from '../util/util'
import Badge from './Badge'
import { TIME_AGO_FORMAT } from '../res/constant'

const { width, height } = Dimensions.get('window')

const ReuseableList = ({ data, renderFooter, fetchMoreData, navigation, refresh, Api_fetchData }) => {

    const renderItem = ({ item }) => {

        let { jetpack_featured_media_url, title,
            date, category, author } = destructuredPostData(item)

        let decodedTitle = DecodeTitle(title?.rendered)

        return (
            <TouchableOpacity
                style={styles.topBlogs}
                onPress={() => navigation.navigate("BlogDetail", { id: item.id, name: decodedTitle })}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: jetpack_featured_media_url }}
                        style={styles.topBlogImg}
                    />
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.titleWrapperContainer}>
                        <Text numberOfLines={2} style={styles.titleWrapper}>{decodedTitle}</Text>
                        <Text style={styles.authorWrapper}>{author}</Text>
                    </View>

                    <Badge
                        date={date}
                        category={category}
                        type={TIME_AGO_FORMAT}
                    />

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                estimatedItemSize={100}
                renderItem={renderItem}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={Api_fetchData}
                    />
                }
            />
        </View>
    )
}

export default ReuseableList

const styles = StyleSheet.create({
    topBlogs: {
        width: '95%',
        height: 90,
        marginHorizontal: 8,
        marginVertical: 6,
        alignSelf: 'center',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: WHITE_COLOR,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topBlogImg: {
        width: 74,
        height: 74,
        resizeMode: 'cover',
        borderRadius: 8,
        marginLeft: 6
    },
    imageContainer: {
        flex: .24,
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'center'
    },
    dataContainer: {
        flex: .76,
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingEnd: 8,
        paddingVertical: 8,
        display: 'flex',
    },
    titleWrapper: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18,
    },

    container: {
        flex: 1
    },
    titleWrapperContainer: {
        flex: .7,
        justifyContent: 'space-between',
    },
    authorWrapper: {
        color: 'gray',
        fontSize: 12,
    }
})