// Llibreris
import React from 'react';
import { Link } from 'react-router-dom';

// Estils CSS 
import './Button.css';

// Component del botó primari; pots passar; una url una acció o un text
export function Button({ text, url, action, isLink }) {
    const ButtonComponent = isLink ? Link : 'button';

    return (
        <ButtonComponent to={url} onClick={action}>
            <button class="primary-button">
                <p class="text">{text}</p>
            </button>
        </ButtonComponent>
    );
}

