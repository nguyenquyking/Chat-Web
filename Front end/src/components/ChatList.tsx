import React from 'react';

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface ChatListProps {
  contacts: ChatContact[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ 
  contacts, 
  activeChat, 
  onChatSelect 
}) => {
  return (
    <div style={styles.chatList}>
      <div style={styles.chatListHeader}>
        <h2 style={styles.chatListTitle}>Chat</h2>
        <div style={styles.searchContainer}>
          <i className="fas fa-search" style={styles.searchIcon}></i>
          <input 
            type="text" 
            placeholder="Search" 
            style={styles.searchInput} 
          />
        </div>
      </div>
      
      <div style={styles.contactsList}>
        {contacts.map(contact => (
          <div 
            key={contact.id} 
            style={{
              ...styles.contactItem,
              ...(activeChat === contact.id ? styles.contactItemActive : {})
            }}
            onClick={() => onChatSelect(contact.id)}
          >
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              style={styles.contactAvatar} 
            />
            <div style={styles.contactInfo}>
              <div style={styles.contactNameRow}>
                <span style={styles.contactName}>{contact.name}</span>
                <span style={styles.contactTime}>{contact.timestamp}</span>
              </div>
              <p style={styles.contactLastMessage}>{contact.lastMessage}</p>
            </div>
            {contact.unread && <div style={styles.unreadIndicator}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatList: {
    width: "320px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: "240px",
    overflowY: "hidden",
    overflowX: "hidden", // Added this line to prevent horizontal scrolling
  },
  chatListHeader: {
    padding: "20px",
    borderBottom: "1px solid #f0f0f0",
  },
  chatListTitle: {
    margin: "0 0 15px 0",
    fontSize: "24px",
    fontWeight: 600,
  },
  searchContainer: {
    position: "relative",
    marginLeft: "0px",
    marginRight: "40px",
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9da0b6",
  },
  searchInput: {
    width: "100%",
    padding: "8px 10px 8px 35px",
    borderRadius: "20px",
    border: "none",
    fontSize: "14px",
    backgroundColor: "#f8f9fa",
  },
  locationHeader: {
    padding: "15px 20px",
    borderBottom: "1px solid #f0f0f0",
  },
  locationTitle: {
    margin: "0",
    fontSize: "16px",
    fontWeight: 500,
  },
  locationSubtitle: {
    margin: "5px 0 0",
    fontSize: "12px",
    color: "#9da0b6",
  },
  contactsList: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden", // Added this line to prevent horizontal scrolling
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    position: "relative",
  },
  contactItemActive: {
    backgroundColor: "#f0f0ff",
  },
  contactAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
    objectFit: "cover",
  },
  contactInfo: {
    flex: 1,
  },
  contactNameRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactName: {
    fontWeight: 500,
    fontSize: "14px",
  },
  contactTime: {
    fontSize: "12px",
    color: "#9da0b6",
  },
  contactLastMessage: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#6b7280",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "250px", // Added this to ensure text doesn't overflow container
  },
  unreadIndicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#ff6b6b",
    position: "absolute",
    right: "20px",
    top: "50%",
  },
};

export default ChatList;