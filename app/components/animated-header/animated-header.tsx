/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Animated, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesome5 as Icon } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface AnimatedHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  animatedValue: any
  image: string
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
const HEADER_HEIGHT = 380
export const AnimatedHeader = observer(function AnimatedHeader(props: AnimatedHeaderProps) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const navigate = () => navigation.goBack()
  const headerHeight = props.animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: "clamp",
  })
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: "lightblue",
      }}
    >
      <Image source={{ uri: props.image }} style={{ flex: 1, resizeMode: "stretch" }} />
      <Icon
        name="arrow-left"
        size={24}
        color="white"
        style={{ position: "absolute", top: 10, left: 16 }}
        onPress={navigate}
      />
    </Animated.View>
  )
})
