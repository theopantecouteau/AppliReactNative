import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import log from "../../loggerConfig"

const Dashboard = ({navigation, route}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
    log.info(user)
  return (
    <View>
      <Text>Dashboard</Text>
      <Text>Bonjour {user.firstname}</Text>
    </View>
  )
}

export default Dashboard