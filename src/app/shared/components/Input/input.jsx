// Llibreris
import React from 'react';

// Estils 
import './Input.css';

// Funció 
export function Input({ label, type, placeholder, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className='input-group'>
            <label className='label'>{label}</label>
            <input
                placeholder={placeholder}
                onChange={handleChange}
                type={type}
            />
            <div></div>
        </div>
    );
}

