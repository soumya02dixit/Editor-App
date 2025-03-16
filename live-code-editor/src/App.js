import React, { useState } from 'react';
import Editor from './components/Editor';
import TerminalComponent from './components/TerminalComponent';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh', 
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff', 
            color: isDarkMode ? '#ffffff' : '#000000',
            padding: '20px'
        }}>
            {/* Header Section */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                <h1>Live React Code Editor</h1>
                <button 
                    onClick={toggleTheme}
                    style={{
                        padding: '8px 12px',
                        background: isDarkMode ? '#ffffff' : '#333',
                        color: isDarkMode ? '#333' : '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontSize: '16px'
                    }}
                >
                    Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                </button>
            </div>

            {/* Code Editor */}
            <Editor isDarkMode={isDarkMode} />

            {/* Terminal */}
            <TerminalComponent isDarkMode={isDarkMode} />
        </div>
    );
}

export default App;
