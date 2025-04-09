import React from 'react';

// Custom toolbar component for react-big-calendar
// Replaces the default toolbar with localized navigation buttons and a label
export default function CustomToolbar({ label, onNavigate, onView }) {
   // Calls the parent-provided navigation function with a specific action
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
        {/* Displays the current calendar label (e.g. April 2025) */}
      <span style={{ fontSize: '1.4rem', fontWeight: '600' }}>{label}</span>
      
         {/* Navigation buttons: Previous, Today, Next */}
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