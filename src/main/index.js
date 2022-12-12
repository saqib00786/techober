import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../home'
import Categories from '../categories'
import BookMark from '../bookmark'
import { LinearGradient } from 'expo-linear-gradient';
import { MUD_GREENISH_COLOR } from '../../res/colors'

const Main = () => {
    const Tab = createBottomTabNavigator()
    return (
        <View style={styles.container}>
            <Tab.Navigator initialRouteName='home'
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 10,
                        left: 20,
                        right: 20,
                        borderRadius: 100,
                        height: 60,
                        elevation: 5,
                        backgroundColor: 'rgba(255,255,255,0.9)'
                    }
                }}
            >
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                icon={'home-outline'}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name='Categories'
                    component={Categories}
                    options={{
                        // headerShown: false,
                        headerTintColor: MUD_GREENISH_COLOR,
                        tabBarShowLabel: false,
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                icon={'format-list-checkbox'}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name='BookMark'
                    component={BookMark}
                    options={{
                        //headerShown: false,
                        headerTitleAlign: 'center',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                icon={'bookmark-outline'}
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tab.Navigator>

        </View>
    )

}

const Icon = ({ icon, focused }) => {
    return (
        <Avatar.Icon
            icon={icon}
            size={50}
            color={focused ? MUD_GREENISH_COLOR : 'gray'}
            style={{ backgroundColor: 'transparent' }}
        />
    )
}


export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        headerShown: false,
        tabBarLabelStyle: {
            fontSize: 2,
        },
        tabBarActiveTintColor: "tomato"
    },
})