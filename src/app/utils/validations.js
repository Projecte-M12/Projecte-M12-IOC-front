/**
 * Comprueba si el formato de email es correcto
 * @param { string } email
 * @returns  { boolean } isValidEmail - Returns true if
 */
export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

/**
 * Comprueba  si el formato de la contraseña es correcto
 * @param { string } password
 * @returns { boolean }
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
