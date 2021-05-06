import * as React from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { Text } from "../"
import store from "../../models/book-store/book-store"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome as Icon } from "@expo/vector-icons"

const CARD: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  aspectRatio: 4 / 7,
  backgroundColor: color.palette.white,
  borderRadius: 5,
  elevation: 3,
  margin: 8,
}
const IMAGE: ImageStyle = {
  width: "100%",
  flex: 1,
  // tintColor: "#414141",
  resizeMode: "stretch",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
}
const TITLE: TextStyle = {
  color: color.darkText,
  fontSize: 14,
  fontWeight: "bold",
}
const STACK: ViewStyle = {
  flex: 1,
}
const ICON: TextStyle = {
  color: color.palette.orange,
  position: "absolute",
  right: 8,
  bottom: 8,
}
const TEXT: ViewStyle = {
  padding: 6,
}
const YEAR: TextStyle = {
  color: color.lightText,
  fontSize: 14,
  fontWeight: "500",
}

export interface BookCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  id: number
  image: string
  name: string
  year: string
  liked: boolean
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const BookCard = observer(function BookCard(props: BookCardProps) {
  const { id, image, name, year, liked } = props
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={CARD}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("view", {
          id: id,
        })
      }
    >
      <View style={STACK}>
        <Image source={{ uri: image }} style={IMAGE} />

        <Icon
          name={liked ? "heart" : "heart-o"}
          size={28}
          style={ICON}
          onPress={() => store.toggleLike(id)}
        />
      </View>
      <View style={TEXT}>
        <Text style={TITLE} numberOfLines={2}>
          {name}
        </Text>
        <Text style={YEAR}>{year}</Text>
      </View>
    </TouchableOpacity>
  )
})
