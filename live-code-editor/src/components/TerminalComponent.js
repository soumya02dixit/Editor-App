import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

function TerminalComponent({ isDarkMode }) {
    const terminalRef = useRef(null);
    const containerRef = useRef(null);
    const commandBuffer = useRef(""); // Stores user input

    useEffect(() => {
        if (terminalRef.current) return; // Prevent multiple instances

        terminalRef.current = new Terminal({
            theme: {
                background: isDarkMode ? "#1e1e1e" : "#ffffff",
                foreground: isDarkMode ? "#ffffff" : "#000000",
            },
            cursorBlink: true,
            rows: 10,
        });

        terminalRef.current.open(containerRef.current);
        terminalRef.current.write("Welcome to the terminal!\r\n$ ");

        // Handle input
        terminalRef.current.onData(handleInput);
    }, [isDarkMode]);

    const handleInput = (data) => {
        if (!terminalRef.current) return;

        if (data === "\r") { // Enter key
            const command = commandBuffer.current.trim();
            commandBuffer.current = ""; // Clear buffer
            terminalRef.current.write("\r\n");

            if (command.startsWith("generate ")) {
                const prompt = command.slice(9);
                generateContent(prompt);
            } else if (command === "clear") {
                terminalRef.current.clear();
                terminalRef.current.write("$ ");
            } else {
                terminalRef.current.write(`Command not found: ${command}\r\n$ `);
            }
        } else if (data === "\u007F") { // Backspace key
            if (commandBuffer.current.length > 0) {
                commandBuffer.current = commandBuffer.current.slice(0, -1);
                terminalRef.current.write("\b \b");
            }
        } else {
            commandBuffer.current += data;
            terminalRef.current.write(data);
        }
    };

    const generateContent = async (prompt) => {
        const genAI = new GoogleGenerativeAI("AIzaSyCKw-TCAJ_uzSbKUGb29OMIruDFqSLqhTY"); // Replace with actual API key
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        try {
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            terminalRef.current.write(`\r\nGenerated: ${responseText}\r\n$ `);
        } catch (error) {
            console.error("Error generating content:", error);
            terminalRef.current.write("\r\nError generating content\r\n$ ");
        }
    };

    return (
        <div 
            ref={containerRef} 
            style={{ 
                height: "200px", 
                backgroundColor: "#000", 
                padding: "10px",
                overflow: "hidden" 
            }} 
        />
    );
}

export default TerminalComponent;




