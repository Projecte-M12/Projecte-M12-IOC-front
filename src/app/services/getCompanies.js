/**
 * Utils
 */
import { API_BASE_URL, EDPOINT } from '../utils/constants';

/**
 * Funció per obtenir les dades de totes les empreses de l'API.
 * @returns {Promise<Array>} Una promesa que resol amb un array d'empreses.
 */
export const getCompanies = () => {
    // TODO: Get data from API instead of mock file
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    const companies = fetch(API_BASE_URL + EDPOINT.PROVIDERS, options)
        .then((response) => response.json())

    return companies;
};
