import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DateConverter, dateFormat } from '../util/util'
import { WHITE_COLOR } from '../res/colors'
import { DATE_FORMAT, TIME_AGO_FORMAT } from '../res/constant'

const Badge = ({ category, date, type = null }) => {
    let dateConverter = DateConverter(date)
    let dateFormated = dateFormat(date)
    return (
        <View style={styles.dataBottomContainer}>
            <View style={{ backgroundColor: 'tomato', borderRadius: 4 }}>
                <Text style={styles.categoryWrapper}>{category}</Text>
            </View>
            {type === TIME_AGO_FORMAT &&
                <View>
                    <Text style={styles.timeAgo}>{dateConverter}</Text>
                </View>
            }
            {type === DATE_FORMAT &&
                <View>
                    <Text style={[styles.date_TextWrapper]}>{dateFormated}</Text>
                </View>
            }
        </View>
    )
}

export default Badge

const styles = StyleSheet.create({
    categoryWrapper: {
        fontSize: 12,
        fontWeight: '400',
        color: WHITE_COLOR,
        paddingHorizontal: 6,
        paddingBottom: 2

    },
    timeAgo: {
        fontSize: 12,
        color: 'gray'
    },
    date_TextWrapper: {
        borderRadius: 8,
        padding: 4,
        fontWeight: '500',
        color: '#ddd',
        fontSize: 12
    },
    dataBottomContainer: {
        flex: .3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
})