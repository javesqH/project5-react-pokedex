import { configureStore } from '@reduxjs/toolkit'
import userNameSlice from './Slices/userName.slice'

export default configureStore({
  reducer: {
        userName: userNameSlice
	}
})