// Función para manejar la selección de "Costos" y actualizar Tipificación N3
const handleInformacionPopup = () => {
    const costosCheckbox = document.getElementById('costos');
    const tipificacionN3 = document.getElementById('tipificacionn3');
    const tipificacionN3Container = document.getElementById('tipificacionn3-container');
    const tipificacionN3Label = document.getElementById('tipificacionn3-label'); // Asegúrate de que el label tenga este ID
    const defaultLabel = "Detalles de subtipificación *"; // Título por defecto

    // Escuchar el cambio del checkbox de "Costos"
    const actualizarSubtipificacion = () => {
        if (costosCheckbox && costosCheckbox.checked) {
            // Actualizar Tipificación N3 con las opciones "Financiamiento" y "Alternativas de pago"
            tipificacionN3.innerHTML = `
                <option value="" disabled selected>Selecciona</option>
                <option value="financiamiento">Financiamiento</option>
                <option value="alternativas_pago">Alternativas de pago</option>
            `;
            tipificacionN3Container.style.display = 'block';
            tipificacionN3Label.innerText = "Opciones asociadas a Costos *";
        } else {
            // Restaurar las opciones por defecto y el título
            tipificacionN3.innerHTML = '<option value="" disabled selected>Selecciona</option>';
            tipificacionN3Container.style.display = 'none';
            tipificacionN3Label.innerText = defaultLabel;
        }
    };

    // Ejecutar la función de actualización cuando el checkbox cambie
    costosCheckbox.addEventListener('change', actualizarSubtipificacion);

    // Forzar la actualización al inicializar (en caso de que haya valores preseleccionados)
    actualizarSubtipificacion(); // Llamar a la función al inicializar
};

// Función para ocultar "Opciones asociadas a Costos" cuando cambia Tipificación de respuesta
const handleTipificacionRespuestaChange = () => {
    const tipificacionRespuesta = document.getElementById("tipificacionn1");
    const tipificacionN3Container = document.getElementById('tipificacionn3-container');
    const tipificacionN3Label = document.getElementById('tipificacionn3-label');
    const defaultLabel = "Detalles de subtipificación *"; // Título por defecto

    tipificacionRespuesta.addEventListener('change', () => {
        // Ocultar el contenedor Tipificación N3 y restaurar el título por defecto si cambia la opción
        tipificacionN3Container.style.display = 'none';
        tipificacionN3Label.innerText = defaultLabel;

        // También limpiar el contenido de las opciones de Tipificación N3
        document.getElementById('tipificacionn3').innerHTML = '<option value="" disabled selected>Selecciona</option>';
    });
};

// Función para mostrar las opciones en un <select> y asegurar que el contenedor sea visible
const mostrarOpciones = (selectId, options) => {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
        selectElement.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            ${options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
        `;
        selectElement.parentElement.parentElement.style.display = 'block'; // Mostrar el contenedor que envuelve al select
    }
};

// Función para ocultar popups relacionados
const ocultarTodosLosPopups = () => {
    const popups = [
        'documentos-popup',
        'documentos-container',
        'seguimiento-popup',
        'seguimiento-container',
        'documentos-sin-apostillar-popup',
        'documentos-sin-documento-popup',
        'documentos-sin-apostillar-container',
        'documentos-sin-documento-container',
        'informacion-popup',
        'informacion-container'
    ];

    popups.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
};

// Función para ocultar Tipificación 1, 2, 3 y limpiar sus selecciones
const ocultarTipificaciones = () => {
    const tipificacionn1Container = document.getElementById('tipificacionn1-container');
    const tipificacionn2Container = document.getElementById('tipificacionn2-container');
    const tipificacionn3Container = document.getElementById('tipificacionn3-container');

    // Ocultar Tipificación 1, 2, y 3
    tipificacionn1Container.style.display = 'none';
    tipificacionn2Container.style.display = 'none';
    tipificacionn3Container.style.display = 'none';

    // Limpiar las opciones de Tipificación 1, 2 y 3
    document.getElementById('tipificacionn1').innerHTML = '';
    document.getElementById('tipificacionn2').innerHTML = '';
    document.getElementById('tipificacionn3').innerHTML = '';
};

// Función para reiniciar el campo statuslast
const reiniciarStatusFinal = () => {
    const statusFinalInput = document.getElementById('statuslast');
    statusFinalInput.value = '';  // Limpiar el campo statuslast
};

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    handleInformacionPopup(); // Manejar popup de información
    handleTipificacionRespuestaChange(); // Manejar cambios en Tipificación de respuesta
});


// Constantes para opciones de Tipo de contacto y Resultado 2
const CONTACTADO = 'contactado';
const NO_CONTACTADO = 'no_contactado';
const PRIMER_CONTACTO = 'primer_contacto';
const SEGUIMIENTO = 'seguimiento';
const SEGUIMIENTO_NO_CONTACTO = 'seguimiento_no_contacto'; // Nuevo valor para Seguimiento en No Contactado

const OPCIONES_PRIMER_CONTACTO = [
    { value: 'interesado', text: 'Interesado' },
    { value: 'no_interesado', text: 'No interesado' },
    { value: 'aplico_en_universidad', text: 'Aplicó en Universidad' }
];

const OPCIONES_SEGUIMIENTO_NO_EFECTIVO = [
    { value: 'no_efectivo', text: 'No efectivo' }
];

const OPCIONES_SEGUIMIENTO_NO_CONTACTO = [
    { value: 'no_contesta', text: 'No contesta' }
];

// Listener para Resultado 1 (maneja el flujo para "Contactado" y "No contactado")
document.getElementById('resultado1').addEventListener('change', function () {
    const selectedValue = this.value;
    const tipoContactoContainer = document.getElementById('tipocontacto').parentElement.parentElement;
    const tipoContacto = document.getElementById('tipocontacto');
    const resultado2Container = document.getElementById('resultado2-container');
    const resultado2 = document.getElementById('resultado2');

    if (selectedValue === CONTACTADO || selectedValue === NO_CONTACTADO) {
        // Mostrar Tipo de contacto y ocultar Resultado 2
        tipoContactoContainer.style.display = 'block';
        tipoContacto.disabled = false;
        resultado2Container.style.display = 'none';
        resultado2.value = '';

        // Opciones para Contactado y No Contactado
        if (selectedValue === CONTACTADO) {
            tipoContacto.innerHTML = `
                <option value="" disabled selected>Selecciona</option>
                <option value="primer_contacto">Primer contacto</option>
                <option value="seguimiento">Seguimiento</option>
            `;
        } else if (selectedValue === NO_CONTACTADO) {
            tipoContacto.innerHTML = `
                <option value="" disabled selected>Selecciona</option>
                <option value="${SEGUIMIENTO_NO_CONTACTO}">Seguimiento</option>
            `;
        }

        // Ocultar Tipificación y popups
        reiniciarStatusFinal();  // Reiniciar statuslast
        ocultarTipificaciones();
        ocultarTodosLosPopups();

    } else {
        // Ocultar ambos campos si no hay selección válida
        tipoContactoContainer.style.display = 'none';
        tipoContacto.value = '';
        resultado2Container.style.display = 'none';
        resultado2.value = '';
    }
});

// Listener para Tipo de contacto (maneja el flujo dentro de "Contactado" y "No contactado")
document.getElementById('tipocontacto').addEventListener('change', function () {
    const selectedValue = this.value;
    const resultado2Container = document.getElementById('resultado2-container');
    const resultado2 = document.getElementById('resultado2');
    const resultado1Value = document.getElementById('resultado1').value;

    // Ocultar y limpiar Resultado 2, Tipificaciones, y todos los popups si se cambia Tipo de contacto
    reiniciarStatusFinal();  // Reiniciar statuslast
    ocultarTipificaciones();
    ocultarTodosLosPopups();
    resultado2Container.style.display = 'none';
    resultado2.value = '';

    if (selectedValue === PRIMER_CONTACTO && resultado1Value === CONTACTADO) {
        // Mostrar las opciones de Resultado 2 para Primer Contacto
        mostrarOpciones('resultado2', OPCIONES_PRIMER_CONTACTO);
        resultado2Container.style.display = 'block';
    } else if (selectedValue === SEGUIMIENTO && resultado1Value === CONTACTADO) {
        // Mostrar las opciones de Resultado 2 para Seguimiento dentro de "Contactado"
        mostrarOpciones('resultado2', OPCIONES_SEGUIMIENTO_NO_EFECTIVO);
        resultado2Container.style.display = 'block';
    } else if (selectedValue === SEGUIMIENTO_NO_CONTACTO && resultado1Value === NO_CONTACTADO) {
        // Mostrar las opciones de Resultado 2 para Seguimiento dentro de "No Contactado"
        mostrarOpciones('resultado2', OPCIONES_SEGUIMIENTO_NO_CONTACTO);
        resultado2Container.style.display = 'block';
    } else {
        // Si no hay selección válida, se ocultan todos los campos relacionados
        resultado2Container.style.display = 'none';
        resultado2.value = '';
    }
});

// Función genérica para limpiar los checkboxes dentro de un contenedor
function limpiarCheckboxes(contenedorID) {
    document.querySelectorAll(`#${contenedorID} input[type="checkbox"]`).forEach(checkbox => {
        checkbox.checked = false; // Deseleccionar todas las opciones
    });
}


