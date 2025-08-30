import { createServer, Model, Factory, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      user: Model,
      chatSession: Model,
      chatMessage: Model,
      policy: Model,
    },

    factories: {
      user: Factory.extend({
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
      }),
      
      chatSession: Factory.extend({
        id: (i) => i + 1,
        title: (i) => `Chat Session ${i + 1}`,
        createdAt: () => new Date().toISOString(),
        updatedAt: () => new Date().toISOString(),
      }),

      chatMessage: Factory.extend({
        id: (i) => i + 1,
        content: 'Sample message content',
        role: 'user',
        timestamp: () => new Date().toISOString(),
      }),
    },

    seeds(server) {
      // Create some initial data
      server.create('user', { email: 'admin@example.com', name: 'Admin User', role: 'ADMIN' });
      server.createList('chatSession', 3);
    },

    routes() {
      this.namespace = 'api';

      // Auth routes
      this.post('/auth/send-otp', () => {
        return new Response(200, {}, 'OTP sent successfully');
      });

      this.post('/auth/register-admin', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return new Response(200, {}, {
          token: 'mock-auth-token-' + Date.now(),
          email: attrs.email,
          role: 'ADMIN',
          message: 'Registration successful'
        });
      });

      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        return new Response(200, {}, {
          token: 'mock-auth-token-' + Date.now(),
          email: email,
          role: 'ADMIN',
          message: 'Login successful'
        });
      });

      this.post('/auth/complete-registration', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return new Response(200, {}, {
          token: 'mock-auth-token-' + Date.now(),
          email: 'employee@example.com',
          role: 'EMPLOYEE',
          message: 'Registration completed'
        });
      });

      // Admin routes
      this.post('/admin/invite-user', () => {
        return new Response(200, {}, 'Invitation sent successfully');
      });

      this.get('/admin/employees', () => {
        return [
          {
            admin: { email: 'admin@example.com', name: 'Admin User' },
            employee: { email: 'employee@example.com', name: 'Employee User', role: 'EMPLOYEE' }
          }
        ];
      });

      this.get('/admin/analytics', () => {
        return {
          overallStats: {
            totalEmployees: 5,
            totalQueries: 150,
            safeQueries: 120,
            warningQueries: 25,
            severeQueries: 5,
            safePercentage: 80,
            warningPercentage: 16.7,
            severePercentage: 3.3
          },
          employeeAnalytics: [
            {
              employeeEmail: 'employee@example.com',
              employeeName: 'Employee User',
              totalQueries: 30,
              safeQueries: 25,
              warningQueries: 4,
              severeQueries: 1,
              safePercentage: 83.3,
              warningPercentage: 13.3,
              severePercentage: 3.3,
              lastQueryDate: new Date().toISOString()
            }
          ],
          recentSevereQueries: [],
          recentWarningQueries: [],
          dailyQueryCounts: {
            '2025-01-18': 10,
            '2025-01-19': 15,
            '2025-01-20': 20,
            '2025-01-21': 18,
            '2025-01-22': 22,
            '2025-01-23': 25,
            '2025-01-24': 30
          },
          weeklyQueryCounts: {
            'Week 01-03': 50,
            'Week 01-10': 75,
            'Week 01-17': 100,
            'Week 01-24': 150
          },
          monthlyQueryCounts: {
            '2024-08': 200,
            '2024-09': 180,
            '2024-10': 220,
            '2024-11': 190,
            '2024-12': 160,
            '2025-01': 150
          }
        };
      });

      this.get('/admin/analytics/employee/:email', () => {
        return {
          employeeEmail: 'employee@example.com',
          employeeName: 'Employee User',
          totalQueries: 30,
          safeQueries: 25,
          warningQueries: 4,
          severeQueries: 1,
          safePercentage: 83.3,
          warningPercentage: 13.3,
          severePercentage: 3.3,
          lastQueryDate: new Date().toISOString(),
          queryHistory: []
        };
      });

      this.post('/admin/policies', () => {
        return new Response(200, {}, 'Policies created successfully');
      });

      this.get('/admin/policies', () => {
        return {
          policies: [
            {
              id: 1,
              title: 'Data Privacy Policy',
              description: 'Guidelines for handling sensitive data',
              createdAt: new Date().toISOString()
            }
          ]
        };
      });

      // Chat routes
      this.post('/chat/sessions', (schema, request) => {
        const { title } = JSON.parse(request.requestBody);
        const session = schema.chatSessions.create({
          title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        return session;
      });

      this.get('/chat/sessions', (schema) => {
        return schema.chatSessions.all();
      });

      this.get('/chat/sessions/:id', (schema, request) => {
        const id = request.params.id;
        return schema.chatSessions.find(id);
      });

      this.get('/chat/sessions/:id/messages', (schema, request) => {
        const sessionId = request.params.id;
        return [
          {
            id: 1,
            sessionId,
            content: 'Hello, how can I help you?',
            role: 'assistant',
            timestamp: new Date().toISOString()
          }
        ];
      });

      this.delete('/chat/sessions/:id', () => {
        return new Response(204, {});
      });

      this.post('/ai/chat', (schema, request) => {
        const { prompt, sessionId } = JSON.parse(request.requestBody);
        
        // Simulate different response types based on prompt content
        if (prompt.toLowerCase().includes('hack') || prompt.toLowerCase().includes('malicious')) {
          return new Response(505, {}, {
            message: 'Query blocked due to policy violation'
          });
        }
        
        if (prompt.toLowerCase().includes('warning') || prompt.toLowerCase().includes('suspicious')) {
          return new Response(504, {}, {
            message: 'Query processed with warnings',
            userMessage: {
              id: Date.now(),
              content: prompt,
              role: 'user',
              timestamp: new Date().toISOString()
            },
            aiMessage: {
              id: Date.now() + 1,
              content: 'I understand your query, but please be cautious with this information.',
              role: 'assistant',
              timestamp: new Date().toISOString()
            }
          });
        }

        return new Response(200, {}, {
          userMessage: {
            id: Date.now(),
            content: prompt,
            role: 'user',
            timestamp: new Date().toISOString()
          },
          aiMessage: {
            id: Date.now() + 1,
            content: `This is a mock response to: "${prompt}"`,
            role: 'assistant',
            timestamp: new Date().toISOString()
          }
        });
      });
    },
  });
}