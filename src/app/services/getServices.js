import { getCompanies } from './getCompanies';

export const getServices = async () => {
    // TODO: Get data from API instead of mock file
    // const services = ['restaurant', 'nails', 'lawyer', 'haircut']
    const providers = await getCompanies();
    const services = [...new Set(providers.map((provider) => provider.service_provided))];

    return services;
};