// Función para manejar el cambio en Tipificación N1 y actualizar Tipificación N2 y otros campos dependientes
const handleTipificacionN1Change = (tipificacionN2Options) => {
    const tipificacionN1 = document.getElementById('tipificacionn1');
    const tipificacionN2 = document.getElementById('tipificacionn2');
    const statusFinalInput = document.getElementById('statuslast');  // Input para Status Final
    const fechaEnvio = document.getElementById('fechaproxact');  // Input para Fecha de envío de comunicación
    const horaEnvio = document.getElementById('horaproxact');  // Input para Hora de envío de comunicación
    const informacionPopup = document.getElementById('informacion-popup');  // Popup de Solo buscaba información


    tipificacionN1.addEventListener('change', function () {
        const selectedText = this.options[this.selectedIndex].text;  // Obtener el texto de la opción seleccionada
        const selectedValue = this.value;  // Obtener el valor de la opción seleccionada (para Tipificación N2)

        // Dividir el texto por el guion medio y tomar la parte después del guion
        const partes = selectedText.split('-');
        const estadoFinal = partes.length > 1 ? partes[1].trim() : selectedText;  // Si hay guion, tomar la segunda parte

        // Actualizar Status Final con el estado derivado
        statusFinalInput.value = estadoFinal;

        // Reiniciar campos dependientes
        tipificacionN2.innerHTML = '<option value="" disabled selected>Selecciona</option>';
        document.getElementById('tipificacionn3').innerHTML = '<option value="" disabled selected>Selecciona</option>';
        document.getElementById('tipificacionn3-container').style.display = 'none';  // Ocultar Tipificación N3
        fechaEnvio.value = '';  // Limpiar el valor de la fecha
        horaEnvio.value = '';  // Limpiar el valor de la hora
        document.getElementById('descripcion').value = '';  // Limpiar la descripción
        guardarButton.disabled = true;  // Desactivar el botón de guardar hasta que se llenen los campos nuevamente

        // Si la opción seleccionada incluye "Lost / Hold", desactivar Fecha y Hora de envío de comunicación
        if (selectedText.includes("Lost / Hold")) {
            fechaEnvio.disabled = true;  // Deshabilitar Fecha de envío de comunicación
            fechaEnvio.value = '';  // Limpiar el valor del campo de fecha
            horaEnvio.disabled = true;  // Deshabilitar Hora de envío de comunicación
            horaEnvio.value = '';  // Limpiar el valor del campo de hora
            statusFinalInput.disabled = false;  // Asegurar que Status Final esté activo
        } else {
            fechaEnvio.disabled = false;  // Habilitar el campo de fecha
            horaEnvio.disabled = false;  // Habilitar el campo de hora
            statusFinalInput.disabled = true;  // Deshabilitar el campo Status Final si no es "Lost / Hold"
        }

        // Limpiar y ocultar Tipificación N2 y N3 al cambiar Tipificación N1
        tipificacionN2.innerHTML = '<option value="" disabled selected>Selecciona</option>';
        document.getElementById('tipificacionn3').innerHTML = '<option value="" disabled selected>Selecciona</option>';
        document.getElementById('tipificacionn3-container').style.display = 'none';  // Ocultamos Tipificación N3

        // Ocultar otros popups (excepto el popup de Solo buscaba información)
        ['documentos-popup', 'documentos-container', 'documentos-sin-apostillar-popup', 'documentos-sin-documento-popup',
            'documentos-sin-apostillar-container', 'documentos-sin-documento-container', 'informacion-popup', 'informacion-container']
            .forEach(id => {
                if (id !== 'informacion-popup') {  // No ocultar el popup de "Solo buscaba información"
                    document.getElementById(id).style.display = 'none';
                    limpiarCheckboxes(id);  // Limpiar los checkboxes de estos popups
                }
            });

        // Ocultar el popup de "Solo buscaba información" y limpiar los checkboxes si cambia de opción
        if (informacionPopup.style.display === 'block' && selectedValue !== 'solo_informacion') {
            informacionPopup.style.display = 'none';  // Ocultar el popup
            limpiarCheckboxes('informacion-popup');  // Limpiar los checkboxes del popup si estaba visible
        }

        // Ocultar y limpiar Resultado 4 si se cambia Tipificación N2
        resetResultado4();

        // Mostrar el popup de "Solo buscaba información" si se selecciona esta opción
        if (selectedValue === 'solo_informacion') {
            console.log("Mostrando el popup de Solo buscaba información");
            informacionPopup.style.display = 'block';  // Mostrar el popup
            document.getElementById('tipificacionn2-container').style.display = 'none';  // Ocultar Tipificación N2
        } else if (tipificacionN2Options[selectedValue]) {
            mostrarOpciones('tipificacionn2', tipificacionN2Options[selectedValue]);  // Mostrar Tipificación N2 si aplica
            document.getElementById('tipificacionn2-container').style.display = 'block';
        } else {
            document.getElementById('tipificacionn2-container').style.display = 'none';  // Ocultar Tipificación N2 si no aplica
        }
    });
};


