import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../../services/getData'
import ReuseableList from '../../Components/ReuseableList'
import { GREENISH_COLOR, PRIMARY_COLOR } from '../../res/colors'
import NoInternet from '../../Components/NoInternet'
import { useGlobalContext } from '../../Components/context'


const NewsListFiltered = ({ route, navigation }) => {
    const { params } = route
    const [blog, setBlog] = useState([])
    const [blogResult, setBlogResult] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [page, setPage] = useState(1)

    const { isConnected } = useGlobalContext()

    useEffect(() => {
        if (page)
            fetchPosts(params)
    }, [page])

    const fetchPosts = async (params = {}) => {
        try {
            const result = await fetchData('posts', { ...params, page })
            setBlog([...blog, ...result.data])
            setRefresh(false)
            setBlogResult(result.data)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 27 ~ fetchPosts ~ error", error)
        }

    }

    const renderFooter = () => {
        return (
            blogResult && blogResult.length < 10 ?
                <Text style={{ alignSelf: 'center', color: 'gray' }}>No more Data</Text>
                : <ActivityIndicator
                    size={'large'}
                    color={GREENISH_COLOR}
                />
        )
    }

    const fetchMoreData = () => {
        setPage(page + 1)
    }

    return (
        isConnected ?
            <View style={{ flex: 1 }}>
                {refresh ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator
                            size={'large'}
                            color={PRIMARY_COLOR}
                        />
                    </View> :
                    <View style={styles.container}>
                        <ReuseableList
                            data={blog}
                            renderFooter={renderFooter}
                            fetchMoreData={fetchMoreData}
                            navigation={navigation}
                            refresh={refresh}
                            Api_fetchData={fetchPosts}
                        />
                    </View>
                }
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NoInternet />
            </View>
    )
}

export default NewsListFiltered

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})