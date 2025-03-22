import React from 'react';

interface SidebarProps {
  profileImage: string;
  profileName: string;
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  profileImage, 
  profileName, 
  activeNav, 
  onNavChange 
}) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.profile}>
        <div style={styles.profileImageContainer}>
          <img 
            src={profileImage} 
            alt={profileName} 
            style={styles.profileImage} 
          />
        </div>
        <span style={styles.profileName}>{profileName}</span>
      </div>
      
      <nav style={styles.navigation}>
        {["PROPERTIES", "CHAT", "CALENDAR", "OFFERS", "DOCUMENTS", "SETTINGS"].map(nav => (
          <div 
            key={nav}
            style={{
              ...styles.navItem,
              ...(activeNav === nav ? styles.navItemActive : {})
            }}
            onClick={() => onNavChange(nav)}
          >
            <i className={`fas fa-${getIconForNav(nav)}`} style={styles.navIcon}></i>
            <span style={styles.navText}>{nav}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const getIconForNav = (nav: string): string => {
  switch(nav) {
    case "PROPERTIES": return "home";
    case "CHAT": return "comment";
    case "CALENDAR": return "calendar";
    case "OFFERS": return "tag";
    case "DOCUMENTS": return "file";
    case "SETTINGS": return "cog";
    default: return "question";
  }
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: "240px",
    backgroundColor: "#f0f0ff",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e0e0e0",
    height: "100vh",
    position: "fixed",
    overflowY: "auto",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px 20px",
    borderBottom: "1px solid #e0e0e0",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "10px",
  },
  profileImage: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  profileName: {
    fontWeight: 500,
    fontSize: "16px",
    textAlign: "center",
  },
  navigation: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  navItemActive: {
    backgroundColor: "#e6e6ff",
    borderLeft: "3px solid #5c6bc0",
  },
  navIcon: {
    fontSize: "18px",
    width: "24px",
    color: "#9da0b6",
  },
  navText: {
    marginLeft: "10px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#9da0b6",
    letterSpacing: "0.5px",
  },
};

export default Sidebar;