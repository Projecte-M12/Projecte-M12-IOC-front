/**
 * Comprova si el format de l'email és correcte
 * @param { string } email Correu a comprovar
 * @returns  { boolean } Retorna true en cas de ser vàlid i false en cas contrari
 */
export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

/**
 * Comprova  si el format de la contrasenya és correcte
 * @param { string } password Contrassenya a comprovar
 * @returns { boolean } Retorna true en cas de ser vàlid i false en cas contrari
 */
export const isValidPassword = (password) => {
    // Només per TEST
    const passwordRegex = /^.{4,}$/;

    // Funcionament
    // 1 dígit, 1 majúscula, 1 minúscula, 1 especial, 8 o més caràcteres
    // const passwordRegex =
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};
