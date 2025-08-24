import React, { useState, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';

function AddEmployee() {
  const [email, setEmail] = useState('');
  const { inviteEmployee, loading, error, successMessage, clearMessages } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const popupTimeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await inviteEmployee(email);
    if (result) {
      setShowPopup(true);
      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
        clearMessages();
      }, 2500);
    }
  };

  React.useEffect(() => {
    return () => {
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(60,72,88,0.12)',
        padding: '40px 32px',
        minWidth: 350,
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: 24,
          color: '#22223b',
          letterSpacing: '0.02em'
        }}>Add Employee</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Enter employee email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 8,
              border: '1px solid #e0e3ea',
              fontSize: '1rem',
              marginBottom: 18,
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={e => e.target.style.borderColor = '#4f8cff'}
            onBlur={e => e.target.style.borderColor = '#e0e3ea'}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 0',
              borderRadius: 8,
              border: 'none',
              background: loading
                ? 'linear-gradient(90deg, #b2bec3 0%, #636e72 100%)'
                : 'linear-gradient(90deg, #4f8cff 0%, #6c63ff 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.05rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(76,140,255,0.08)',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}
          >
            {loading ? 'Sending...' : 'Send Invite'}
          </button>
        </form>
        {error && (
          <div style={{
            color: '#e63946',
            background: '#fff0f0',
            borderRadius: 6,
            padding: '10px 16px',
            marginTop: 18,
            width: '100%',
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '0.98rem',
            boxShadow: '0 1px 4px rgba(230,57,70,0.07)'
          }}>
            {error}
          </div>
        )}
      </div>
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 32,
          right: 32,
          background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
          color: '#22223b',
          padding: '16px 32px',
          borderRadius: 10,
          boxShadow: '0 4px 16px rgba(67,233,123,0.15)',
          fontWeight: 600,
          fontSize: '1.1rem',
          zIndex: 1000,
          animation: 'fadeIn 0.5s'
        }}>
          <span style={{ marginRight: 8, fontSize: '1.3rem' }}>✅</span>
          {successMessage || 'email is sent'}
        </div>
      )}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default AddEmployee;
