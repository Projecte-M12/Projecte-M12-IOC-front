import { getCompanies } from "../../../../services/getCompanies";
import "./Card.scss";

export const Card = () => {
  //   const { company } = useFilterCompanyById(companyId);
  const companies = getCompanies();
  return (
    <>
      <div className="card">
        <ul>
          {companies.map((company) => {
            return (
              <li key={company.companyId}>
                <p>Company: {company.companyName}</p>
                <div className="card__image">
                  <img src={company.srcImages.small} alt="" />
                </div>
                <p>Category: {company.category}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
