// import { getCompanies } from '../../../../services/getCompanies';
import './Card.scss';

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
