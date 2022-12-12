import { StyleSheet, ActivityIndicator, Dimensions, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../services/getData'
import { GREENISH_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../res/colors'
import ReuseableList from './ReuseableList'

const BlogsList = ({ navigation }) => {
    const [blog, setBlog] = useState([])
    const [page, setPage] = useState(1)
    const [refresh, setRefresh] = useState(true)
    const [blogResult, setBlogResult] = useState([])

    useEffect(() => {
        if (page)
            fetchPostsList()
    }, [page])

    const fetchPostsList = async () => {
        try {
            let result = await fetchData('posts', { page })
            setBlog([...blog, ...result.data])
            setRefresh(false)
            setBlogResult(result.data)
        } catch (error) {
            console.log("🚀 ~ file: BlogsList.js ~ line 25 ~ fetchPostsList ~ error", error)
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
        <View style={{ marginHorizontal: 4 }}>
            {
                refresh ? <ActivityIndicator
                    size={'large'}
                    color={PRIMARY_COLOR}
                /> :
                    <ReuseableList
                        data={blog}
                        renderFooter={renderFooter}
                        fetchMoreData={fetchMoreData}
                        navigation={navigation}
                        refresh={refresh}
                    />
            }
        </View>
    )
}

export default BlogsList

const styles = StyleSheet.create({

})
