/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from "react"
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
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { Screen, Text, AppBar, ReadListCard } from "../../components"
import IssueStore from "../../models/issue-store/issue-store"
import { color, ID } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const List: ViewStyle = {
  padding: 16,
}
const ACTIVITY: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignContent: "center",
}

const TEXT: TextStyle = {
  color: color.palette.black,
}

export const ReadListScreen = observer(function ReadListScreen({ drawerNavigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook

  useEffect(() => {
    async function getIssues() {
      await IssueStore.fetchIssues(ID)
    }
    getIssues()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <ReadListCard
        id={item.bookid}
        image={item.image}
        name={item.name}
        issueDate={item.issuedate}
        returnDate={item.returndate}
        returned={item.returned}
        fine={item.fine}
      />
      //    <Card id={id} image={image}>
      //    <View style={TEXT}>
      //   <Text style={TITLE} numberOfLines={2}>
      //     {item.name}
      //   </Text>

      //   <Text style={YEAR}>200</Text>
      //   <Text style={YEAR}>author</Text>
      //   <View style={{ height: 5 }}></View>
      //   <Button title="Remove" onPress={null} color={color.primary} />
      // </View>
      //    </Card>
      // <TouchableOpacity
      //   style={CARD}
      //   activeOpacity={1}
      //   onPress={() =>
      //     navigation.navigate("view", {
      //       id: item.id,
      //     })
      //   }
      // >
      //   <View style={TEXT}>
      //     <Text style={TITLE} numberOfLines={2}>
      //       {item.name}
      //     </Text>

      //     <Text style={YEAR}>200</Text>
      //     <Text style={YEAR}>author</Text>
      //     <View style={{ height: 5 }}></View>
      //     <Button title="Remove" onPress={null} color={color.primary} />
      //   </View>

      //   <Image source={{ uri: item.image }} style={IMAGE} />
      // </TouchableOpacity>
    )
  }
  console.log(IssueStore.issues)
  return (
    <Screen style={ROOT} preset="fixed">
      <AppBar title="Read List" onPress={() => drawerNavigation.openDrawer()} />
      {IssueStore.state === "pending" ? (
        <View style={ACTIVITY}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : IssueStore.state === "done" ? (
        <FlatList
          data={IssueStore.issues}
          renderItem={renderItem}
          keyExtractor={(item) => item.bookid + " " + item.userid}
          contentContainerStyle={List}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={IssueStore.state === "pending"}
              onRefresh={async () => {
                await IssueStore.fetchIssues(ID)
              }}
            />
          }
        />
      ) : (
        <View style={ACTIVITY}>
          <Text style={TEXT}>Error To Load Data</Text>
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
