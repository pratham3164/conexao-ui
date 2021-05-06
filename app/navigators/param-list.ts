import { PrimaryParamList } from "./"

import { RouteProp } from "@react-navigation/native"

type ViewScreenRouteProp = RouteProp<PrimaryParamList, "view">

export type ViewScreenProps = {
  route: ViewScreenRouteProp
}
