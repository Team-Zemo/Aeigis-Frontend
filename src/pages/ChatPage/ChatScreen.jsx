import React, { useState, useEffect, useRef } from 'react';
import { chatAPI } from './api.js';
import { useAuthStore } from '../../store/authStore';

// Icons (using simple SVG icons to avoid external dependencies)
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

function ChatScreen() {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef(null);
  const { user, logout } = useAuthStore();

  // Load sessions on component mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSessions = async () => {
    try {
      setLoading(true);
      const sessionsData = await chatAPI.getUserChatSessions();
      setSessions(sessionsData || []);
    } catch (err) {
      setError('Failed to load chat sessions');
      console.error('Error loading sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (sessionId) => {
    try {
      setLoading(true);
      const messagesData = await chatAPI.getSessionMessages(sessionId);
      
      // Map messages based on index and ensure proper timestamp field
      const mappedMessages = (messagesData || []).map((message, index) => ({
        ...message,
        sender: (index % 2 === 0) ? 'user' : 'ai', // 0, 2, 4... = user; 1, 3, 5... = ai
        timestamp: message.timestamp || message.createdAt || message.created_at || message.sentAt || new Date().toISOString()
      }));
      
      setMessages(mappedMessages);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNewSession = async () => {
    if (!newSessionTitle.trim()) return;

    try {
      setLoading(true);
      const session = await chatAPI.createChatSession(newSessionTitle.trim());
      setSessions(prev => [session, ...prev]);
      setCurrentSession(session);
      setMessages([]);
      setNewSessionTitle('');
      setShowNewSessionForm(false);
    } catch (err) {
      setError('Failed to create new session');
      console.error('Error creating session:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectSession = async (session) => {
    setCurrentSession(session);
    await loadMessages(session.id);
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this session?')) return;

    try {
      await chatAPI.deleteChatSession(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId));

      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
        setMessages([]);
      }
    } catch (err) {
      setError('Failed to delete session');
      console.error('Error deleting session:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentSession || sendingMessage) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setSendingMessage(true);

    try {
      const response = await chatAPI.sendChatMessage(messageText, currentSession.id);

      if (response.success) {
        // Add both user and AI messages
        const newMessages = [];

        if (response.userMessage) {
          newMessages.push({
            id: response.userMessage.id || Date.now(),
            content: response.userMessage.content || messageText,
            sender: 'user',
            timestamp: response.userMessage.timestamp || response.userMessage.createdAt || new Date().toISOString(),
            riskLevel: response.riskLevel
          });
        }

        if (response.aiMessage) {
          newMessages.push({
            id: response.aiMessage.id || Date.now() + 1,
            content: response.aiMessage.content || response.aiMessage.response,
            sender: 'ai',
            timestamp: response.aiMessage.timestamp || response.aiMessage.createdAt || new Date().toISOString(),
            riskLevel: response.riskLevel
          });
        }

        setMessages(prev => [...prev, ...newMessages]);
      } else {
        // Handle blocked message
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: messageText,
          sender: 'user',
          timestamp: new Date().toISOString(),
          riskLevel: response.riskLevel,
          blocked: true,
          blockReason: response.message
        }]);
      }
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/home/enterprise';
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'safe': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'severe': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'warning': return <WarningIcon />;
      case 'severe': return <ErrorIcon />;
      default: return null;
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Invalid time';
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Invalid time';
    }
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Sessions */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Chat Sessions</h2>
                <button
                  onClick={() => setShowNewSessionForm(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="New Session"
                >
                  <PlusIcon />
                </button>
              </div>

              {/* User info */}
              <div className="mt-3 text-sm text-gray-600">
                Welcome, {user?.email || 'Employee'}
              </div>
            </>
          )}

          {sidebarCollapsed && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowNewSessionForm(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="New Session"
              >
                <PlusIcon />
              </button>
            </div>
          )}
        </div>

        {/* New Session Form */}
        {showNewSessionForm && !sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              placeholder="Enter session title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && createNewSession()}
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={createNewSession}
                disabled={!newSessionTitle.trim() || loading}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewSessionForm(false);
                  setNewSessionTitle('');
                }}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {loading && sessions.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className={`p-4 text-center text-gray-500 ${sidebarCollapsed ? 'px-2' : ''}`}>
              <div className="flex justify-center mb-2">
                <MessageIcon />
              </div>
              {!sidebarCollapsed && (
                <>
                  <p className="mt-2">No chat sessions yet</p>
                  <p className="text-xs">Create a new session to get started</p>
                </>
              )}
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => selectSession(session)}
                className={`${sidebarCollapsed ? 'p-2' : 'p-4'} border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  currentSession?.id === session.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                title={sidebarCollapsed ? session.title || `Session ${session.id}` : ''}
              >
                {sidebarCollapsed ? (
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                      {(session.title || 'S').charAt(0).toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {session.title || `Session ${session.id}`}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(session.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => deleteSession(session.id, e)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Session"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Sidebar controls */}
        <div className="p-4 border-t border-gray-200">
          {!sidebarCollapsed ? (
            <div className="flex gap-2">
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="flex-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                title="Collapse Sidebar"
              >
                ←
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                title="Logout"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Expand Sidebar"
              >
                →
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogoutIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {currentSession.title || `Session ${currentSession.id}`}
                  </h1>
                  <p className="text-sm text-gray-500">
                    AI-powered conversation with safety monitoring
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading && messages.length === 0 ? (
                <div className="text-center text-gray-500">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageIcon />
                  </div>
                  <p className="mt-2 text-lg font-medium">Start a conversation</p>
                  <p className="text-sm">Your messages are monitored for safety and policy compliance</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl px-4 py-3 rounded-lg border-2 ${
                        message.sender === 'user'
                          ? `bg-blue-600 text-white ${getRiskLevelColor(message.riskLevel).replace('bg-', 'border-').replace('50', '600')}`
                          : `bg-white text-gray-900 ${getRiskLevelColor(message.riskLevel)}`
                      } ${message.blocked ? 'opacity-70' : ''}`}
                    >
                      {/* Risk indicator */}
                      {(message.riskLevel === 'warning' || message.riskLevel === 'severe') && (
                        <div className="flex items-center gap-2 mb-2 text-xs">
                          <span className={message.riskLevel === 'warning' ? 'text-yellow-600' : 'text-red-600'}>
                            {getRiskIcon(message.riskLevel)}
                          </span>
                          <span className={`font-medium ${message.riskLevel === 'warning' ? 'text-yellow-700' : 'text-red-700'}`}>
                            {message.riskLevel === 'warning' ? 'Policy Warning' : 'Blocked Content'}
                          </span>
                        </div>
                      )}

                      <p className="whitespace-pre-wrap">{message.content}</p>

                      {message.blocked && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                          <div className="flex items-center gap-1">
                            <ErrorIcon />
                            <strong>Message blocked:</strong>
                          </div>
                          <p className="mt-1">{message.blockReason}</p>
                        </div>
                      )}

                      <div className={`text-xs mt-2 flex items-center justify-between ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <span className="ml-2 text-xs">You</span>
                        )}
                        {message.sender === 'ai' && (
                          <span className="ml-2 text-xs">AI Assistant</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-3">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-32"
                  rows={1}
                  disabled={sendingMessage}
                  style={{
                    height: 'auto',
                    minHeight: '44px'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sendingMessage}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 self-end"
                >
                  {sendingMessage ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <SendIcon />
                  )}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>

              {/* Safety notice */}
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <span>🛡</span>
                <span>Messages are monitored for AI safety and policy compliance</span>
              </div>
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageIcon />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to AI Chat
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Select an existing session or create a new one to start chatting with AI assistance.
                All conversations are monitored for safety and compliance.
              </p>
              <button
                onClick={() => setShowNewSessionForm(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <PlusIcon />
                Create New Session
              </button>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Monitored</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Compliant</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-center gap-2">
            <ErrorIcon />
            <span className="flex-1">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatScreen;