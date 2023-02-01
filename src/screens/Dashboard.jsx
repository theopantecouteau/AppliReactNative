import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = ({navigation, route}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  return (
    <View>
      <Text>Dashboard</Text>
      <Text>Bonjour {user.firstname}</Text>
    </View>
  )
}

export default Dashboard