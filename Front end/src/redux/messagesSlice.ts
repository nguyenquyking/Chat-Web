import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
  timestamp: string;
}

interface MessagesState {
  messages: Message[];
  activeChat: string | null;
}

const initialState: MessagesState = {
  messages: [
    {
      id: "1",
      text: "We invite you at our office for visit",
      isOutgoing: false,
      timestamp: "10:00"
    },
    {
      id: "2",
      text: "Welcome",
      isOutgoing: false,
      timestamp: "10:05"
    },
    {
      id: "3",
      text: "It's like dream come true thank you so much",
      isOutgoing: true,
      timestamp: "10:10"
    }
  ],
  activeChat: null
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, "id">>) => {
      const newMessage = {
        id: Date.now().toString(),
        ...action.payload
      };
      state.messages.push(newMessage);
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    }
  }
});

export const { addMessage, setActiveChat } = messagesSlice.actions;
export default messagesSlice.reducer;