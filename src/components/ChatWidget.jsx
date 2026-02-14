
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const WEBHOOK_URL = 'https://cuisocsasddsad.app.n8n.cloud/webhook/9b75ff93-6dba-4c2c-8a10-9d577ca68bba1111';

const ChatWidget = () => {
    const { t, lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            { id: 1, text: t('chatInitialMessage'), sender: 'bot' }
        ]);
    }, [lang]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            // Assuming the webhook returns { output: "response text" } or similar. 
            // Adjusting based on common n8n patterns, often it returns just the JSON you set.
            // Let's assume it returns { response: "text" } or just check the payload.
            // For now, mapping broadly:
            const botText = data.output || data.response || data.message || data.text || "I received your message but couldn't process the response format.";

            const botMsg = { id: Date.now() + 1, text: botText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting to the server right now.",
                sender: 'bot',
                isError: true
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:scale-110 transition-transform z-40 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare className="text-white" size={24} />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} w-[90vw] md:w-[380px] h-[500px] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-colors duration-300`}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)] flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <h3 className="font-bold text-[var(--text-primary)]">{t('chatHeader')}</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-indigo-600 text-white rounded-br-none'
                                            : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-bl-none'
                                            } ${msg.isError ? 'border-red-500/50 text-red-200' : ''}`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[var(--bg-tertiary)] p-3 rounded-2xl rounded-bl-none border border-[var(--border-color)]">
                                        <Loader2 size={16} className="animate-spin text-indigo-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder={t('chatPlaceholder')}
                                    className={`w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-xl py-3 ${lang === 'ar' ? 'pr-4 pl-12' : 'pl-4 pr-12'} text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 border border-[var(--border-color)] placeholder-[var(--text-muted)]`}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim() || isTyping}
                                    className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                                >
                                    <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                                </button>
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)] text-center mt-2">
                                Protected by reCAPTCHA & Privacy Policy
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
