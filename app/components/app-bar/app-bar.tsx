import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5 as Icon } from "@expo/vector-icons"
import { color, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  backgroundColor: color.primary,
  alignItems: "center",
  height: 56,
  paddingHorizontal: 16,
  elevation: 3,
}

const TEXT: TextStyle = {
  flex: 1,
  fontFamily: typography.primary,
  fontSize: 24,
  color: color.palette.white,
  fontWeight: "600",
  paddingRight: 6,
}

const ICON: TextStyle = {
  color: color.palette.white,
  fontSize: 24,
  paddingRight: 32,
}
export interface AppBarProps {
  /**
   * An optional style override useful for padding & margin.
   */

  title: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const AppBar = observer(function AppBar(props: AppBarProps) {
  const { style, title,onPress } = props
  const styles = flatten([CONTAINER, style])
  console.log("inside app bar")
  return (
    <View style={styles}>
      <Icon name="bars" style={ICON} onPress={onPress} />
      <Text style={TEXT} numberOfLines={1}>
        {title}
      </Text>
      {/* <Icon name="bars" style={ICON} onPress={() => null} /> */}
    </View>
  )
})
