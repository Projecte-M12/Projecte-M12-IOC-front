import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';
import { Card } from './components/card/Card';
import { getCompanies } from '../../services/getCompanies';
import { getServices } from '../../services/getServices';
// import Modal from 'react-modal';
import './Homepage.scss';
import { useState } from 'react';
import CustomModal from './components/modal/Modal';
import { Navigate } from 'react-big-calendar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useCheckUser } from '../../hooks/useCheckUser';

// import {useGetImage} from "../../hooks/customHooks/useGetImage";

export const Homepage = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const companies = getCompanies();
    const services = getServices();

    const { user, isAuthenticated } = useAuthContext();
    const { checkToken } = useCheckUser();

    useEffect(() => {
        checkToken();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const openModal = (company) => {
        setSelectedCompany(company);
    };

    const closeModal = () => {
        setSelectedCompany(null);
    };

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category),
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredCompanies =
        selectedCategories.length > 0
            ? companies.filter((company) =>
                  company.category.some((c) => selectedCategories.includes(c)),
              )
            : companies;

    return (
        <>
            <Header />
            <p className="homepage__title">
                Aquests son els serveis que pots reservar
            </p>

            <div className="homepage__filter">
                <div className="homepage__filterTitle">
                    Filtrar per categoria
                </div>
                <div className="homepage__filterCategories">
                    {services.map((category) => (
                        <label
                            key={category}
                            className="homepage__filterCategoriesLabel"
                        >
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="homepage__filterCategoriesInput"
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <div className="homepage__container">
                <ul>
                    {filteredCompanies.map((company) => {
                        return (
                            <li key={company.companyId} className="card">
                                <Card company={company} openModal={openModal} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Footer />
            <CustomModal company={selectedCompany} closeModal={closeModal} />
        </>
    );
};
