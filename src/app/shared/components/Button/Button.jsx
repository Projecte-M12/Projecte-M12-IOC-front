// Llibreris
import { Link } from 'react-router-dom';

// Estils CSS
import './Button.css';

// Component del botó primari; pots passar; una url una acció o un text
export function Button({
    text,
    url,
    action,
    isLink,
    className = 'primary-button',
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
            <button className={className} onClick={action}>
                <p className="text">{text}</p>
            </button>
        );
    }
}
