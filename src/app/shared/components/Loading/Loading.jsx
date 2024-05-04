/**
 * React
 */
import React from "react";

/**
 * Estils
 */
import './Loading.css';

/**
 * Imatges
 */
//TODO: import loading_icon from '';



/* 
EXEMPLE DE COM POT FUNCIONAR + ESTRUCTURA DEL CODI (COMPONENTS I PÀGINES):

    // Libreries
    import React, { useState, useEffect } from "react";

    // Components pròpis importats
    import { HeaderBar } from '';
    import { Footer } from '';
    import { Loading } from '';

    // Estils CSS
    import '';

    //---------------------------------------VARIABLES-------------------------------------------*

    // Control del loading
    const [loading, setLoading] = useState(true);

    //-------------------------------------USE EFFECT-------------------------------------------/

    //Càrrega del component
    useEffect(() => {

        //Hacer scroll al inicio de la pantalla
        window.scrollTo(0, 0)
        //Modificar titulo de la página
        document.title = "ReservaNow | NOM_PÀGINA";
        //Gestión del loading
        setTimeout(() => { setLoading(false); }, 1000)

    }, []);

*/

/**
 * Componente que muestra un icono de carga mientras se está cargando la página.
 * @returns {JSX.Element} Componente de carga.
 */
export function Loading() {
    return (
        <div class='container'>
            <img rel="preload" class='icon' src={loading_icon} alt="Loading" />
        </div>
    );
}