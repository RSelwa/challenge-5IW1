import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { PlaceData } from "@/types/maps"
import type { reduxStatus, reduxUserFront } from "@/types/redux/user"
import { defaultLocation } from "@/constants/maps"
import type { RootState } from "@/redux/store"

// Define the initial state using that type
const initialState: reduxUserFront = {
  email: "",
  status: ["VISTOR"],
  searchPlace: {
    address: "",
    geometry: defaultLocation
  }
}

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //use this for constant
    resetUser: (state) => {
      state.email = initialState.email
      state.status = initialState.status
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    userLogged: (
      state,
      action: PayloadAction<{ email: string; status: reduxStatus[] }>
    ) => {
      state.email = action.payload.email
      state.status = action.payload.status
    },
    changeSearchPlace: (state, action: PayloadAction<PlaceData>) => {
      state.searchPlace = action.payload
    }
  }
})

const { actions, reducer } = userSlice
// export actions and reducer
export const { resetUser, changeEmail, userLogged, changeSearchPlace } = actions
export default reducer

// Other code such as selectors can use the imported `RootState` type
export const selectEmail = (state: RootState) => state.user.email
