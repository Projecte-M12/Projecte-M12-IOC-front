/**
 * React
 */
import { Link } from 'react-router-dom';

/**
 * Estils
 */
import './Button.css';

/**
 * Component del botó primari. Pots passar per peràmetre una url, una acció o un text.
 * @param {object} props - Propietats del component.
 * @param {string} props.text - Text del botó.
 * @param {string} props.url - URL del botó si és un enllaç.
 * @param {function} props.action - Acció del botó si és un botó d'acció.
 * @param {boolean} props.isLink - Indica si el botó és un enllaç.
 * @param {string} [props.className='primary-button'] - Classe CSS del botó.
 * @param {boolean} [props.disabled=false] - Indica si el botó està deshabilitat.
 * @returns {JSX.Element} Component del botó.
 */
export function Button({
    text,
    url,
    action,
    isLink,
    className = 'primary-button',
    disabled = false,
}) {
    const ButtonComponent = isLink ? Link : 'button';

    if (isLink) {
        return (
            <Link to={url} className={className}>
                <p className="text">{text}</p>
            </Link>
        );
    } else {
        return (
            <button className={className} onClick={action} disabled={disabled}>
                <p className="text">{text}</p>
            </button>
        );
    }
}
