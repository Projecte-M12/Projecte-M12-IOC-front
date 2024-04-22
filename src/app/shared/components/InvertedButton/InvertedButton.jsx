// Llibreris
import React from 'react';
import { Link } from 'react-router-dom';

// Estils CSS
import './InvertedButton.css';

// Component del botó primari; pots passar; una url una acció o un text
export function InvertedButton({
    text,
    url,
    action,
    isLink,
    className = 'inverted__primary-button',
}) {
    // const ButtonComponent = isLink ? Link : 'button';

    if (isLink) {
        return (
            <Link to={url} className={className}>
                <p className="inverted-text">{text}</p>
            </Link>
        );
    } else {
        return (
            <button className={className} onClick={action}>
                <p className="inverted-text">{text}</p>
            </button>
        );
    }

    // return (
    //     <ButtonComponent to={url} onClick={action}>
    //         <button className={className}>
    //             <p className="inverted-text">{text}</p>
    //         </button>
    //     </ButtonComponent>
    // );
}
