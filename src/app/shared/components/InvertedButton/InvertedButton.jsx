/**
 * React
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Estils
 */
import './InvertedButton.css';

/**
 * Component del botó invertit. Pot contenir una URL, una acció o un text.
 * @param {object} props - Propietats del component.
 * @param {string} props.text - Text del botó.
 * @param {string} props.url - URL a la qual enllaça el botó (si es tracta d'un enllaç).
 * @param {function} props.action - Funció que s'executa en fer clic al botó (si es tracta d'un botó d'acció).
 * @param {boolean} props.isLink - Indica si el botó és un enllaç.
 * @param {string} props.className - Classes CSS addicionals per al botó.
 * @returns {JSX.Element} Component del botó invertit.
 */
export function InvertedButton({
    text,
    url,
    action,
    isLink,
    className = 'inverted__primary-button',
}) {
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
}
