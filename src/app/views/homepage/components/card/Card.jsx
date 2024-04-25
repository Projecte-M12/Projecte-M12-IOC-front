// import { getCompanies } from '../../../../services/getCompanies';
import './Card.scss';

export const Card = ({ company, openModal }) => {
    const handleClick = () => {
        openModal(company);
    };
    return (
        <>
            <p>Company: {company.companyName}</p>
            <div className="card__image" onClick={handleClick}>
                <img src={company.srcImages.small} alt="" />
            </div>
            <p>Category: {company.category}</p>
        </>
    );
};
