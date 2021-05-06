/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Button } from "react-native"
import { observer } from "mobx-react-lite"
import { color, ID } from "../../theme"
import { Text } from "../"
import { Card } from "../../components"

import IssueStore from "../../models/issue-store/issue-store"

export interface ReadListCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  id: number
  image: string
  name: string
  issueDate: string
  returnDate: string
  returned: boolean
  fine: number
  style?: StyleProp<ViewStyle>
}

const TEXT2: TextStyle = {
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

const TEXT1: TextStyle = {
  color: color.lightText,
  fontSize: 14,
  fontWeight: "500",
}

/**
 * Describe your component here
 */
export const ReadListCard = observer(function ReadListCard(props: ReadListCardProps) {
  const { id, image, name, issueDate, returnDate, returned, fine } = props

  return (
    <Card id={id} image={image}>
      <View style={TEXT}>
        <Text style={TEXT2} numberOfLines={1}>
          {name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 7 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={TEXT1}>
              Issue Date:<Text style={TEXT2}>{issueDate.substring(0, 10)}</Text>
            </Text>
            <Text style={TEXT1}>
              return Date: <Text style={TEXT2}>{returnDate.substring(0, 10)}</Text>
            </Text>
          </View>
          {/* <View style={{ flexDirection: "column" }}>
            <Text style={TEXT1}>Fine:</Text>
            <Text style={TEXT2}>Rs 10</Text>
          </View> */}
        </View>
        <Button
          title={returned ? "Returned" : "Return"}
          onPress={
            returned
              ? () => null
              : () => {
                  console.log(id)
                  IssueStore.returnBook({ userId: 3, bookId: id, fine: 768 })
                }
          }
          color={color.primary}
        />
      </View>
    </Card>
  )
})
