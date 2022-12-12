import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from '../main'
import NewsListFiltered from '../newsListFiltered'
import BlogDetail from '../blogDetail'
import { GREENISH_COLOR, MUD_GREENISH_COLOR } from '../../res/colors'
import AboutUs from '../aboutUs'


const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Main'
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='BlogDetail'
                    component={BlogDetail}
                    options={({ route }) => ({ title: route.params.name, headerTintColor: MUD_GREENISH_COLOR })}
                />
                <Stack.Screen
                    name='NewsList'
                    component={NewsListFiltered}
                    options={({ route }) => ({ title: route.params.name, headerTintColor: MUD_GREENISH_COLOR })}
                />
                <Stack.Screen
                    name='AboutUs'
                    component={AboutUs}
                    options={({ route }) => ({ title: route.params.name, headerTintColor: MUD_GREENISH_COLOR })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
