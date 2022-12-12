import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, RefreshControl, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { fetchData } from '../../services/getData'
import { GREENISH_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../../res/colors'
import { FlashList } from '@shopify/flash-list'
import { CAT_BG } from '../../res/constant'
import { useGlobalContext } from '../../Components/context'
import NoInternet from '../../Components/NoInternet'

const Categories = ({ navigation }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [refresh, setRefresh] = useState(true)
  const [catResult, setCatResult] = useState([])

  const { isConnected } = useGlobalContext()

  useEffect(() => {
    if (page)
      fetchCategoriesList()
  }, [page])


  const fetchCategoriesList = async (params = {}) => {
    try {
      const res = await fetchData('categories', { page })
      setData([...data, ...res.data])
      setRefresh(false)
      setCatResult(res.data)
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 27 ~ fetchCategoriesList ~ error", error)
    }
  }


  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <ImageBackground
          source={CAT_BG}
          borderRadius={8}
          style={styles.background}
        >
          <TouchableOpacity
            onPress={() => { navigation.navigate('NewsList', { categories: item.id, name: item.name }) }}
            style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={styles.catTextWrapper}>{`${item.name} {${item.count}`}}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      catResult && catResult.length < 10 ?
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
      <View style={styles.container}>
        <FlashList
          data={data}
          estimatedItemSize={80}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={fetchCategoriesList}
            />
          }
        />
      </View>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NoInternet/>
      </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 80
  },
  catTextWrapper: {
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
    color: WHITE_COLOR
  },
  card: {
    margin: 8,
    height: 100,
    borderRadius: 8,
  },
  background: {
    height: "100%",
    width: '100%',
    borderRadius: 8,
  }
})