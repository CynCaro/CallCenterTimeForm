// Función para mostrar las opciones en un <select> y asegurar que el contenedor sea visible
const mostrarOpciones = (selectId, options) => {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
        // Insertar las nuevas opciones
        selectElement.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            ${options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
        `;
        // Asegurarse de que el contenedor sea visible
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

// Inicialmente ocultar el contenedor de Tipo de contacto
document.getElementById('tipocontacto').parentElement.parentElement.style.display = 'none';

// Listener para Resultado 1
document.getElementById('resultado1').addEventListener('change', function () {
    const selectedValue = this.value;
    const tipoContactoContainer = document.getElementById('tipocontacto').parentElement.parentElement;
    const tipoContacto = document.getElementById('tipocontacto');
    const resultado2Container = document.getElementById('resultado2-container');
    const resultado2 = document.getElementById('resultado2');

    // Mostrar Tipo de contacto si selecciona "Contactado"
    if (selectedValue === 'contactado') {
        tipoContactoContainer.style.display = 'block';
        tipoContacto.disabled = false;
        resultado2Container.style.display = 'none';
        resultado2.value = ''; // Limpiar selección de Resultado 2
    } else if (selectedValue === 'no_contactado') {
        // Si selecciona "No contactado", ocultamos todos los campos relacionados
        tipoContactoContainer.style.display = 'none';
        tipoContacto.value = '';
        resultado2Container.style.display = 'none';
        resultado2.value = '';

        // Ocultar Tipificación y popups
        ocultarTipificaciones();
        ocultarTodosLosPopups();
    } else {
        tipoContactoContainer.style.display = 'none';
        tipoContacto.value = '';
        resultado2Container.style.display = 'none';
        resultado2.value = '';
    }
});

// Listener para Tipo de contacto
document.getElementById('tipocontacto').addEventListener('change', function () {
    const selectedValue = this.value;
    const resultado2Container = document.getElementById('resultado2-container');
    const resultado2 = document.getElementById('resultado2');

    // Ocultar Tipificación y popups si se cambia Tipo de contacto
    ocultarTipificaciones();
    ocultarTodosLosPopups();

    // Mostrar las opciones de Resultado 2 basadas en el valor de Tipo de contacto
    if (selectedValue === 'primer_contacto') {
        mostrarOpciones('resultado2', [
            { value: 'interesado', text: 'Interesado' },
            { value: 'no_interesado', text: 'No interesado' },
            { value: 'aplico_en_universidad', text: 'Aplicó en Universidad' }
        ]);
        resultado2Container.style.display = 'block';
    } else if (selectedValue === 'seguimiento') {
        mostrarOpciones('resultado2', [
            { value: 'no_efectivo', text: 'No efectivo' },
            { value: 'no_contesta', text: 'No contesta' }
        ]);
        resultado2Container.style.display = 'block';
    } else {
        resultado2Container.style.display = 'none';
        resultado2.value = ''; // Limpiar selección de Resultado 2
    }
});


// Función para manejar el cambio en Tipificación N1 y actualizar Tipificación N2
const handleTipificacionN1Change = (tipificacionN2Options) => {
    const tipificacionN1 = document.getElementById('tipificacionn1');
    tipificacionN1.addEventListener('change', function () {
        const selectedValue = this.value;

        // Ocultar el popup de Documentos, el contenedor de Documentos seleccionados y Tipificación N3 si se cambia Tipificación N1
        document.getElementById('documentos-popup').style.display = 'none';
        document.getElementById('documentos-container').style.display = 'none';
        document.getElementById('tipificacionn3-container').style.display = 'none'; // Ocultamos Tipificación N3
        document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
        document.getElementById('documentos-sin-documento-popup').style.display = 'none';
        document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
        document.getElementById('documentos-sin-documento-container').style.display = 'none';
        document.getElementById('informacion-popup').style.display = 'none';  // Ocultar popup de Solo buscaba información
        document.getElementById('informacion-container').style.display = 'none'; // Ocultar contenedor de Solo buscaba información

        // Limpiar las opciones de Tipificación N3
        document.getElementById('tipificacionn3').innerHTML = '<option value="" disabled selected>Selecciona</option>';

        // Ocultar y limpiar Resultado 4 si se cambia Tipificación N1
        resetResultado4();

        // Mostrar el popup de Solo buscaba información si se selecciona esa opción en Tipificación N1
        if (selectedValue === 'solo_informacion') {
            document.getElementById('informacion-popup').style.display = 'block'; // Mostrar el popup de Solo buscaba información
            document.getElementById('tipificacionn2-container').style.display = 'none'; // Ocultar Tipificación N2
            // Si existe alguna opción en Tipificación N2 para el valor seleccionado en N1, se muestran las opciones.
        } else if (tipificacionN2Options[selectedValue]) {
            mostrarOpciones('tipificacionn2', tipificacionN2Options[selectedValue]);
        } else {
            // Si no hay opciones, se limpia Tipificación N2 y se oculta el contenedor.
            const tipificacionn2Container = document.getElementById('tipificacionn2-container');
            document.getElementById('tipificacionn2').innerHTML = '<option value="" disabled selected>Selecciona</option>';
            tipificacionn2Container.style.display = 'none';
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
        document.getElementById('documentos-container').style.display = 'none';
        document.getElementById('seguimiento-popup').style.display = 'none';
        document.getElementById('seguimiento-container').style.display = 'none';
        document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
        document.getElementById('documentos-sin-documento-popup').style.display = 'none';
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
    tipificacionN3.addEventListener('change', function () {
        const selectedValue = this.value;

        // Ocultamos por defecto el contenedor de Resultado 4
        const statusFinalContainer = document.getElementById('statusfinal-container');
        const statusFinalInput = document.getElementById('statusfinal');
        document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
        document.getElementById('documentos-sin-documento-popup').style.display = 'none';
        document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
        document.getElementById('documentos-sin-documento-container').style.display = 'none';


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
    document.getElementById('documentos-container').style.display = 'none'; // Ocultamos también el contenedor por defecto
    document.getElementById('seguimiento-popup').style.display = 'none';  // Ocultamos el popup de seguimiento
    document.getElementById('seguimiento-container').style.display = 'none'; // Ocultamos el contenedor de seguimiento
    document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
    document.getElementById('documentos-sin-documento-popup').style.display = 'none';
    document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
    document.getElementById('documentos-sin-documento-container').style.display = 'none';
    document.getElementById('informacion-popup').style.display = 'none';  // Ocultamos el popup de Solo buscaba información
    document.getElementById('informacion-container').style.display = 'none'; // Ocultamos el contenedor de Solo buscaba información


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
            <option value="no_efectivo">No efectivo</option>
            <option value="no_contesta">No contesta</option>
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
    document.getElementById('seguimiento-container').style.display = 'none';
});

// Opciones comunes para Tipificación N3
const opcionesComunesTipificacionN3 = [
    { value: 'modalidad', text: 'Modalidad' },
    { value: 'contenido', text: 'Contenido / plan de estudios' },
    { value: 'otro_programa', text: 'Otro programa' }
];

// // Opciones aplico en Universidad para Tipificación N3
// const aplicoUniversidadTipificacionN3 = [
//     { value: 'se_agenda', text: 'Se agenda a peticición del aspirante-Open' },
//     { value: 'no_se_encuentra', text: 'No se encuentra el aspirante - Open' },
//     { value: 'contesta_cuelga', text: 'Contesta y cuelga - Open' },
//     { value: 'num_equivocado', text: 'Número equivocado - Lost / Hold' },
//     { value: 'llamada_cortada', text: 'Llamada cortada / Fallas en audio - Open' },
//     { value: 'lead_repetido', text: 'Lead Repetido - Lost' }, 
//     { value: 'no_registro', text: 'No se registro - Lost / Hold' }
// ];

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
    'lead_repetido': [
        { value: 'otro_lead', text: 'Atención en otro lead / más de un registro' }
    ],
    'no_se_registro': [
        { value: 'vio_tik_tok', text: 'Vió un tik tok' },
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
    // 'aplico_en_universidad': [
    //     { value: 'espera_de_pago', text: aplicoUniversidadTipificacionN3 },
    //     { value: 'lamada_cortada', text: 'aplicoUniversidadTipificacionN3' }
    // ],
    'no_contesta': [
        { value: 'sin_respuesta', text: 'Sin respuesta - Open' },
        { value: 'num_invalido', text: 'Número inválido - Lost/Hold' },
        { value: 'lead_prueba', text: 'Lead de prueba/Falso - Lost' },
        { value: 'lead_repetido', text: 'Lead repetido - Lost' },
        { value: 'fallas_audio', text: 'Llamada cortada/ Fallas audio - Open' }
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
        { value: 'licenciatura', text: 'Licenciaturao' },
        { value: 'maestria', text: 'Maestría' },
        { value: 'doctorado', text: 'Doctorado' },
        { value: 'especialidad', text: 'Especialidad' }
    ],
    'sin_respuesta': [
        { value: 'manda_buzon', text: 'Da tono y manda a buzón' },
        { value: 'fuera_de_servicio', text: 'Fuera del área de servicio' },
        { value: 'rechaza_llamada', text: 'Rechaza llamada' },
        { value: 'manda_buzon', text: 'Da tono y manda a buzón' },
        { value: 'buzon_directo', text: 'Buzón directo' }
    ],
    'lead_repetido': [
        { value: 'mas_registros', text: 'Atención en otro lead / más de un registro' }
    ]
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