// Función para manejar el cambio en Tipificación N2 y actualizar Tipificación N3 o mostrar el popup de documentos o seguimiento
const handleTipificacionN2Change = (tipificacionN3Options) => {
    const tipificacionN2 = document.getElementById('tipificacionn2');

    tipificacionN2.addEventListener('change', function () {
        const selectedValue = this.value;

        // Ocultar los popups de Documentos y Seguimiento por defecto seleccionados si se cambia Tipificación N2
        document.getElementById('documentos-popup').style.display = 'none';
        limpiarCheckboxes('documentos-popup');
        document.getElementById('documentos-container').style.display = 'none';
        document.getElementById('seguimiento-popup').style.display = 'none';
        limpiarCheckboxes('seguimiento-popup');
        document.getElementById('seguimiento-container').style.display = 'none';
        document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
        limpiarCheckboxes('documentos-sin-apostillar-popup');
        document.getElementById('documentos-sin-documento-popup').style.display = 'none';
        limpiarCheckboxes('documentos-sin-documento-popup');
        document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
        document.getElementById('documentos-sin-documento-container').style.display = 'none';

        // Ocultar y limpiar Resultado 4 si se cambia Tipificación N2
        resetResultado4();

        // Verificamos si el valor seleccionado es 'documento_tramite' o 'seguimiento'
        if (selectedValue === 'documento_tramite') {
            // Mostrar el popup de documentos
            document.getElementById('documentos-popup').style.display = 'block';
            // Ocultar Tipificación N3
            document.getElementById('tipificacionn3-container').style.display = 'none';
        } else if (selectedValue === 'seguimiento') {
            // Mostrar el popup de seguimiento
            document.getElementById('seguimiento-popup').style.display = 'block';
            // Ocultar Tipificación N3, ya que el popup se muestra en lugar de Tipificación N3
            document.getElementById('tipificacionn3-container').style.display = 'none';
        } else if (tipificacionN3Options[selectedValue]) {
            // Si hay opciones para Tipificación N3, las mostramos
            mostrarOpciones('tipificacionn3', tipificacionN3Options[selectedValue]);
            document.getElementById('tipificacionn3-container').style.display = 'block';
        } else {
            // Si no hay opciones, ocultamos Tipificación N3
            document.getElementById('tipificacionn3').innerHTML = '<option value="" disabled selected>Selecciona</option>';
            document.getElementById('tipificacionn3-container').style.display = 'none';
        }
    });
};

// Función para manejar el cambio en Tipificación N3 y actualizar Resultado 4 o mostrar popups de documentos
const handleTipificacionN3Change = () => {
    const tipificacionN3 = document.getElementById('tipificacionn3');
    const tipificacionN4Container = document.getElementById('tipificacionn4-container'); // Contenedor de N4 (Modalidad)
    const tipificacionN4 = document.getElementById('tipificacionn4'); // Select de N4 (Modalidad)


    tipificacionN3.addEventListener('change', function () {
        const selectedValue = this.value;

        // Ocultamos por defecto el contenedor de Resultado 4
        const statusFinalContainer = document.getElementById('statusfinal-container');
        const statusFinalInput = document.getElementById('statusfinal');
        document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
        limpiarCheckboxes('documentos-sin-apostillar-popup');
        document.getElementById('documentos-sin-documento-popup').style.display = 'none';
        limpiarCheckboxes('documentos-sin-documento-popup');
        document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
        document.getElementById('documentos-sin-documento-container').style.display = 'none';


        // Lógica para el campo Resultado 4
        if (selectedValue === 'con_experiencia') {
            // Mostrar Resultado 4 con el valor "Aplica en otro programa" si selecciona "Con experiencia"
            statusFinalContainer.style.display = 'block';
            statusFinalInput.value = 'Aplica en otro programa';
        } else if (selectedValue === 'doc_sin_apostillar') {
            // Mostrar el popup de Documentos sin apostillar
            document.getElementById('documentos-sin-apostillar-popup').style.display = 'block';
        } else if (selectedValue === 'sin_doc') {
            // Mostrar el popup de Sin documento
            document.getElementById('documentos-sin-documento-popup').style.display = 'block';
        } else {
            // Ocultar Resultado 4 y limpiar su valor si cambia la opción
            statusFinalContainer.style.display = 'none';
            statusFinalInput.value = '';
        }

        // Lógica para mostrar el select de Modalidad (Tipificación N4) si se selecciona "Modalidad" en Tipificación N3
        if (selectedValue === 'modalidad') {
            // Mostrar el select de Modalidad con las opciones
            mostrarOpciones('tipificacionn4', opcionesComunesTipificacionN4);
            tipificacionN4Container.style.display = 'block';  // Mostrar Tipificación N4
        } else {
            // Ocultar Tipificación N4 si no se selecciona "Modalidad"
            tipificacionN4.innerHTML = '<option value="" disabled selected>Selecciona</option>';
            tipificacionN4Container.style.display = 'none';  // Ocultar Tipificación N4
        }
    });
};

