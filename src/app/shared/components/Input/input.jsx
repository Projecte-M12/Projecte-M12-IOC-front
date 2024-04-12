// Llibreris
import React from 'react';

// Estils 
import './Input.css';

// Funció 
export function Input() {
    return (
        <div class="input-group">
            <label class="label">text? </label>
            <input autocomplete="off" name="Email" id="Email" class="input" type="email" />
            <div></div>
        </div>
    );
}

