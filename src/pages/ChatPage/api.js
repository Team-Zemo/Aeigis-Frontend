import { useAuthStore } from '../../store/authStore';

// Use relative URL for development with Vite proxy, fallback to direct URL for production
const BASE_URL = 'http://localhost:8080'

class ChatAPI {
    // Helper method to get auth headers
    getAuthHeaders() {
        const token = localStorage.getItem('authToken');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    // Helper method to get auth headers for form data
    getAuthHeadersFormData() {
        const token = localStorage.getItem('authToken');
        return {
            'Authorization': `Bearer ${token}`
        };
    }

    // 1. Create Chat Session
    async createChatSession(title) {
        try {
            const response = await fetch(`${BASE_URL}/api/chat/sessions`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ title })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating chat session:', error);
            throw error;
        }
    }

    // 2. Get User Chat Sessions
    async getUserChatSessions() {
        try {
            const response = await fetch(`${BASE_URL}/api/chat/sessions`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching chat sessions:', error);
            throw error;
        }
    }

    // 3. Get Specific Chat Session
    async getChatSession(sessionId) {
        try {
            const response = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching chat session:', error);
            throw error;
        }
    }

    // 4. Get Session Messages
    async getSessionMessages(sessionId) {
        try {
            const response = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}/messages`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching session messages:', error);
            throw error;
        }
    }

    // 5. Delete Chat Session
    async deleteChatSession(sessionId) {
        try {
            const response = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return true; // Success, no content returned
        } catch (error) {
            console.error('Error deleting chat session:', error);
            throw error;
        }
    }

    // 6. Send Chat Message with AI Response
    async sendChatMessage(prompt, sessionId) {
        try {
            const response = await fetch(`${BASE_URL}/api/ai/chat`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    prompt: prompt,
                    sessionId: sessionId
                })
            });

            const data = await response.json();

            // Handle different response statuses
            if (response.status === 200) {
                // Safe query - normal response
                return {
                    success: true,
                    riskLevel: 'safe',
                    userMessage: data.userMessage,
                    aiMessage: data.aiMessage
                };
            } else if (response.status === 504) {
                // Warning - potential policy issues
                return {
                    success: true,
                    riskLevel: 'warning',
                    message: data.message,
                    userMessage: data.userMessage,
                    aiMessage: data.aiMessage
                };
            } else if (response.status === 505) {
                // Severe - query blocked
                return {
                    success: false,
                    riskLevel: 'severe',
                    message: data.message
                };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw error;
        }
    }

    // Batch operations

    // Get all data for a session (session info + messages)
    async getFullChatSession(sessionId) {
        try {
            const [session, messages] = await Promise.all([
                this.getChatSession(sessionId),
                this.getSessionMessages(sessionId)
            ]);

            return {
                ...session,
                messages
            };
        } catch (error) {
            console.error('Error fetching full chat session:', error);
            throw error;
        }
    }

    // Create session and send first message
    async createSessionAndSendMessage(title, firstMessage) {
        try {
            const session = await this.createChatSession(title);
            const response = await this.sendChatMessage(firstMessage, session.id);

            return {
                session,
                messageResponse: response
            };
        } catch (error) {
            console.error('Error creating session and sending message:', error);
            throw error;
        }
    }
}

// Create and export singleton instance
export const chatAPI = new ChatAPI();

// Export individual methods for convenience
export const {
    createChatSession,
    getUserChatSessions,
    getChatSession,
    getSessionMessages,
    deleteChatSession,
    sendChatMessage,
    getFullChatSession,
    createSessionAndSendMessage
} = chatAPI;

export default chatAPI;