// Llibreris
import React from 'react';
import { Link } from 'react-router-dom';

// Estils CSS 
import './Button.css';

// Component del botó primari; pots passar; una url una acció o un text
export function Button({ text, url, action, isLink, className = "primary-button"}) {
    const ButtonComponent = isLink ? Link : 'button';

    return (
        <ButtonComponent to={url} onClick={action}>
            <button className={className}>
                <p className="text">{text}</p>
            </button>
        </ButtonComponent>
    );
}

