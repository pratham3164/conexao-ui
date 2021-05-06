import * as React from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native"

import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"

import { useNavigation } from "@react-navigation/native"

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

export interface CardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  id: number
  image: string
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Card = observer(function Card(props: CardProps) {
  const { id, image } = props

  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={CARD}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("view", {
          id: id,
        })
      }
    >
      {props.children}
      <Image source={{ uri: image }} style={IMAGE} />
    </TouchableOpacity>
  )
})
