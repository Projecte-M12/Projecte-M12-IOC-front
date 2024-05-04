/**
 * Estils
 */
import './Card.scss';

/**
 * Component que representa una targeta per mostrar la informació d'una empresa.
 * @param {object} props Les propietats del component.
 * @param {object} props.company La informació de l'empresa a mostrar.
 * @param {Function} props.openModal Funció per obrir el modal amb els detalls de l'empresa.
 * @returns {JSX.Element} El component de la targeta d'empresa.
 */
export const Card = ({ company, openModal }) => {
    const handleClick = () => {
        openModal(company);
    };
    return (
        <>
            <p>Company: {company.company_name}</p>
            <div className="card__image" onClick={handleClick}>
                <img src={company.image_url} alt="" />
            </div>
            <p>Category: {company.service_provided}</p>
        </>
    );
};
