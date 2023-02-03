import * as React from "react";
import { Button, View, Text } from "react-native";
import { useSelector } from "react-redux";
import log from "../../loggerConfig"

const HomeScreen = ({navigation}) => {
    const isConnected = useSelector(state => state.isConnected.isConnected);
    return(
        <>
        {isConnected == true
            ?
                <View>
                    <Text>
                        Bienvenue ! 
                    </Text>
                    <Button
                        title="Go to TodoList"
                        onPress={() => navigation.navigate('ListTodoList')}
                    />
                    <Button
                        title="Go to ShoppingList"
                        onPress={() => navigation.navigate('ShoppingList')}
                    />
                    <Button
                        title="Go to AddressBook"
                        onPress={() => navigation.navigate('AddressBook')}
                    />
                    <Button
                        title="My account"
                        onPress={() => navigation.navigate('Dashboard')}
                    />
                </View>
            :
                <View>
                    <Text>
                        Bienvenue !
                    </Text>
                    <Button
                        title="Go to Login"
                        onPress={() => navigation.navigate('Login')}
                    />
                    <Button
                        title="Go to Register"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
        }
        </>
    )
}

export default HomeScreen;