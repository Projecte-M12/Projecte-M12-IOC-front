import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';
import { Card } from './components/card/Card';
import { getCompanies } from '../../services/getCompanies';
// import Modal from 'react-modal';
import './Homepage.scss';
import { useState } from 'react';
import CustomModal from './components/modal/Modal';

// import {useGetImage} from "../../hooks/customHooks/useGetImage";


export const Homepage = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const companies = getCompanies();

    const openModal = (company) => {
        setSelectedCompany(company);
    };

    const closeModal = () => {
        setSelectedCompany(null);
    };
    return (
        <>
            <Header />
            <h1>Homepage</h1>
            <p className="homepage__title">Welcome to ReservaNOW</p>

            <div className="homepage__container">
                <ul>
                    {companies.map((company) => {
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