// Función para resetear Resultado 4
const resetResultado4 = () => {
    const statusFinalContainer = document.getElementById('statusfinal-container');
    const statusFinalInput = document.getElementById('statusfinal');

    // Ocultar y limpiar Resultado 4
    statusFinalContainer.style.display = 'none';
    statusFinalInput.value = '';
};

// Inicializamos los cambios según el valor de Resultado 2
document.getElementById('resultado2').addEventListener('change', function () {
    const resultado2Value = this.value;
    const tipificacionn1Container = document.getElementById('tipificacionn1-container');
    const tipificacionn1 = document.getElementById('tipificacionn1');

    // Limpiamos y ocultamos las tipificaciones y popups
    tipificacionn1.innerHTML = '';
    document.getElementById('tipificacionn2-container').style.display = 'none';
    document.getElementById('tipificacionn3-container').style.display = 'none';
    document.getElementById('documentos-popup').style.display = 'none';  // Ocultamos el popup por defecto
    limpiarCheckboxes('documentos-popup');
    document.getElementById('documentos-container').style.display = 'none'; // Ocultamos también el contenedor por defecto
    document.getElementById('seguimiento-popup').style.display = 'none';  // Ocultamos el popup de seguimiento
    limpiarCheckboxes('seguimiento-popup');
    document.getElementById('seguimiento-container').style.display = 'none'; // Ocultamos el contenedor de seguimiento
    document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
    limpiarCheckboxes('documentos-sin-apostillar-popup');
    document.getElementById('documentos-sin-documento-popup').style.display = 'none';
    limpiarCheckboxes('documentos-sin-documento-popup');
    document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
    document.getElementById('documentos-sin-documento-container').style.display = 'none';
    document.getElementById('informacion-popup').style.display = 'none';  // Ocultamos el popup de Solo buscaba información
    limpiarCheckboxes('informacion-popup');
    document.getElementById('informacion-container').style.display = 'none'; // Ocultamos el contenedor de Solo buscaba información

    // Reiniciar statuslast
    reiniciarStatusFinal();  // Reiniciar statuslast


    // Mostramos las opciones correspondientes en Tipificación N1 para "Interesado"
    if (resultado2Value === 'interesado') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="agenda_sig_ciclo">Agenda para siguiente ciclo - Lost / Hold</option>
            <option value="evaluando_propuesta">Evaluando propuesta - Open</option>
            <option value="referido">Referido - Open</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
            <option value="lead_repetido">Lead repetido - Lost</option>
        `;
    }

    // Mostramos las opciones correspondientes en Tipificación N1 para "No efectivo"
    else if (resultado2Value === 'no_efectivo') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="agenda_peticion_aspirante">Se agenda a petición del aspirante - Open</option>
            <option value="sin_aspirante">No se encuentra el aspirante - Open</option>
            <option value="contesta_y_cuelga">Contesta y cuelga - Open</option>
            <option value="numero_equivocado">Número equivocado - Lost / Hold</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
            <option value="lead_repetido">Lead Repetido - Lost</option>
            <option value="no_se_registro">No se registró - Lost / Hold</option>
        `;
    }

    // Mostramos las opciones correspondientes en Tipificación N1 para "No interesado"
    else if (resultado2Value === 'no_interesado') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="plan_no_interes">El plan de estudios / programa no es de su interés - Lost / Hold</option>
            <option value="lead_repetido">Lead Repetido - Lost</option>
            <option value="sin_capacidad_pago">No tiene capacidad de pago - Lost / Hold</option>
            <option value="interesado_otra_modalidad">Interesado en otra modalidad - Lost / Hold</option>
            <option value="no_cumple_requisitos">No cumple con requisitos académicos - Lost / Hold</option>
            <option value="no_acuerdo_proceso">No está de acuerdo con el proceso de equivalencia/revalidación - Lost / Hold</option>
            <option value="solo_informacion">Solo buscaba información - Lost / Hold</option>
            <option value="inscripto_otro">Ya se inscribió en otra institución - Lost / Hold</option>
            <option value="sin_disponibilidad_tiempo">Sin disponibilidad de tiempo - Lost / Hold</option>
            <option value="pide_no_marcacion">Pide no se le marque de nuevo - Lost / Hold</option>
            <option value="pensado_gratis">Pensó que era gratis - Lost / Hold</option>
            <option value="alternativas_pago_insuficientes">Alternativas de pago insuficientes - Lost / Hold</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
        `;
    }

    //
    else if (resultado2Value === 'seguimiento') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="no_contesta">No contesta</option>
    `;
    }

    // Mostramos las opciones correspondientes en Tipificación N1 para "Aplicó en Universidad"
    else if (resultado2Value === 'aplico_en_universidad') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="espera_de_pago">En espera de pago - Open</option>
            <option value="lamada_cortada">Llamada cortada / Fallas en audio - Open</option>
        `;
    }

    // Mostramos las opciones correspondientes en Tipificación N1 para "No contesta"
    else if (resultado2Value === 'no_contesta') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="sin_respuesta">Sin respuesta - Open</option>
            <option value="num_invalido">Número inválido - Lost / Hold</option>
            <option value="lead_prueba">Lead de prueba/Falso - Lost</option>
            <option value="lead_repetido">Lead repetido - Lost</option>
            <option value="fallas_audio">Llamada cortada/ Fallas audio - Open</option>
        `;
    }

    // Si no hay opción válida, ocultamos las tipificaciones
    else {
        tipificacionn1Container.style.display = 'none';
    }
});

// Escuchar los cambios en Tipificación N1 para ocultar popups cuando se cambia de opción
const tipificacionn1 = document.getElementById('tipificacionn1');
tipificacionn1.addEventListener('change', function () {
    // Ocultar el popup de seguimiento y el contenedor de seguimiento al cambiar de opción en Tipificación N1
    document.getElementById('seguimiento-popup').style.display = 'none';
    limpiarCheckboxes('seguimiento-popup');
    document.getElementById('seguimiento-container').style.display = 'none';
});

