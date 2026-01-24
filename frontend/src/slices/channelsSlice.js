import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../routes.js'

const defaultChannelId = 1

export const fetchData = createAsyncThunk(
  'channels/fetchData',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('user'))
    const { data } = await axios.get(routes.dataPath(), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  },
)

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: defaultChannelId, loading: 'idle', error: null },
  reducers: {
    addChannel: (state, { payload }) => {
      console.log('[DEBUG] 3. ОБНОВЛЕНИЕ состояния Redux. Добавляем канал:', payload)
      state.channels.push(payload)
    },
    removeChannel: (state, { payload: id }) => {
      state.channels = state.channels.filter(c => c.id !== id)
      if (state.currentChannelId === id) {
        state.currentChannelId = defaultChannelId
      }
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find(c => c.id === payload.id)
      if (channel) {
        channel.name = payload.name
      }
    },
    setCurrentChannel: (state, { payload: id }) => {
      state.currentChannelId = id
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.channels = payload.channels
        state.currentChannelId = payload.currentChannelId
        state.loading = 'idle'
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error
      })
  },
})

export const {
  addChannel, removeChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions
export default channelsSlice.reducer
