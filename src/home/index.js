import {
  StyleSheet, Text, View, Image, Dimensions, ActivityIndicator,
  RefreshControl, TouchableOpacity, ScrollView, ImageBackground
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { fetchData } from '../../services/getData'
import SwiperBanner from '../../Components/Swiper'
import { MUD_GREENISH_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '../../res/colors'
import Ads from '../../Components/ads'
import { FlashList } from '@shopify/flash-list'
import BlogsList from '../../Components/BlogsList'
import { dateFormat, DecodeTitle, destructuredPostData } from '../../util/util'
import { LinearGradient } from 'expo-linear-gradient'
import Badge from '../../Components/Badge'
import { useGlobalContext } from '../../Components/context'
import NoInternet from '../../Components/NoInternet'
import { DATE_FORMAT } from '../../res/constant'
import HomeHeader from '../../Components/HomeHeader'

const { height, width } = Dimensions.get('window')

const Home = ({ navigation }) => {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)
  const { isConnected } = useGlobalContext()
  console.log("🚀 ~ file: index.js ~ line 25 ~ Home ~ isConnected", isConnected)



  useEffect(() => {
    fetchPosts()

  }, [])


  const fetchPosts = async () => {
    try {
      let result = await fetchData('posts', {})
      setData(result.data)
      setRefresh(false)
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 38 ~ fetchPosts ~ error", error)
    }
  }



  const renderItem = ({ item }) => {

    let { jetpack_featured_media_url, title,
      date, category } = destructuredPostData(item)

    let decodedTitle = DecodeTitle(title.rendered)

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate("BlogDetail", { id: item.id, name: decodedTitle })}
        style={styles.outerContainer}
      >
        <ImageBackground
          source={{ uri: jetpack_featured_media_url }}
          borderRadius={6}
          style={styles.topBlogs}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(0,0,0,1)']}
            style={styles.cardGrad}
          >
            <View style={{ width: '95%', height: 75, alignSelf: 'center' }}>
              <Badge
                date={date}
                category={category}
                type={DATE_FORMAT}
              />
            </View>
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.textWrapper}>{decodedTitle}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity >
    )
  }

  return (
    isConnected ?
      <ScrollView style={styles.container}>
        {refresh ?
          <View style={styles.ActivityInd}>
            <ActivityIndicator
              size={'large'}
              color={PRIMARY_COLOR}
            />
          </View> :
          <View>
            <HomeHeader
              navigation={navigation}
            />
            <SwiperBanner
              data={data}
              navigation={navigation}
            />
            { /* <Ads /> */}
            <View style={{ marginTop: 6, height: width / 2.1, marginHorizontal: 10 }}>
              <Text style={styles.topBlogText}>Featured News</Text>
              <FlashList
                data={data}
                horizontal={true}
                estimatedItemSize={width / 2.1}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    onRefresh={fetchPosts}
                  />
                }
              />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.newsText}>News</Text>
            </View>
            <View style={{ width: '100%', height: '100%' }}>
              <BlogsList navigation={navigation} />
            </View>
          </View>
        }
      </ScrollView>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NoInternet />
      </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    marginBottom: 80
  },
  topBlogText: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    marginHorizontal: 8
  },
  newsText: {
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: 8
  },
  topBlogs: {
    width: height / 4,
    height: width / 3,
  },
  topBlogImg: {
    width: height / 4,
    resizeMode: 'cover',
    borderRadius: 8
  },
  ActivityInd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  cardGrad: {
    height: width / 3,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 4
  },
  outerContainer: {
    width: height / 4,
    height: width / 3,
    margin: 4,
    borderRadius: 8
  },
  textContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8
  },
  textWrapper: {
    color: WHITE_COLOR,
    fontWeight: '400',
    fontSize: 12,

  },
  cat_TextWrapper: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 8,
    padding: 4,
    fontWeight: '500',
    color: MUD_GREENISH_COLOR,
    fontSize: 12,
    paddingHorizontal: 4
  },
  cat_dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    padding: 4
  }
})