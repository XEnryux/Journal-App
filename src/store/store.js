import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { journalSlice } from './journal'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal:journalSlice.reducer
  }
})