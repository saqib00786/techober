import { StyleSheet, Text, View, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GREENISH_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../../res/colors'
import { fetchData } from '../../services/getData'
import BlogDetailComponent from '../../Components/blogDetailComponent'
import { DecodeTitle } from '../../util/util'
import NoInternet from '../../Components/NoInternet'
import { useGlobalContext } from '../../Components/context'

const { height, width } = Dimensions.get("window")

const BlogDetail = ({ route, navigation }) => {
    const { params } = route
    const { id } = params

    const [blog, setBlog] = useState([])
    const [refresh, setRefresh] = useState(true)

    const { isConnected } = useGlobalContext()

    useEffect(() => {
        fetchSinglePost(id)
    }, [id])

    const fetchSinglePost = async (id) => {
        try {
            const result = await fetchData(`posts/${id}`, {})
            setBlog(result.data)
            setRefresh(false)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 27 ~ fetchSinglePost ~ error", error)
        }

    }

    return (
        isConnected ?
            <ScrollView >
                {refresh ? <ActivityIndicator /> :
                    <View style={styles.container}>
                        <BlogDetailComponent
                            data={blog}
                        />
                    </View>
                }
            </ScrollView >
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NoInternet />
            </View>
    )
}

export default BlogDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
    },
})
