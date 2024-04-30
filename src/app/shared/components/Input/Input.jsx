// Llibreris
import React from 'react';

// Estils
import './Input.css';

// Funció
export function Input({ label, type, placeholder, onChange, value }) {
    // const handleChange = (event) => {
    //     onChange(event.target.value);
    // };
    /* Lògica de handleChange com a prop en la call del component */
    return (
        <div className="input-group">
            {label && <label className="label">{label}</label>}
            <input
                className="input"
                placeholder={placeholder}
                onChange={onChange}
                type={type}
                value={value}
            />
        </div>
    );
}
