import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { reduxUserFront } from "@/types/users"
import { RootState } from "@/redux/store"

// Define the initial state using that type
const initialState: reduxUserFront = {
  email: "",
  status: ""
}

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //use this for constant
    resetUser: (state) => {
      state.email = ""
      state.status = ""
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    }
  }
})

const { actions, reducer } = userSlice
// export actions and reducer
export const { resetUser, changeEmail } = actions
export default reducer

// Other code such as selectors can use the imported `RootState` type
export const selectEmail = (state: RootState) => state.user.email
