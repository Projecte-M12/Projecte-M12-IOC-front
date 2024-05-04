/**
 * React
 */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-big-calendar';

/**
 * Custom Hooks
 */
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCheckUser } from '../../hooks/useCheckUser';
import CustomModal from './components/modal/Modal';

/**
 * Serveis
 */
import { getCompanies } from '../../services/getCompanies';
import { getServices } from '../../services/getServices';

/**
 * Components pròpis
 */
import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';
import { Card } from './components/card/Card';

/**
 * Estils
 */
import './Homepage.css';

/**
 * Component que representa la pàgina d'inici.
 * Mostra els serveis disponibles per a reserva i permet filtrar-los per categoria.
 * @returns {JSX.Element} El component de la pàgina d'inici.
 */
export const Homepage = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const companies = getCompanies();

    const { user, isAuthenticated } = useAuthContext();
    const { checkToken } = useCheckUser();

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // setProviders(await getCompanies());
            setServicesList(await getServices());
            const comp = await getCompanies();
            setCompaniesList(comp);
        };
        fetchData();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    /**
    * Handler per obrir el modal amb els detalls d'una empresa.
    * @param {object} company La informació de l'empresa seleccionada.
    */
    const openModal = (company) => {
        setSelectedCompany(company);
    };

    /**
     * Handler per tancar el modal.
     */
    const closeModal = () => {
        setSelectedCompany(null);
    };

    /**
     * Handler per gestionar la selecció d'una categoria per filtrar.
     * @param {string} category La categoria seleccionada.
     */
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category),
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    /**
     * Filtra les empreses per les categories seleccionades.
     */
    const filteredCompanies =
        selectedCategories.length > 0
            ? companiesList.filter((company) =>
                selectedCategories.includes(company.service_provided),
            )
            : companiesList;

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
                    {servicesList.map((category) => (
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
                            <li key={company.id} className="card">
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
