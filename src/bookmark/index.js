import { StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoInternet from '../../Components/NoInternet'
import { useGlobalContext } from '../../Components/context'
import { MUD_GREENISH_COLOR, WHITE_COLOR } from '../../res/colors'
import { getAllBookmark, removeBookmark } from '../../storage'
import { FlashList } from '@shopify/flash-list'
import Badge from '../../Components/Badge'
import { DecodeTitle } from '../../util/util'
import { TIME_AGO_FORMAT } from '../../res/constant'

const BookMark = ({ navigation }) => {

  const { isConnected } = useGlobalContext()
  const [data, setData] = useState()
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      fetchAllBookmarkBlog()
      setRefresh(false)
    })

    return subscribe
  }, [navigation])

  const fetchAllBookmarkBlog = async () => {
    let result = await getAllBookmark()
    setData(result)
  }

  const renderItem = ({ item }) => {
    const [key, value] = item
    let obj = JSON.parse(value)

    const {
      jetpack_featured_media_url,
      title,
      author,
      category,
      date, } = obj

    let decodedTitle = DecodeTitle(title.rendered)

    return (
      <TouchableOpacity
        style={styles.topBlogs}
        onPress={() => navigation.navigate("BlogDetail", { id: key, name: decodedTitle })}
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
    isConnected ?
      <View style={styles.container}>
        <FlashList
          data={data}
          estimatedItemSize={90}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={fetchAllBookmarkBlog}
            />
          }
        />
      </View>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NoInternet />
      </View>
  )
}

export default BookMark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80
  },
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
  titleWrapperContainer: {
    flex: .7,
    justifyContent: 'space-between',
  },
  authorWrapper: {
    color: 'gray',
    fontSize: 12,
  }
})