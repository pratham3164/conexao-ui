/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  ImageStyle,
  ScrollView,
  Text,
  View,
  Image,
  TextStyle,
  Animated,
} from "react-native"

import { Screen, AppBar, Button, AnimatedHeader } from "../../components"
// import { useNavigation } from "@react-navigation/native"

import store from "../../models/book-store/book-store"
import IssueStore from "../../models/issue-store/issue-store"
import { ViewScreenProps } from "../../navigators/param-list"
import { color, ID } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  paddingTop: 380,
  paddingHorizontal: 20,
  paddingBottom: 40,
  alignItems: "center",
}
const IMAGE: ImageStyle = {
  height: 400,
  width: 260,
  resizeMode: "stretch",
  borderRadius: 5,
}
const TEXT: TextStyle = {
  padding: 2,
  fontWeight: "100",
  color: color.lightText,
  fontSize: 18,
}
const INNER_TEXT: TextStyle = {
  fontWeight: "bold",
  color: color.darkText,
}

export const ViewScreen = observer(function ViewScreen({ route }: ViewScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { id } = route.params
  // Pull in navigation via hook
  // const navigation = useNavigation()
  // const [scrollY, scrollYState] = useState(new Animated.Value(0))

  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, HEADER_EXPANDED_RATIO - HEADER_COLLAPSED_RATIO],
  //   outputRange: [HEADER_EXPANDED_RATIO, HEADER_COLLAPSED_RATIO],
  //   extrapolate: "clamp",
  // })
  const item = store.books.filter((item) => item.id === id)
  console.log(item)

  const offset = useRef(new Animated.Value(0)).current

  let buttonStr: string
  let btnColor: string
  let onPress
  if (IssueStore.idList.includes(id)) {
    buttonStr = "Return Book"
    btnColor = color.palette.red
    onPress = () => {
      IssueStore.returnBook({ userId: ID, bookId: id, fine: 0 })
    }
  } else {
    buttonStr = "Issue Book"
    btnColor = color.palette.green
    onPress = () => IssueStore.addIssue({ userId: ID, bookId: id })
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <AnimatedHeader animatedValue={offset} image={item[0].image} />
      <ScrollView
        contentContainerStyle={CONTAINER}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
          useNativeDriver: false,
        })}
      >
        <View style={{ marginVertical: 16 }}>
          <Text style={TEXT}>
            Title :-
            <Text style={INNER_TEXT}>{item[0].name}</Text>
          </Text>
          <Text style={TEXT}>
            Year:-
            <Text style={INNER_TEXT}>{item[0].year}</Text>
          </Text>
          <Text style={TEXT}>
            Author:-
            <Text style={INNER_TEXT}>{item[0].author}</Text>
          </Text>
          <Text style={TEXT}>
            Publisher:-
            <Text style={INNER_TEXT}>{item[0].publisher}</Text>
          </Text>
          <Text style={TEXT}>
            Genre:-
            <Text style={INNER_TEXT}>{item[0].genre}</Text>
          </Text>
          <Text style={TEXT}>
            Language:-
            <Text style={INNER_TEXT}>{item[0].language}</Text>
          </Text>
          <Text style={TEXT}>
            Count:-
            <Text style={INNER_TEXT}>{item[0].count}</Text>
          </Text>
          <Text style={TEXT}>
            Description:-
            <Text style={INNER_TEXT}>{item[0].description}</Text>
          </Text>
        </View>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            text={item[0].liked ? "Remove wishlist" : "Add to Wishlist"}
            style={{ backgroundColor: color.palette.orange, flex: 1 }}
            textStyle={{ fontSize: 14, fontWeight: "bold" }}
            onPress={() => {
              store.toggleLike(id)
            }}
          />
          <View style={{ width: 30 }} />
          <Button
            text={buttonStr}
            style={{ backgroundColor: btnColor, flex: 1 }}
            textStyle={{ fontSize: 14, fontWeight: "bold" }}
            onPress={onPress}
          />
        </View>
      </ScrollView>
    </Screen>
  )
})
