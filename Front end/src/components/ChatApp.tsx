import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatList, { ChatContact } from './ChatList';
import ChatWindow from './ChatWindow';

const ChatApp: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>("CHAT");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  // Sample contacts data
  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Hurin emar",
      avatar: "/avatars/1.jpg",
      lastMessage: "Save 8 pm",
      timestamp: "02 Feb",
      unread: true,
    },
    {
      id: "2",
      name: "Elish Roman",
      avatar: "/avatars/2.jpg",
      lastMessage: "early prototype of product",
      timestamp: "02 Feb",
      unread: true,
    },
    {
      id: "3",
      name: "Victor Erixon",
      avatar: "/avatars/3.jpg",
      lastMessage: "New Project for you",
      timestamp: "02 Feb",
      unread: true,
    },
    {
      id: "4",
      name: "Hati",
      avatar: "/avatars/4.jpg",
      lastMessage: "Welcome",
      timestamp: "02 Feb",
      unread: false,
    },
    {
      id: "5",
      name: "Jony Ive",
      avatar: "/avatars/5.jpg",
      lastMessage: "Hey",
      timestamp: "21 Jan",
      unread: false,
    },
    {
      id: "6",
      name: "Arashu zakia",
      avatar: "/avatars/6.jpg",
      lastMessage: "are you there?",
      timestamp: "21 Jan",
      unread: false,
    },
    {
      id: "7",
      name: "Sofiya",
      avatar: "/avatars/14.jpg",
      lastMessage: "meeting around 10 am",
      timestamp: "20 Jan",
      unread: false,
    },
    {
        id: "8",
        name: "John Smith",
        avatar: "/avatars/8.jpg",
        lastMessage: "Let's meet for coffee",
        timestamp: "19 Jan",
        unread: false,
      },
      {
        id: "9",
        name: "Emma Wilson",
        avatar: "/avatars/9.jpg",
        lastMessage: "Please send the documents",
        timestamp: "18 Jan",
        unread: true,
      },
      {
        id: "10",
        name: "Michael Brown",
        avatar: "/avatars/10.jpg",
        lastMessage: "Thanks for the help!",
        timestamp: "17 Jan",
        unread: false,
      },
      {
        id: "11",
        name: "Sarah Parker",
        avatar: "/avatars/11.jpg",
        lastMessage: "Did you check the presentation?",
        timestamp: "16 Jan",
        unread: true,
      },
      {
        id: "12",
        name: "Alex Johnson",
        avatar: "/avatars/12.jpg",
        lastMessage: "I'll be there in 10 minutes",
        timestamp: "15 Jan",
        unread: false,
      },
      {
        id: "13",
        name: "Priya Sharma",
        avatar: "/avatars/13.jpg",
        lastMessage: "The design looks amazing!",
        timestamp: "14 Jan",
        unread: false,
      },
      {
        id: "14",
        name: "David Chen",
        avatar: "/avatars/7.jpg",
        lastMessage: "Can we reschedule for tomorrow?",
        timestamp: "13 Jan",
        unread: true,
      },
      {
        id: "15",
        name: "Lisa Rodriguez",
        avatar: "/avatars/15.jpg",
        lastMessage: "Just sent you the files",
        timestamp: "12 Jan",
        unread: false,
      }
  ];

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.appWrapper}>
        <Sidebar 
          profileImage="/avatars/quynguyen.jpg"
          profileName="Jimi Hendrix"
          activeNav={activeNav}
          onNavChange={setActiveNav}
        />
        <ChatList 
          contacts={contacts}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
        />
        <ChatWindow 
          activeChat={activeChat}
          contacts={contacts}
        />
      </div>
    </div>
  );
};

const styles: {
  pageContainer: React.CSSProperties;
  appWrapper: React.CSSProperties;
} = {
  pageContainer: {
    width: "100%",
    height: "100vh",
    overflow: "hidden", // Prevent scrolling on the main container
    backgroundColor: "#f8f9fa",
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    position: "relative",
  },
  appWrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden", // Prevent scrolling on the wrapper
  },
};
export default ChatApp;