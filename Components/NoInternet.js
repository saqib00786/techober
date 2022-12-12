import { LayoutAnimation, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { MUD_GREENISH_COLOR } from '../res/colors'

const NoInternet = () => {
  return (
    <View>
      <Avatar.Icon
        size={150}
        icon={'wifi-off'}
        color={'tomato'}
        style={{ backgroundColor: 'transparent' }}
      />
      <Text style={styles.noInterntText}>No Internet Connected!</Text>
    </View>
  )
}

export default NoInternet

const styles = StyleSheet.create({
  noInterntText : {
    fontWeight : '500',
    fontSize : 16,
    color : 'tomato'
  }
})