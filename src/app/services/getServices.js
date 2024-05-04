/**
 * Serveis
 */
import { getCompanies } from './getCompanies';

/**
 * Funció per obtenir els serveis oferts per les empreses de l'API.
 * @returns {Promise<Array>} Una promesa que resol amb un array de serveis.
 */
export const getServices = async () => {
    // TODO: Get data from API instead of mock file
    // const services = ['restaurant', 'nails', 'lawyer', 'haircut']
    const providers = await getCompanies();
    const services = [...new Set(providers.map((provider) => provider.service_provided))];

    return services;
};
