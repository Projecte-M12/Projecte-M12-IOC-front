// Librerías
import React from "react";

// Import CSS
import './Loading.css';

// Import Imágenes
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


// Funció la qual genera la icona que simula la càrregar de la pàgina (actual)
export function Loading() {
    return (
        <div class='container'>
            <img rel="preload" class='icon' src={loading_icon} alt="Loading" />
        </div>
    );
}