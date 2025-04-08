import React from 'react';

export default function CustomToolbar({ label, onNavigate, onView }) {
  const navigate = (action) => {
    onNavigate(action);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }}>
      <span style={{ fontSize: '1.4rem', fontWeight: '600' }}>{label}</span>
      <div>
        <button
          onClick={() => navigate('PREV')}
          className="btn btn-dark btn-sm me-2"
        >
          Edellinen
        </button>
        <button
          onClick={() => navigate('TODAY')}
          className="btn btn-dark btn-sm me-2"
        >
          Tänään
        </button>
        <button
          onClick={() => navigate('NEXT')}
          className="btn btn-dark btn-sm"
        >
          Seuraava
        </button>
      </div>
    </div>
  );
}