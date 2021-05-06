/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native"
import { Screen, Text, AppBar } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import store from "../../models/book-store/book-store"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}
const CARD: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 8,
}
const IMAGE: ImageStyle = {
  resizeMode: "stretch",
  borderRadius: 5,
  width: 80,
  height: 130,
  position: "absolute",
  left: 0,
}
const TITLE: TextStyle = {
  color: color.darkText,
  fontSize: 14,
  fontWeight: "bold",
}
const TEXT: ViewStyle = {
  flex: 1,
  height: 140,
  marginLeft: 40,
  paddingVertical: 12,
  paddingLeft: 50,
  paddingRight: 10,
  backgroundColor: color.palette.white,
  borderRadius: 5,
  justifyContent: "center",
}
const YEAR: TextStyle = {
  color: color.lightText,
  fontSize: 14,
  fontWeight: "500",
}
const List: ViewStyle = {
  padding: 16,
}

// export const sizes = {
//   small: 14,
//   large: 24,
// }
export const WishListScreen = observer(function WishListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const renderItem = ({ item }) => {
    console.log(item.image)
    return (
      <TouchableOpacity
        style={CARD}
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("view", {
            id: item.id,
          })
        }
      >
        <View style={TEXT}>
          <Text style={TITLE} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={YEAR}>{item.year}</Text>
          <Text style={YEAR}>{item.author}</Text>
          <View style={{ height: 5 }}></View>
          <Button
            title="Remove"
            onPress={() => store.toggleLike(item.id)}
            color={color.palette.orange}
          />
        </View>

        <Image source={{ uri: item.image }} style={IMAGE} />
      </TouchableOpacity>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <AppBar title="Wish List" />
      <FlatList
        data={store.getWishList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={List}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
})
