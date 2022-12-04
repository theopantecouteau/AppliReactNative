import * as React from "react";
import { Button, View, Text } from "react-native";

const HomeScreen = ({navigation}) => {

    return(
        <View>
            <Text>
                Bienvenue !
            </Text>
            <Button
                title="Go to TodoList"
                onPress={() => navigation.navigate('TodoList')}
            />
            <Button
                title="Go to ShoppingList"
                onPress={() => navigation.navigate('ShoppingList')}
            />
            <Button
                title="Go to AddressBook"
                onPress={() => navigation.navigate('AddressBook')}
            />
        </View>
    )
}

export default HomeScreen;