// Opciones comunes para Tipificación N3
const opcionesComunesTipificacionN3 = [
    { value: 'modalidad', text: 'Modalidad' },
    { value: 'contenido', text: 'Contenido / plan de estudios' },
    { value: 'otro_programa', text: 'Otro programa' }
];

// Opciones dinámicas para Tipificación N1 y N2
const opcionesTipificacionN1 = {
    'agenda_sig_ciclo': [
        { value: 'proximo_ciclo', text: 'Próximo ciclo' },
        { value: '2_ciclos_post', text: '2 ciclos posteriores o más' }
    ],
    'evaluando_propuesta': [
        { value: 'presupuesto', text: 'Presupuesto' },
        { value: 'comparacion_universidades', text: 'Comparación con otras Universidades' },
        { value: 'documento_tramite', text: 'Documento en trámite' },  // Cuando el usuario selecciona esta opción, se mostrará el popup
        { value: 'plan_estudios', text: 'Plan de estudios / programa si es de su interés' },
        { value: 'duracion_programa', text: 'Duración del programa' },
        { value: 'otra_persona', text: 'El programa es para otra persona' },
        { value: 'revalidacion_equivalencia', text: 'Busca revalidación/equivalencia' },
        { value: 'otro', text: 'Otro' },
        { value: 'interesado_potencial', text: 'Interesado potencial' }
    ],
    'referido': [
        { value: 'universidad', text: 'Universidad' },
        { value: 'amigo_familiar', text: 'Amigo / Familiar' },
        { value: 'empresa', text: 'Empresa' }
    ],
    'lead_repetido': [
        { value: 'atencion_otro_lead', text: 'Atención en otro lead / más de un registro' }
    ],
    'agenda_peticion_aspirante': [
        { value: 'seguimiento', text: 'Seguimiento' }
    ],
    'numero_equivocado': [
        { value: 'no_conocen', text: 'No lo conocen' },
        { value: 'familiar_amigo', text: 'Es familiar / amigo' },
        { value: 'no_especifica', text: 'No especifica' }
    ],

    'no_se_registro': [
        { value: 'vio_tiktok', text: 'Vió un TikTok' },
        { value: 'buscaba_trabajo', text: 'Busca trabajo' },
        { value: 'publicidad', text: 'Publicidad engañosa' },
        { value: 'otro', text: 'Otro' },
    ],
    'plan_no_interes': [
        { value: 'busca_programa', text: 'Busca otro contenido / Programa' },
        { value: 'busca_curso', text: 'Busca curso' },
        { value: 'busca_diplomado', text: 'Busca Diplomado' },
        { value: 'busca_licenciatura', text: 'Busca licenciatura' },
        { value: 'busca_maestria', text: 'Busca maestría' },
        { value: 'busca_doctorado', text: 'Busca doctorado' },
        { value: 'no_especifica', text: 'No especifica' }
    ],
    'sin_capacidad_pago': [
        { value: 'no_presupuesto', text: 'No entra en su presupuesto' },
        { value: 'no_credito_banco', text: 'No le autorizaron el crédito en el banco' },
        { value: 'no_credito_financiamiento', text: 'No le autorizaron el crédito / Financiamento en su empresa' },
        { value: 'sin_apoyo_tercero', text: 'Tercero no le puede apoyar' },
        { value: 'percance', text: 'Tuvo un percance' },
        { value: 'busca_convenio_uni', text: 'Busca financiamiento / convenio con la Universidad' },
        { value: 'busca_meses', text: 'Busca meses sin intereses' },
        { value: 'sin empleo', text: 'No tiene empleo por el momento' },
        { value: 'otro', text: 'Otro' }
    ],
    'interesado_otra_modalidad': [
        { value: 'presencial', text: 'Presencial' },
        { value: 'hibrido', text: 'Híbrido' }
    ],
    'no_cumple_requisitos': [
        { value: 'estudios_cursando', text: 'Estudios en curso' },
        { value: 'documento_tramite', text: 'Graduado sin documento' },
        { value: 'documento_tramite', text: 'Graduado documento en trámite' },
        { value: 'carrera_tecnica', text: 'Tiene carrera técnica' },
        { value: 'carrera_no_afin', text: 'Carrera no es afín' },
        { value: 'extranjero', text: 'Es extranjero' },
        { value: 'sin_licenciatura', text: 'No cuenta con licenciatura' }
    ],
    'sin_disponibilidad_tiempo': [
        { value: 'actualmente_estudia', text: 'Actualmente estudia' },
        { value: 'temas_laborales', text: 'Temas laborales' },
        { value: 'temas_personales', text: 'Temas personales' },
        { value: 'tema_salud', text: 'Tema salud' },
    ],
    'inscripto_otro': [
        { value: 'tec', text: 'TEC' },
        { value: 'itam', text: 'ITAM' },
        { value: 'uvm', text: 'UVM' },
        { value: 'panamericana', text: 'Panamericana' },
        { value: 'ibero', text: 'IBERO' },
        { value: 'otro', text: 'Otro' }
    ],
    'sin_disponibilidad_tiempo': [
        { value: 'actualmente_estudia', text: 'Actualmente estudia' },
        { value: 'temas_laborales', text: 'Temas laborales' },
        { value: 'temas_personales', text: 'Temas personales' },
        { value: 'temas_salud', text: 'Tema salud' }
    ],
    'sin_respuesta': [
        { value: 'manda_buzon', text: 'Da tono y manda a buzón' },
        { value: 'fuera_de_servicio', text: 'Fuera del área de servicio' },
        { value: 'rechaza_llamada', text: 'Rechaza llamada' },
        { value: 'buzon_directo', text: 'Buzón directo' }
    ],
    'lead_repetido': [
        { value: 'mas_registros', text: 'Atención en otro lead / más de un registro' }
    ]
};

