import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, Zap , Wallet } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Training", path: "/", icon: Home },
    { name: "History", path: "/history", icon: History },
    { name: "Settings", path: "/settings", icon: Zap },
    { name: "Wallet" , path:"/wallet" ,icon: Wallet  },
  ];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Animated Background Layers */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 40%, rgba(255, 28, 28, 0.12) 0%, transparent 60%)',
        animation: 'backgroundPulse 8s ease-in-out infinite',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 70% 60%, rgba(200, 0, 0, 0.08) 0%, transparent 60%)',
        animation: 'backgroundPulse 8s ease-in-out infinite 4s',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 28, 28, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 28, 28, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 0
      }} />

      {/* Navigation Sidebar */}
      <nav style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '280px',
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRight: '2px solid rgba(255, 28, 28, 0.25)',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), inset -1px 0 0 rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0',
        zIndex: 100,
        transition: 'all 0.3s ease'
      }}>
        {/* Logo/Brand */}
        <div style={{
          padding: '0 2rem',
          marginBottom: '3rem',
          animation: 'fadeInDown 0.6s ease-out'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ff1c1c 0%, #ffffff 40%, #ff1c1c 60%, #cc0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 0 20px rgba(255, 28, 28, 0.4))'
          }}>
            StrikeSense
          </h1>
          <p style={{
            fontSize: '0.75rem',
            color: '#999',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            AI PUNCH TRACKER
          </p>
        </div>

        {/* Menu Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '0 1rem',
          flex: 1
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: isActive 
                    ? 'linear-gradient(135deg, #ff1c1c, #cc0000)' 
                    : 'transparent',
                  border: isActive 
                    ? '2px solid #ff1c1c' 
                    : '2px solid transparent',
                  color: isActive ? '#fff' : '#999',
                  textDecoration: 'none',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  boxShadow: isActive 
                    ? '0 0 40px rgba(255, 28, 28, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4)' 
                    : 'none',
                  transform: isActive ? 'translateX(5px)' : 'translateX(0)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 28, 28, 0.1)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(255, 28, 28, 0.3)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#999';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <Icon 
                  size={20} 
                  style={{
                    color: isActive ? '#fff' : '#ff1c1c',
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 28, 28, 0.8))' : 'none'
                  }} 
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Decorative glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(180deg, rgba(255, 28, 28, 0.08), transparent)',
          pointerEvents: 'none'
        }} />
      </nav>

      {/* Main Content Area */}
      <main style={{
        marginLeft: '280px',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10,
        padding: '2rem'
      }}>
        {children}
      </main>

      <style>{`
        @keyframes backgroundPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          nav {
            width: 80px !important;
          }
          
          main {
            margin-left: 80px !important;
          }
          
          nav h1,
          nav p,
          nav span {
            display: none;
          }
          
          nav a {
            justify-content: center !important;
            padding: 1rem !important;
          }
        }

        @media (max-width: 640px) {
          nav {
            width: 100% !important;
            height: 70px !important;
            bottom: 0 !important;
            top: auto !important;
            flex-direction: row !important;
            padding: 0.5rem !important;
            border-right: none !important;
            border-top: 2px solid rgba(255, 28, 28, 0.25) !important;
          }
          
          main {
            margin-left: 0 !important;
            padding-bottom: 90px !important;
          }
          
          nav > div:first-child {
            display: none;
          }
          
          nav > div:nth-child(2) {
            flex-direction: row !important;
            width: 100% !important;
            padding: 0 !important;
            justify-content: space-around !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;