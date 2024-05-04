/**
 * React
 */
import React from 'react';

/**
 * Estils
 */
import './Input.css';

/**
 * Component input personalitzat
 * @param {object} props - Propietats del component.
 * @param {string} props.label - Etiqueta de l'entrada.
 * @param {string} props.type - Tipus de l'entrada.
 * @param {string} props.placeholder - Text del marc de posició de l'entrada.
 * @param {function} props.onChange - Funció que es crida quan hi ha un canvi a l'entrada.
 * @param {string} props.value - Valor actual de l'entrada.
 * @returns {JSX.Element} Component d'entrada d'informació.
 */
export function Input({ label, type, placeholder, onChange, value }) {
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
