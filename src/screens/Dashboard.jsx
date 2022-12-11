import { View, Text } from 'react-native'
import React from 'react'

const Dashboard = ({navigation, route}) => {
    console.log(route.params.name)
  return (
    <View>
      <Text>Dashboard</Text>
      <Text>Bonjour {route.params.name}</Text>
    </View>
  )
}

export default Dashboard