// Opciones dinámicas para Tipificación N2
const opcionesTipificacionN2 = {
    '2_ciclos_post': [
        { value: 'trimestre1', text: 'Trimestre 1 (ene, feb, mar)' },
        { value: 'trimestre2', text: 'Trimestre 2 (abr, may, jun)' },
        { value: 'trimestre3', text: 'Trimestre 3 (jul, ago, sep)' },
        { value: 'trimestre4', text: 'Trimestre 4 (oct, nov, dic)' },
        { value: 'no_especifica', text: 'No especifica' }
    ],
    'presupuesto': [
        { value: 'meses_sin_intereses', text: 'Busca meses sin intereses' },
        { value: 'financiamiento', text: 'Busca financiamiento / Convenio con la universidad' },
        { value: 'empresa', text: 'Lo apoyará su empresa' },
        { value: 'credito', text: 'En espera que le aprueben un crédito' },
        { value: 'tercero', text: 'Lo apoyará un tercero / Tercero toma decisión' },
        { value: 'otro', text: 'Otro' }
    ],
    'busca_curso': opcionesComunesTipificacionN3,        // Reutilización de opciones comunes
    'busca_diplomado': opcionesComunesTipificacionN3,    // Reutilización de opciones comunes
    'busca_licenciatura': opcionesComunesTipificacionN3, // Reutilización de opciones comunes
    'busca_maestria': opcionesComunesTipificacionN3,     // Reutilización de opciones comunes
    'busca_doctorado': opcionesComunesTipificacionN3     // Reutilización de opciones comunes
};

// Opciones dinámicas para Tipificación N3
const opcionesTipificacionN3 = {
    '2_ciclos_post': [
        { value: 'trimestre1', text: 'Trimestre 1 (ene, feb, mar)' },
        { value: 'trimestre2', text: 'Trimestre 2 (abr, may, jun)' },
        { value: 'trimestre3', text: 'Trimestre 3 (jul, ago, sep)' },
        { value: 'trimestre4', text: 'Trimestre 4 (oct, nov, dic)' },
        { value: 'no_especifica', text: 'No especifica' }
    ],
    'presupuesto': [
        { value: 'meses_sin_intereses', text: 'Busca meses sin intereses' },
        { value: 'financiamiento', text: 'Busca financiamiento / Convenio con la universidad' },
        { value: 'empresa', text: 'Lo apoyará su empresa' },
        { value: 'credito', text: 'En espera que le aprueben un crédito' },
        { value: 'tercero', text: 'Lo apoyará un tercero / Tercero toma decisión' },
        { value: 'otro', text: 'Otro' }
    ],
    'comparacion_universidades': [
        { value: 'tec', text: 'TEC' },
        { value: 'itam', text: 'ITAM' },
        { value: 'uvm', text: 'UVM' },
        { value: 'panamericana', text: 'Panamericana' },
        { value: 'ibero', text: 'IBERO' },
        { value: 'otro', text: 'Otro' }
    ],
    'interesado_potencial': [
        { value: 'evaluando_costos', text: 'Evaluando costos' },
        { value: 'espera_aplicar', text: 'En espera de fecha para aplicar solicitud' },
        { value: 'evaluando_opciones', text: 'Evaluando otras opciones' },
        { value: 'promesa_pago', text: 'Promesa de pago' }
    ],
    'busca_curso': opcionesComunesTipificacionN3,        // Reutilización de opciones comunes
    'busca_diplomado': opcionesComunesTipificacionN3,    // Reutilización de opciones comunes
    'busca_licenciatura': opcionesComunesTipificacionN3, // Reutilización de opciones comunes
    'busca_maestria': opcionesComunesTipificacionN3,     // Reutilización de opciones comunes
    'busca_doctorado': opcionesComunesTipificacionN3     // Reutilización de opciones comunes
    ,
    'no_presupuesto': [
        { value: 'menos_3_mil', text: 'Menos de 3 mil' },
        { value: '3_4_mil', text: '3 a 4 mil mensuales' },
        { value: '4_5_mil', text: '4 a 5 mil mensuales' },
        { value: 'mas_5_mil', text: 'Más de 5 mil mensuales' },
        { value: 'otro', text: 'Otro' },
    ],
    'percance': [
        { value: 'personal', text: 'Personal' },
        { value: 'familiar', text: 'Familiar' },
        { value: 'salud', text: 'Salud' },
        { value: 'otro', text: 'Otro' },
    ],
    'estudios_cursando': [
        { value: 'bachillerato', text: 'Bachillerato' },
        { value: 'licenciatura', text: 'Licenciatura' },
        { value: 'servicio_social', text: 'Servicio Social' },
        { value: 'otro', text: 'Otro' }
    ],
    'carrera_no_afin': [
        { value: 'con_experiencia', text: 'Con experiencia' },
        { value: 'sin_experiencia', text: 'Sin experiencia' }
    ],
    'extranjero': [
        { value: 'doc_sin_apostillar', text: 'Documento sin apostillar' },
        { value: 'sin_doc', text: 'Sin documento' }
    ],
    'actualmente_estudia': [
        { value: 'curso_seminario', text: 'Curso /Seminario' },
        { value: 'diplomado', text: 'Diplomado' },
        { value: 'licenciatura', text: 'Licenciatura' },
        { value: 'maestria', text: 'Maestría' },
        { value: 'doctorado', text: 'Doctorado' },
        { value: 'especialidad', text: 'Especialidad' }
    ]
};

// Opciones comunes para Tipificación N4
const opcionesComunesTipificacionN4 = [
    { value: 'presencial', text: 'Presencial' },
    { value: 'hibrido', text: 'Híbrido' },
    { value: 'online', text: 'Online' }
];

// Opciones dinámicas para Tipificación N4
const opcionesTipificacionN4 = {
    'modalidad': opcionesComunesTipificacionN4 // Asociamos la opción 'modalidad' con las opciones comunes de Tipificación N4
};

// Listener para los cambios en Tipificación N1
handleTipificacionN1Change(opcionesTipificacionN1);

// Listener para los cambios en Tipificación N2
handleTipificacionN2Change(opcionesTipificacionN3);

// **Listener para los cambios en Tipificación N3**
handleTipificacionN3Change();

