// Llibreris
import React from 'react';

// Estils 
import './Input.css';

// Funció 
export function Input({ label, type, placeholder, className, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div class='input-group'>
            <label class='label'>{label}</label>
            <input
                placeholder={placeholder}
                class='input'
                onChange={handleChange}
                type={type}
            />
            <div></div>
        </div>
    );
}

