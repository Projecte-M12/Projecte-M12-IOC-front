/**
 * Comprova si el format de l'email és correcte
 * @param { string } email
 * @returns  { boolean } Retorna true en cas de ser vàlid i false en cas contrari
 */
export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

/**
 * Comprova  si el format de la contrasenya és correcte
 * @param { string } password
 * @returns { boolean } Retorna true en cas de ser vàlid i false en cas contrari
 */
export const isValidPassword = (password) => {
    // SOLO TEST
    const passwordRegex = /^.{4,}$/;

    // PARA PRODUCCIÓN
    // 1 dígito, 1 majúscula, 1 minúscula, 1 especial, 8 o más caracteres
    // const passwordRegex =
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};