// Función genérica para manejar la interacción con los popups y contenedores de selección
const manejarPopup = (guardarBtnId, popupId, containerId, selectorCheckboxes, listaId, mensajeVacio) => {
    const guardarBtn = document.getElementById(guardarBtnId);
    const popup = document.getElementById(popupId);
    const container = document.getElementById(containerId);
    const listaSeleccionados = document.getElementById(listaId);
    const checkboxes = document.querySelectorAll(selectorCheckboxes);
    let seleccionados = [];

    // Función para actualizar la lista de documentos seleccionados
    const actualizarListaSeleccionados = () => {
        listaSeleccionados.innerHTML = seleccionados.length
            ? seleccionados.map(item => `<li>${item.text}</li>`).join('')
            : `<li>${mensajeVacio}</li>`;
    };

    // Función para obtener los checkboxes seleccionados
    const obtenerSeleccionados = () => {
        seleccionados = [...checkboxes]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => ({ id: checkbox.id, text: checkbox.value }));
    };

    // Guardar documentos seleccionados y mostrar la lista en el contenedor
    guardarBtn.addEventListener('click', function (event) {
        event.preventDefault();
        obtenerSeleccionados();
        actualizarListaSeleccionados();
        popup.style.display = 'none';
        container.style.display = 'block';
    });

    // Volver a mostrar el popup con los documentos seleccionados previamente
    const editarBtn = container.querySelector('button'); // Asumiendo que el botón de edición está dentro del contenedor
    editarBtn.addEventListener('click', function (event) {
        event.preventDefault();
        // Mostrar el popup nuevamente
        popup.style.display = 'block';
        container.style.display = 'none';

        // Restaurar el estado de los checkboxes según lo previamente seleccionado
        checkboxes.forEach(checkbox => {
            checkbox.checked = seleccionados.some(item => item.id === checkbox.id);
        });
    });
};

