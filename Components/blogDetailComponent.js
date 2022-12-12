import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GREENISH_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../res/colors'
import RenderHTML from 'react-native-render-html'
import { dateFormat, DecodeTitle, destructuredPostData } from '../util/util'
import { CLOCK_LOGO, STAFF_LOGO } from '../res/constant'
import { Avatar } from 'react-native-paper'
import { getSingleBlogData, onBookmarkBlog, onBookmarkRemove } from '../storage'


const { height, width } = Dimensions.get("window")

const BlogDetailComponent = ({ data = null }) => {

    const [isBookmarked, setIsBookmarked] = useState(false)
    const [post, setPost] = useState([])


    let { jetpack_featured_media_url,
        title, date, keywords = [], category, rendered, author, id } = destructuredPostData(data)

    useEffect(() => {
        fetchSinglePost()
    }, [fetchSinglePost])


    let fetchSinglePost = async () => {
        let singlePost = await getSingleBlogData(id)
        if (!singlePost) return
        let result = JSON.parse(singlePost)
        setPost(result)
        setIsBookmarked(result.isMarked)
    }


    let blogObject = {
        jetpack_featured_media_url,
        title,
        author,
        category,
        date,
        isMarked: true
    }



    const source = {
        html: `${rendered}`
    };

    let getKeywords = keywords.map((value) => {
        if (!value) return
        return (
            <View style={styles.chips}>
                <Text style={{ margin: 4, padding: 4, color: WHITE_COLOR }}>{value}</Text>
            </View>
        )
    })


    let BlogTitle = DecodeTitle(title?.rendered)
    let formatedDate = dateFormat(date)

    const callback = () => {
        setIsBookmarked(false)
        console.log("🚀 ~ file: blogDetailComponent.js ~ line 65 ~ callback ~ callback", callback)
    }

    return (
        <View>
            <View style={styles.Blog_img_container}>
                <Image
                    source={{ uri: jetpack_featured_media_url }}
                    style={styles.blog_Image}
                />
                <View style={styles.categoryTag}>
                    <Text style={styles.CatText}>{category}</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Image
                    source={STAFF_LOGO}
                    style={{ width: 16, height: 16, borderRadius: 100, marginHorizontal: 4 }}
                />
                <Text style={styles.authorWrapper}>{author}</Text>
                <Image
                    source={CLOCK_LOGO}
                    style={{ width: 16, height: 16, borderRadius: 100, marginHorizontal: 4 }}
                />
                <Text style={styles.dateWrapper}>{formatedDate}</Text>
            </View>

            <View style={styles.BlogTitleContainer}>
                <Text style={styles.BlogTitleWrapper}>{BlogTitle}</Text>
            </View>

            <View style={styles.BlogTextBody}>
                <RenderHTML
                    source={source}
                    contentWidth={width}
                />
            </View>
            <View style={styles.dkeywords}>
                {getKeywords}
            </View>

            <TouchableOpacity
                onPress={() => {
                    post && isBookmarked ? onBookmarkRemove(id, () => callback()) && setIsBookmarked(false)
                        : onBookmarkBlog(id, blogObject, () => callback()) && setIsBookmarked(true)

                }}
                style={{ position: 'absolute', alignSelf: 'flex-end' }}
            >
                <Avatar.Icon
                    icon={post && isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    style={{ backgroundColor: 'transparent' }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default BlogDetailComponent

const styles = StyleSheet.create({
    infoContainer: {
        alignSelf: 'flex-end',
        marginHorizontal: 12,
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateWrapper: {
        fontWeight: 'bold',
        color: 'gray'
    },
    Blog_img_container: {
        width: width,
        height: width / 2,
        alignItems: 'center',
    },
    blog_Image: {
        width: '100%',
        height: width / 2,
        //resizeMode: 'contain',
    },
    categoryTag: {
        paddingHorizontal: 8,
        height: 25,
        position: 'absolute',
        backgroundColor: 'tomato',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        left: 10,
        marginLeft: 20,
        bottom: -15
    },
    CatText: {
        color: WHITE_COLOR
    },
    dkeywords: {
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    chips: {
        backgroundColor: 'tomato',
        margin: 4,
        borderRadius: 8,
        marginLeft: 12
    },
    BlogTitleContainer: {
        marginHorizontal: 12,
        backgroundColor: 'rgba(15, 146, 141,0.7)',
        padding: 8,
        borderRadius: 8,
    },
    BlogTitleWrapper: {
        textAlign: 'justify',
        fontWeight: 'bold',
        fontSize: 16,
        color: WHITE_COLOR
    },
    BlogTextBody: {
        marginHorizontal: 12
    },
    authorWrapper: {
        color: 'gray',
        fontWeight: '400',
        marginRight: 12
    }
})