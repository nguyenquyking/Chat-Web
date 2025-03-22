import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../redux/store";
import { addMessage } from "../redux/messagesSlice";
import { ChatContact } from './ChatList';

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
  timestamp: string;
}

interface ChatWindowProps {
  activeChat: string | null;
  contacts: ChatContact[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, contacts }) => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const dispatch: AppDispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    dispatch(addMessage({
      text: input,
      isOutgoing: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const activeContact = contacts.find(c => c.id === activeChat);

  return (
    <div style={styles.chatWindow}>
      {activeChat ? (
        <>
          <div style={styles.chatHeader}>
            <div style={styles.chatHeaderInfo}>
              <img 
                src={activeContact?.avatar || ""} 
                alt={activeContact?.name || ""} 
                style={styles.chatHeaderAvatar} 
              />
              <span style={styles.chatHeaderName}>
                {activeContact?.name || ""}
              </span>
            </div>
            <div style={styles.chatHeaderActions}>
              <span style={styles.statusIndicator}>Status: Sale</span>
              <i className="fas fa-bell" style={styles.headerIcon}></i>
            </div>
          </div>
          
          <div style={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.messageBubble,
                  ...(msg.isOutgoing ? styles.outgoingMessage : styles.incomingMessage)
                }}
              >
                {!msg.isOutgoing && (
                  <img 
                    src={activeContact?.avatar || ""} 
                    alt="Avatar" 
                    style={styles.messageAvatar} 
                  />
                )}
                <div style={styles.messageContent}>
                  <p style={styles.messageText}>{msg.text}</p>
                  <span style={styles.messageTime}>{msg.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          
          <div style={styles.chatActions}>
            <button style={styles.actionButton}>REQUEST VISIT</button>
            <button style={styles.actionButton}>MAKE OFFER</button>
          </div>
          
          <div style={styles.inputContainer}>
            <button style={styles.emojiButton}>
              <i className="far fa-smile"></i>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </>
      ) : (
        <div style={styles.noChatSelected}>
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatWindow: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    marginLeft: "560px", // Width of sidebar (240px) + chatList (320px)
    position: "relative",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #f0f0f0",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  chatHeaderInfo: {
    display: "flex",
    alignItems: "center",
  },
  chatHeaderAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
  },
  chatHeaderName: {
    fontWeight: 500,
    fontSize: "16px",
  },
  chatHeaderActions: {
    display: "flex",
    alignItems: "center",
  },
  statusIndicator: {
    marginRight: "15px",
    fontSize: "14px",
    color: "#6b7280",
  },
  headerIcon: {
    fontSize: "18px",
    color: "#9da0b6",
  },
  chatMessages: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
  },
  messageBubble: {
    display: "flex",
    marginBottom: "15px",
    maxWidth: "70%",
  },
  incomingMessage: {
    alignSelf: "flex-start",
  },
  outgoingMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
    marginLeft: "auto",
  },
  messageAvatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  messageContent: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "10px 15px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  messageText: {
    margin: "0",
    fontSize: "14px",
  },
  messageTime: {
    display: "block",
    fontSize: "11px",
    color: "#9da0b6",
    marginTop: "4px",
    textAlign: "right",
  },
  chatActions: {
    display: "flex",
    justifyContent: "center",
    padding: "15px",
    borderTop: "1px solid #f0f0f0",
    backgroundColor: "#ffffff",
    gap: "10px",
  },
  actionButton: {
    padding: "8px 15px",
    borderRadius: "4px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderTop: "1px solid #f0f0f0",
    backgroundColor: "#ffffff",
    position: "sticky",
    bottom: 0,
  },
  emojiButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "18px",
    color: "#9da0b6",
    cursor: "pointer",
    marginRight: "10px",
  },
  input: {
    flex: 1,
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
  },
  sendButton: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#4c6ef5",
    border: "none",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
    cursor: "pointer",
  },
  noChatSelected: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9da0b6",
    fontSize: "16px",
  },
};

export default ChatWindow;