// Implementación para manejar el popup de documentos
manejarPopup(
    'guardar-documentos',           // ID del botón de guardar en el popup
    'documentos-popup',             // ID del popup
    'documentos-container',         // ID del contenedor donde se muestra la lista seleccionada
    '#documentos-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
    'documentos-seleccionados',     // ID del <ul> donde se mostrará la lista seleccionada
    'No se seleccionaron documentos.' // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de seguimiento
manejarPopup(
    'guardar-seguimiento',           // ID del botón de guardar en el popup
    'seguimiento-popup',             // ID del popup
    'seguimiento-container',         // ID del contenedor donde se muestra la lista seleccionada
    '#seguimiento-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
    'metodo-seleccionado',           // ID del <ul> donde se mostrará la lista seleccionada
    'No se seleccionaron métodos de seguimiento.' // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de documentos sin apostillar
manejarPopup(
    'guardar-documentos-sin-apostillar',           // ID del botón de guardar en el popup
    'documentos-sin-apostillar-popup',             // ID del popup
    'documentos-sin-apostillar-container',         // ID del contenedor donde se muestra la lista seleccionada
    '#documentos-sin-apostillar-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
    'documentos-seleccionados-sin-apostillar',     // ID del <ul> donde se mostrará la lista seleccionada
    'No se seleccionaron documentos.' // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de sin documento
manejarPopup(
    'guardar-documentos-sin-documento',           // ID del botón de guardar en el popup
    'documentos-sin-documento-popup',             // ID del popup
    'documentos-sin-documento-container',         // ID del contenedor donde se muestra la lista seleccionada
    '#documentos-sin-documento-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
    'documentos-seleccionados-sin-documento',     // ID del <ul> donde se mostrará la lista seleccionada
    'No se seleccionaron documentos.' // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de Solo busca información
manejarPopup(
    'guardar-informacion',           // ID del botón de guardar en el popup
    'informacion-popup',             // ID del popup
    'informacion-container',         // ID del contenedor donde se muestra la lista seleccionada
    '#informacion-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
    'informacion-seleccionados',     // ID del <ul> donde se mostrará la lista seleccionada
    'No se seleccionó información.'  // Mensaje en caso de que no haya selección
);

// Función para manejar la visibilidad de "Opciones asociadas a Costos" basado en la selección de "Tipificación de respuesta"
function verificarOpcionesCostos() {
    const tipificacionRespuesta = document.getElementById("tipificacionn1");
    const informacionPopup = document.getElementById("informacion-popup");

    if (!tipificacionRespuesta || !informacionPopup) {
        console.error("Tipificación de respuesta o el popup de información no encontrados.");
        return;  // Si alguno no existe, salir de la función
    }

    // Mostrar el popup de "Solo buscaba información" si se selecciona esta opción
    if (tipificacionRespuesta.value === "solo_informacion") {
        informacionPopup.style.display = 'block'; // Mostrar el popup
        const informacionContainer = document.getElementById('informacion-container');
        if (informacionContainer) {
            informacionContainer.style.display = 'none'; // Ocultar el contenedor si está presente
        }
    } else {
        informacionPopup.style.display = 'none'; // Ocultar el popup
    }
}

// Llamar a la función al cargar la página para verificar el estado inicial
window.addEventListener('load', verificarOpcionesCostos);

// Asignar el evento "change" al campo de "Tipificación de respuesta" para verificar la visibilidad de "Opciones asociadas a Costos"
document.getElementById("tipificacionn1").addEventListener('change', verificarOpcionesCostos);

// Función para obtener el texto seleccionado de un <select> y evitar "Selecciona"
function obtenerTextoSelect(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        const textoSeleccionado = elemento.options[elemento.selectedIndex]?.text || '';
        const valorSeleccionado = elemento.value || ''; // Obtener el valor seleccionado
        // Si el texto es "Selecciona" o el valor está vacío, retornamos una cadena vacía
        return (textoSeleccionado === 'Selecciona' || valorSeleccionado === '') ? '' : textoSeleccionado;
    }
    return '';  // Si no hay elemento, retornamos cadena vacía
}

// Función para capturar los checkboxes seleccionados
function obtenerCheckboxSeleccionados(selector) {
    const seleccionados = [];
    document.querySelectorAll(selector).forEach(checkbox => {
        if (checkbox.checked) {
            seleccionados.push(checkbox.value);
        }
    });
    return seleccionados.join(', ');
}

// Función para exportar a Excel (incluir la verificación del checkbox "Costos")
function exportarExcel(event) {
    event.preventDefault(); // Previene el reinicio de la página o envío de formulario

    // Objeto intermedio para almacenar los datos a exportar
    const dataToExport = {};

    // Capturar los valores de los elementos `select`
    dataToExport["Canal de comunicación"] = obtenerTextoSelect("canaldecomunicacion");
    dataToExport["Estatus de contacto"] = obtenerTextoSelect("resultado1");
    dataToExport["Nivel de contacto"] = obtenerTextoSelect("tipocontacto");
    dataToExport["Respuesta de lead"] = obtenerTextoSelect("resultado2");
    dataToExport["Tipificación de respuesta"] = obtenerTextoSelect("tipificacionn1");
    dataToExport["Subtipificación de respuesta"] = obtenerTextoSelect("tipificacionn2");

    // Capturar "Solo buscaba información" justo después de "Subtipificación de respuesta"
    dataToExport["Solo buscaba información"] = obtenerCheckboxSeleccionados('#informacion-popup input[type="checkbox"]');

    // Verificación si el checkbox "Costos" está marcado
    const costosCheckbox = document.getElementById('costos');
    let detallesSubtipificacionTitle = "Detalles de subtipificación"; // Título por defecto
    let detallesSubtipificacion = obtenerTextoSelect("tipificacionn3");

    // Si el checkbox de "Costos" está marcado, cambiar el título dinámicamente
    if (costosCheckbox && costosCheckbox.checked) {
        detallesSubtipificacionTitle = "Opciones asociadas a Costos *"; // Cambiar el título dinámicamente si es Costos
    }

    dataToExport[detallesSubtipificacionTitle] = detallesSubtipificacion; // Agregar el valor con el título adecuado

    // Capturar el valor de "Resultado 4"
    dataToExport["Resultado 4"] = document.getElementById("statusfinal").value || '';

    // Capturar el valor de "Tipificación 4"
    dataToExport["Tipo de enseñanza"] = obtenerTextoSelect("tipificacionn4");

    // Capturar los checkboxes seleccionados
    dataToExport["Documentos faltantes"] = obtenerCheckboxSeleccionados('#documentos-popup input[type="checkbox"]');
    dataToExport["Método de seguimiento"] = obtenerCheckboxSeleccionados('#seguimiento-popup input[type="checkbox"]');
    dataToExport["Documentos sin apostillar"] = obtenerCheckboxSeleccionados('#documentos-sin-apostillar-popup input[type="checkbox"]');
    dataToExport["Sin documento"] = obtenerCheckboxSeleccionados('#documentos-sin-documento-popup input[type="checkbox"]');

    // Capturar el valor de otros campos
    dataToExport["Interés del lead"] = obtenerTextoSelect("interes");
    dataToExport["Próxima comunicación"] = obtenerTextoSelect("proximaactividad");
    dataToExport["Fecha de envío de comunicación"] = document.getElementById("fechaproxact").value || ''; // Campo de fecha
    dataToExport["Hora de envío de comunicación"] = document.getElementById("horaproxact").value || ''; // Campo de hora
    dataToExport["Descripción de comunicación"] = document.getElementById("descripcion").value || ''; // Captura el valor de la descripción
    dataToExport["Status Final"] = document.getElementById("statuslast").value || '';

    // Filtrar solo los campos que tienen valor
    const filteredData = {};
    Object.keys(dataToExport).forEach(key => {
        if (dataToExport[key]) {
            filteredData[key] = dataToExport[key];
        }
    });

    // Generar el archivo Excel
    const worksheet = XLSX.utils.json_to_sheet([filteredData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados");

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, "resultados.xlsx");
}

// Listener para el botón que exporta el Excel
document.getElementById('exportarExcelButton').addEventListener('click', exportarExcel);

// Activar o desactivar el botón de guardar
document.addEventListener('DOMContentLoaded', function () {
    const guardarButton = document.getElementById('guardarButton');
    const form = document.querySelector('form');  // Seleccionar el primer formulario en el DOM

    if (!form || !guardarButton) {
        console.error("Formulario o botón guardar no encontrados.");
        return; // Si el formulario o el botón no existen, salir de la función
    }

    const requiredFields = form.querySelectorAll('select[required], input[required], textarea[required]');

    // Función para verificar si un campo está visible
    function isFieldVisible(field) {
        return field.offsetParent !== null;  // Verifica si el campo es visible (no oculto)
    }

    // Función para verificar si el formulario está completo
    function checkFormCompletion() {
        let allFilled = true;

        // Validar los campos requeridos visibles
        requiredFields.forEach(field => {
            if (!field.disabled && isFieldVisible(field)) {
                if (!field.value.trim()) {
                    allFilled = false;
                }
            }
        });

        // Verificar los checkboxes dentro de los popups visibles
        const popups = ['documentos-popup', 'seguimiento-popup', 'documentos-sin-apostillar-popup', 'documentos-sin-documento-popup', 'informacion-popup'];

        popups.forEach(popupId => {
            const popup = document.getElementById(popupId);
            if (popup && popup.style.display !== 'none') {
                const checkboxes = popup.querySelectorAll('input[type="checkbox"]');
                const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                if (!isChecked) {
                    allFilled = false;
                }
            }
        });

        // Verificar si la fecha de envío de comunicación está habilitada y tiene un valor
        const fechaEnvio = document.getElementById('fechaproxact');
        if (fechaEnvio && isFieldVisible(fechaEnvio)) {  // Asegúrate de que está visible y no deshabilitado
            if (!fechaEnvio.disabled && !fechaEnvio.value) {  // Si está habilitado pero vacío, no permitir guardar
                allFilled = false;
            }
        }

        // Verificar si la hora de envío de comunicación está habilitada y tiene un valor
        const horaEnvio = document.getElementById('horaproxact');
        if (horaEnvio && isFieldVisible(horaEnvio)) {  // Asegúrate de que está visible y no deshabilitado
            if (!horaEnvio.disabled && !horaEnvio.value) {  // Si está habilitado pero vacío, no permitir guardar
                allFilled = false;
            }
        }

        // Habilitar o deshabilitar el botón según la validación
        guardarButton.disabled = !allFilled;
    }

    // Escuchar cambios en los campos obligatorios y checkboxes
    requiredFields.forEach(field => {
        field.addEventListener('input', checkFormCompletion);
        field.addEventListener('change', checkFormCompletion);
    });

    // Escuchar cambios en los checkboxes dentro de los popups
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkFormCompletion);
    });

    // Escuchar cambios en el campo de fecha
    const fechaEnvio = document.getElementById('fechaproxact');
    if (fechaEnvio) {
        fechaEnvio.addEventListener('input', checkFormCompletion);
        fechaEnvio.addEventListener('change', checkFormCompletion);
    }

    // Inicializar la comprobación al cargar la página
    checkFormCompletion();
});
