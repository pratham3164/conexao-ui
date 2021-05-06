import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  RefreshControl,
  Button,
} from "react-native"

import { Screen, AppBar, BookCard } from "../../components"
import { FontAwesome as Icon } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import store from "../../models/book-store/book-store"
import IssueStore from "../../models/issue-store/issue-store"
import { color, ID } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

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

const TEXT2: TextStyle = {
  color: color.palette.black,
}
const YEAR: TextStyle = {
  color: color.lightText,
  fontSize: 14,
  fontWeight: "500",
}
const errorText: TextStyle = {
  color: color.palette.black,
}
// const OVERLAY: ViewStyle = {
//   position: "absolute",
//   backgroundColor: "#000",
//   top: 0,
//   flex: 1,
//   opacity: 0.1,
// }
const ACTIVITY: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
}
const List: ViewStyle = {
  padding: 8,
}

export const HomeScreen = observer(function HomeScreen({ drawerNavigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // const [books, setBooks] = useState([])
  // const [isLoading, setIsLoading] = useState([])
  // Pull in navigation via hook
  const navigation = useNavigation()
  useEffect(() => {
    async function getBooks() {
      await store.getBooks()
      await IssueStore.fetchIssues(ID)
    }
    // async function getIssues() {
    //   await IssueStore.fetchIssues(ID)
    // }
    // getIssues()
    getBooks()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={CARD}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("view", {
            id: item.id,
          })
        }
      >
        <View style={STACK}>
          <Image source={{ uri: item.image }} style={IMAGE} />

          <Icon
            name={item.liked ? "heart" : "heart-o"}
            size={28}
            style={ICON}
            onPress={() => store.toggleLike(item.id)}
          />
        </View>
        <View style={TEXT}>
          <Text style={TITLE} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={YEAR}>{item.year}</Text>
        </View>
      </TouchableOpacity>
      // <BookCard
      //   id={item.id}
      //   name={item.name}
      //   image={item.image}
      //   year={item.year}R
      //   liked={item.liked}
      // />
    )
  }
  // console.log("Books----------------------------------------------")
  console.log(store.books)
  return (
    <Screen style={ROOT} preset="fixed">
      <AppBar
        title="Home"
        onPress={
          null
          // () => drawerNavigation.openDrawer()
        }
      />
      {store.state === "pending" ? (
        <View style={ACTIVITY}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : store.state === "done" ? (
        <FlatList
          data={store.books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={List}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={store.state === "pending"}
              onRefresh={async () => {
                await store.getBooks()
              }}
            />
          }
        />
      ) : (
        <View style={ACTIVITY}>
          <Text style={TEXT2}>Error To Load Data</Text>
          <Button
            title={"Reload"}
            onPress={async () => {
              await IssueStore.fetchIssues(ID)
            }}
          />
        </View>
      )}
    </Screen>
  )
})
