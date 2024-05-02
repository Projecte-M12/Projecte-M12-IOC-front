// import Companies from '../mocks/COMPANY_MOCK_DATA.json';
import { API_BASE_URL, EDPOINT } from '../utils/constants';

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
