// Función para ocultar y limpiar campos comunes
const ocultarElementosComunes = () => {
    document.getElementById('metodo-seleccionado').value = '';
    document.getElementById('documentos-seleccionados').value = '';
    document.getElementById('documentos-container').style.display = 'none';
    document.getElementById('documentos-popup').style.display = 'none';
    document.getElementById('seguimiento-container').style.display = 'none';
    document.getElementById('seguimiento-popup').style.display = 'none';
};

// Listener para la selección de resultado2
document.getElementById('resultado2').addEventListener('change', function () {
    const resultado2Value = this.value;
    const tipificacionn1Container = document.getElementById('tipificacionn1-container');
    const tipificacionn1 = document.getElementById('tipificacionn1');
    const tipificacionn2Container = document.getElementById('tipificacionn2-container');
    const tipificacionn2 = document.getElementById('tipificacionn2');
    const tipificacionn3Container = document.getElementById('tipificacionn3-container');
    const tipificacionn3 = document.getElementById('tipificacionn3');

    // Ocultar Tipificación N2, N3
    tipificacionn2Container.style.display = 'none';
    tipificacionn2.innerHTML = '';
    tipificacionn3Container.style.display = 'none';
    tipificacionn3.innerHTML = '';

    // Limpiar Tipificación N1
    tipificacionn1.innerHTML = '';
    tipificacionn1Container.style.display = 'none';

    // Lógica de Tipificación N1 según el valor de Resultado 2
    if (resultado2Value === 'interesado') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="agenda_sig_ciclo">Agenda para siguiente ciclo - Lost/Hold</option>
            <option value="evaluando_propuesta">Evaluando propuesta - Open</option>
            <option value="referido">Referido - Open</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
            <option value="lead_repetido">Lead repetido - Lost</option>
        `;
    } else if (resultado2Value === 'no_interesado') {
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
    } else if (resultado2Value === 'no_efectivo') {
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="agenda_peticion_aspirante">Se agenda a petición del aspirante - Open</option>
            <option value="no_se_encuentra_aspirante">No se encuentra el aspirante - Open</option>
            <option value="contesta_y_cuelga">Contesta y cuelga - Open</option>
            <option value="numero_equivocado">Número equivocado - Lost / Hold</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
            <option value="lead_repetido">Lead repetido - Lost</option>
            <option value="no_se_registro">No se registró - Lost / Hold</option>
        `;
    }
    // Ocultar elementos adicionales
    ocultarElementosComunes();
});

// // Ocultar popups y otros elementos no relacionados
// document.getElementById('documentos-popup').style.display = 'none';
// document.getElementById('documentos-container').style.display = 'none';
// document.getElementById('seguimiento-popup').style.display = 'none';
// document.getElementById('seguimiento-container').style.display = 'none';
// document.getElementById('documentos-sin-apostillar-popup').style.display = 'none';
// document.getElementById('documentos-sin-apostillar-container').style.display = 'none';
// document.getElementById('documentos-sin-documento-popup').style.display = 'none';
// document.getElementById('documentos-sin-documento-container').style.display = 'none';

// Listener para la selección de tipificacionn1
document.getElementById('tipificacionn1').addEventListener('change', function () {
    const tipificacionn1Value = this.value;
    const tipificacionn2Container = document.getElementById('tipificacionn2-container');
    const tipificacionn2 = document.getElementById('tipificacionn2');
    const tipificacionn3Container = document.getElementById('tipificacionn3-container');
    // const documentosContainer = document.getElementById('documentos-container');
    // const documentosPopup = document.getElementById('documentos-popup');

    // Limpiar y ocultar N2, N3
    tipificacionn2.innerHTML = '';
    tipificacionn3Container.style.display = 'none';

    const mostrarOpcionesTipificacion2 = (opciones) => {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `<option value="" disabled selected>Selecciona</option>${opciones}`;
    };

    // Función para ocultar y limpiar
    // const ocultarElementos = () => {
    //     document.getElementById('metodo-seleccionado').value = '';
    //     document.getElementById('documentos-seleccionados').value = '';
    //     tipificacionn2.innerHTML = '';
    //     tipificacionn3Container.style.display = 'none';
    //     documentosContainer.style.display = 'none';
    //     documentosPopup.style.display = 'none';
    // };

    // const mostrarOpciones = (opciones) => {
    //     tipificacionn2Container.style.display = 'block';
    //     tipificacionn2.innerHTML = `<option value="" disabled selected>Selecciona</option>${opciones}`;
    // };

    // ocultarElementos();

    // Lógica para Tipificación N2 basado en la selección de N1
    switch (tipificacionn1Value) {
        case 'evaluando_propuesta':
            mostrarOpcionesTipificacion2(`
                <option value="presupuesto">Presupuesto</option>
                <option value="comparacion_universidades">Comparación con otras Universidades</option>
                <option value="documento_tramite">Documento en trámite</option>
                <option value="plan_estudios">Plan de estudios / programa si es de su interés</option>
                <option value="duracion_programa">Duración del programa</option>
                <option value="otra_persona">El programa es para otra persona</option>
                <option value="revalidacion_equivalencia">Busca revalidación/equivalencia</option>
                <option value="otro">Otro</option>
                <option value="interesado_potencial">Interesado potencial</option>
            `);
            break;
        case 'agenda_sig_ciclo':
            mostrarOpcionesTipificacion2(`
                <option value="proximo_ciclo">Próximo ciclo</option>
                <option value="2_ciclos_post">2 ciclos posteriores o más</option>
            `);
            break;
        case 'referido':
            mostrarOpcionesTipificacion2(`
                <option value="universidad">Universidad</option>
                <option value="amigo_familiar">Amigo / Familiar</option>
                <option value="empresa">Empresa</option>
            `);
            break;
        case 'agenda_peticion_aspirante':
            mostrarOpcionesTipificacion2(`
                <option value="seguimiento">Seguimiento</option>
            `);
            break;
        case 'numero_equivocado':
            mostrarOpcionesTipificacion2(`
                <option value="no_lo_conocen">No lo conocen</option>
                <option value="familiar_amigo">Es familiar / amigo</option>
                <option value="no_especifica">No especifica</option>
            `);
            break;
        case 'no_se_registro':
            mostrarOpcionesTipificacion2(`
                <option value="vio_tik_tok">Vió un tik tok</option>
                <option value="busca_trabajo">Busca trabajo</option>
                <option value="publicidad_enganosa">Publicidad engañosa</option>
                <option value="otro">Otro</option>
            `);
            break;
        case 'plan_no_interes':
            mostrarOpcionesTipificacion2(`
                <option value="busca_otro_contenido">Busca otro contenido / Programa</option>
                <option value="busca_curso">Busca curso</option>
                <option value="busca_diplomado">Busca Diplomado</option>
                <option value="busca_licenciatura">Busca Licenciatura</option>
                <option value="busca_maestria">Busca maestría</option>
                <option value="busca_doctorado">Busca doctorado</option>
                <option value="no_especifica">No especifíca</option>
            `);
            break;
        case 'lead_repetido':
            mostrarOpcionesTipificacion2(`
                <option value="atencion_otro_lead">Atención en otro lead / más de un registro</option>
            `);
            break;
        case 'sin_capacidad_pago':
            mostrarOpcionesTipificacion2(`
                <option value="no_entra_presupuesto">No entra en su presupuesto</option>
                <option value="no_autorizaron_creidto">No le autorizaron el crédito en el banco</option>
                <option value="no_autorizaron_financiamiento">No le autorizaron el crédito / Financiamento en su empresa</option>
                <option value="tercero_no_apoya">Tercero no le puede apoyar</option>
                <option value="tuvo_percance">Tuvo un percance</option>
                <option value="busca_convenio_universidad">Busca financiamiento / convenio con la Universidad</option>
                <option value="busca_meses">Busca meses sin interesese</option>
                <option value="no_empleo">No tiene empleo por el momento</option>
                <option value="otro">Otro</option>
            `);
            break;
        case 'interesado_otra_modalidad':
            mostrarOpcionesTipificacion2(`
                <option value="presencial">Presencial</option>
                <option value="hibrido">Híbrido</option>
            `);
            break;
        case 'sin_disponibilidad_tiempo':
            mostrarOpcionesTipificacion2(`
                <option value="actualmente_estudia">Actualmente estudia</option>
                <option value="temas_laborales">Temas laborales</option>
                <option value="temas_personales">Temas personales</option>
                <option value="tema_salud">Tema salud</option>
            `);
            break;
        case 'inscripto_otro':
            mostrarOpcionesTipificacion2(`
                    <option value="tec">TEC</option>
                    <option value="itam">ITAM</option>
                    <option value="uvm">UVM</option>
                    <option value="panamericana">Panamericana</option>
                    <option value="ibero">IBERO</option>
                    <option value="otro">Otro</option>
                `);
            break;
        default:
            tipificacionn2Container.style.display = 'none';
            break;
        case 'evaluando_propuesta':
            mostrarOpcionesTipificacion2(`
                    <option value="presupuesto">Presupuesto</option>
                    <option value="comparacion_universidades">Comparación con otras Universidades</option>
                    <option value="documento_tramite">Documento en trámite</option>
                    <option value="plan_estudios">Plan de estudios / programa si es de su interés</option>
                    <option value="duracion_programa">Duración del programa</option>
                    <option value="otra_persona">El programa es para otra persona</option>
                    <option value="revalidacion_equivalencia">Busca revalidación/equivalencia</option>
                    <option value="otro">Otro</option>
                    <option value="interesado_potencial">Interesado potencial</option>
                `);
            break;
        case 'no_cumple_requisitos':
            mostrarOpcionesTipificacion2(`
                        <option value="estudios_cursando">Estudios en curso</option>
                        <option value="graduado_sin_documento">Graduado sin documento</option>
                        <option value="documento_tramite">Documento en trámite</option>
                        <option value="carrera_tecnica">Tiene carrera técnica</option>
                        <option value="no_afin">Carrera no es afín</option>
                        <option value="es_extyranjero">Es extranjero</option>
                        <option value="sin_licenciatura">No cuenta con licenciatura</option>
                    `);
            break;
    }
    ocultarElementosComunes();
});

// Manejo del cambio para Tipificación N2 y N3
['tipificacionn2', 'tipificacionn3'].forEach(id => {
    document.getElementById(id).addEventListener('change', function () {
        if (id === 'tipificacionn2') handleTipificacionN2(this.value);
        else handleTipificacionN3(this.value);
    });
});

// Comportamiento dinámico según Tipificación N2
function handleTipificacionN2(value) {
    const elementsToHide = ['documentos-container', 'documentos-popup', 'seguimiento-popup', 'tipificacionn3-container', 'informacion-popup', 'informacion-container'];
    elementsToHide.forEach(id => document.getElementById(id).style.display = 'none');

    const tipificacionn3 = document.getElementById('tipificacionn3');
    tipificacionn3.innerHTML = ''; // Limpiar Tipificación N3

    // Opciones comunes N3
    const opcionesN2 = {
        'busca_curso': ['Modalidad', 'Contenido / plan de estudios', 'Otro programa'],
        '2_ciclos_post': ['Trimestre 1 (ene, feb, mar)', 'Trimestre 2 (abr, may, jun)', 'Trimestre 3 (jul, ago, sep)', 'Trimestre 4 (oct, nov, dic)', 'No especifica'],
        'presupuesto': ['Busca meses sin intereses', 'Busca financiamiento', 'Apoyo empresa', 'Esperando crédito', 'Apoyo tercero', 'Otro'],
        'comparacion_universidades': ['TEC', 'ITAM', 'UVM', 'Panamericana', 'IBERO', 'Otro'],
        'interesado_potencial': ['Evaluando costos', 'Esperando aplicar', 'Evaluando otras opciones', 'Promesa de pago'],
        'no_entra_presupuesto': ['Menos de 3 mil', '3 a 4 mil mensuales', '4 a 5 mil mensuales', 'Más de 5 mil mensuales'],
        'tuvo_percance': ['Personal', 'Familiar', 'Salud', 'Otro'],
        'estudios_curso': ['Bachillerato', 'Licenciatura', 'Servicio Social', 'Otro'],
        // 'graduado_sin_documento': [], // Debe mostrar el popup
        // 'documento_tramite': [], // Debe mostrar el popup
        'carrera_no_afin': ['Con experiencia', 'Sin experiencia'],
        'es_extranjero': ['Documento sin apostillar', 'Sin documento'],
        'actualmente_estudia': ['Curso /Seminario', 'Diplomado', 'Licenciatura', 'Maestría', 'Doctorado', 'Especialidad']
    }; 

    if (opcionesN2[value]) {
        mostrarOpcionesN3(opcionesN2[value]);
        document.getElementById('tipificacionn3-container').style.display = 'block'; // Mostrar Tipificación N3 si hay opciones
    } else {
        switch (value) {
            case 'graduado_sin_documento':
            case 'documento_tramite':
                document.getElementById('documentos-popup').style.display = 'block';
                break;
            case 'es_extranjero':
                mostrarOpcionesN3(opcionesN2['es_extranjero']);
                document.getElementById('tipificacionn3-container').style.display = 'block';
                break;
            // Otros casos como 'estudios_curso', 'carrera_no_afin'
            case 'estudios_curso':
            case 'carrera_no_afin':
                document.getElementById('tipificacionn3-container').style.display = 'block';
                break;
            default:
                // Manejar otros casos si es necesario
                break;
        }
    }
}


// Eventos para resetear Resultado 4
['tipificacionn1', 'tipificacionn2', 'resultado2'].forEach(id => {
    document.getElementById(id).addEventListener('change', resetResultado4);
});

// Función para resetear Resultado 4
function resetResultado4() {
    const statusFinalInput = document.getElementById('statusfinal');
    statusFinalInput.value = ''; // Limpiar valor
    document.getElementById('statusfinal-container').style.display = 'none'; // Ocultar
}

// Maneja el cambio de Tipificación N3 (nivel 3)
function handleTipificacionN3(tipificacionn3Value) {
    const statusFinalContainer = document.getElementById('statusfinal-container');
    const statusFinalInput = document.getElementById('statusfinal');
    const documentosSinApostillarContainer = document.getElementById('documentos-sin-apostillar-container');
    const documentosSinDocumentoContainer = document.getElementById('documentos-sin-documento-container');

    const resetDocumentos = () => {
        ocultarPopup('documentos-sin-apostillar-popup');
        ocultarPopup('documentos-sin-documento-popup');
        documentosSinApostillarContainer.style.display = 'none';
        documentosSinDocumentoContainer.style.display = 'none';
    };

    resetResultado4();
    resetDocumentos();

    if (tipificacionn3Value === 'con_experiencia') {
        statusFinalInput.value = 'Aplica en otro programa';
        statusFinalContainer.style.display = 'block';
    } else if (tipificacionn3Value === 'documento_sin_apostillar') {
        mostrarPopup('documentos-sin-apostillar-popup');
    } else if (tipificacionn3Value === 'sin_documento') {
        mostrarPopup('documentos-sin-documento-popup');
    }
}

// Muestra un popup
function mostrarPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

// Oculta un popup
function ocultarPopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Muestra opciones de Tipificación N3 (nivel 3)
function mostrarOpcionesN3(opciones) {
    const tipificacionn3 = document.getElementById('tipificacionn3');
    document.getElementById('tipificacionn3-container').style.display = 'block';
    tipificacionn3.innerHTML = '<option value="" disabled selected>Selecciona</option>';

    opciones.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.toLowerCase().replace(/ /g, '_');
        optionElement.textContent = opcion;
        tipificacionn3.appendChild(optionElement);
    });
}

// Evento de cambio para Tipificación N3
document.getElementById('tipificacionn3').addEventListener('change', function (event) {
    handleTipificacionN3(event.target.value);
});

// Muestra opciones de Tipificación N3 (nivel 3)
function mostrarOpcionesN3(opciones) {
    const tipificacionn3 = document.getElementById('tipificacionn3');
    const tipificacionn3Container = document.getElementById('tipificacionn3-container');

    if (tipificacionn3 && tipificacionn3Container) {
        tipificacionn3Container.style.display = 'block'; // Mostrar el contenedor del select
        tipificacionn3.innerHTML = '<option value="" disabled selected>Selecciona</option>'; // Resetear opciones

        // Añadir cada opción al select
        opciones.forEach(opcion => {
            const optionElement = document.createElement('option');
            optionElement.value = opcion.toLowerCase().replace(/ /g, '_');
            optionElement.textContent = opcion;
            tipificacionn3.appendChild(optionElement);
        });
    }
}



// Reutilización para manejo de popup de selección y edición
function manejarPopup(guardarBtn, popup, contenedor, listaSeleccionados, obtenerSeleccionados, mensajeVacio) {
    guardarBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const seleccionados = obtenerSeleccionados();
        listaSeleccionados.innerHTML = '';

        if (seleccionados.length === 0) {
            agregarALista(listaSeleccionados, mensajeVacio);
        } else {
            seleccionados.forEach(seleccion => agregarALista(listaSeleccionados, seleccion.text));
        }

        // Ocultar popup y mostrar contenedor
        popup.style.display = 'none';
        contenedor.style.display = 'block';

        // Mostrar el botón de editar
        const editarBtn = contenedor.querySelector('button[id^="editar-"]'); // Selecciona el botón de editar
        if (editarBtn) {
            editarBtn.style.display = 'block'; // Mostrar el botón de editar
        }
    });
}

function editarPopup(editarBtn, popup, contenedor, checkboxes, seleccionados) {
    editarBtn.addEventListener('click', function (event) {
        event.preventDefault();
        contenedor.style.display = 'none';
        popup.style.display = 'block';

        checkboxes.forEach(checkbox => {
            // Marcar la casilla si el ID está en la lista de seleccionados
            checkbox.checked = seleccionados.includes(checkbox.id);
        });
    });
}

function agregarALista(lista, texto) {
    const listItem = document.createElement('li');
    listItem.textContent = texto;
    lista.appendChild(listItem);
}

// Implementación para "Documentos"
const guardarDocumentosBtn = document.getElementById('guardar-documentos');
const documentosPopup = document.getElementById('documentos-popup');
const documentosContainer = document.getElementById('documentos-container');
const documentosSeleccionadosList = document.getElementById('documentos-seleccionados');
const editarDocumentosBtn = document.getElementById('editar-documentos');

let documentosSeleccionados = [];

const obtenerDocumentosSeleccionados = () => {
    const selectedCheckboxes = document.querySelectorAll('#documentos-popup input[type="checkbox"]:checked');
    documentosSeleccionados = [...selectedCheckboxes].map(checkbox => ({ id: checkbox.id, text: checkbox.value }));
    return documentosSeleccionados;
};

manejarPopup(guardarDocumentosBtn, documentosPopup, documentosContainer, documentosSeleccionadosList, obtenerDocumentosSeleccionados, 'No se seleccionaron documentos.');
editarPopup(editarDocumentosBtn, documentosPopup, documentosContainer, document.querySelectorAll('#documentos-popup input[type="checkbox"]'), documentosSeleccionados.map(doc => doc.id));

// Implementación para "Seguimiento"
const guardarSeguimientoBtn = document.getElementById('guardar-seguimiento');
const seguimientoPopup = document.getElementById('seguimiento-popup');
const seguimientoContainer = document.getElementById('seguimiento-container');
const seguimientoSeleccionadosList = document.getElementById('metodo-seleccionado');
const editarSeguimientoBtn = document.getElementById('editar-seguimiento');

let seguimientoSeleccionados = [];

const obtenerSeguimientoSeleccionados = () => {
    const selectedCheckboxes = document.querySelectorAll('#seguimiento-popup input[type="checkbox"]:checked');
    seguimientoSeleccionados = [...selectedCheckboxes].map(checkbox => ({ id: checkbox.id, text: checkbox.value }));
    return seguimientoSeleccionados;
};

manejarPopup(guardarSeguimientoBtn, seguimientoPopup, seguimientoContainer, seguimientoSeleccionadosList, obtenerSeguimientoSeleccionados, 'No se seleccionaron seguimientos.');
editarPopup(editarSeguimientoBtn, seguimientoPopup, seguimientoContainer, document.querySelectorAll('#seguimiento-popup input[type="checkbox"]'), seguimientoSeleccionados.map(item => item.id));

// Implementación para "Documentos sin apostillar"
const guardarDocumentosSinApostillarBtn = document.getElementById('guardar-documentos-sin-apostillar');
const documentosSinApostillarPopup = document.getElementById('documentos-sin-apostillar-popup');
const documentosSinApostillarContainer = document.getElementById('documentos-sin-apostillar-container');
const documentosSeleccionadosSinApostillarList = document.getElementById('documentos-seleccionados-sin-apostillar');
const editarDocumentosSinApostillarBtn = document.getElementById('editar-documentos-sin-apostillar');

let documentosSinApostillarSeleccionados = [];

const obtenerDocumentosSinApostillarSeleccionados = () => {
    const selectedCheckboxes = document.querySelectorAll('#documentos-sin-apostillar-popup input[type="checkbox"]:checked');
    documentosSinApostillarSeleccionados = [...selectedCheckboxes].map(checkbox => ({ id: checkbox.id, text: checkbox.value }));
    return documentosSinApostillarSeleccionados;
};

manejarPopup(guardarDocumentosSinApostillarBtn, documentosSinApostillarPopup, documentosSinApostillarContainer, documentosSeleccionadosSinApostillarList, obtenerDocumentosSinApostillarSeleccionados, 'No se seleccionaron documentos sin apostillar.');
editarPopup(editarDocumentosSinApostillarBtn, documentosSinApostillarPopup, documentosSinApostillarContainer, document.querySelectorAll('#documentos-sin-apostillar-popup input[type="checkbox"]'), documentosSinApostillarSeleccionados.map(doc => doc.id));

// Implementación para "Documentos Sin Documento"
const guardarDocumentosSinDocumentoBtn = document.getElementById('guardar-documentos-sin-documento');
const documentosSinDocumentoPopup = document.getElementById('documentos-sin-documento-popup');
const documentosSinDocumentoContainer = document.getElementById('documentos-sin-documento-container');
const documentosSeleccionadosSinDocumentoList = document.getElementById('documentos-seleccionados-sin-documento');
const editarDocumentosSinDocumentoBtn = document.getElementById('editar-documentos-sin-documento');

let documentosSinDocumentoSeleccionados = [];

const obtenerDocumentosSinDocumentoSeleccionados = () => {
    const selectedCheckboxes = document.querySelectorAll('#documentos-sin-documento-popup input[type="checkbox"]:checked');
    documentosSinDocumentoSeleccionados = [...selectedCheckboxes].map(checkbox => ({ id: checkbox.id, text: checkbox.value }));
    return documentosSinDocumentoSeleccionados;
};

manejarPopup(guardarDocumentosSinDocumentoBtn, documentosSinDocumentoPopup, documentosSinDocumentoContainer, documentosSeleccionadosSinDocumentoList, obtenerDocumentosSinDocumentoSeleccionados, 'No se seleccionaron documentos sin documento.');
editarPopup(editarDocumentosSinDocumentoBtn, documentosSinDocumentoPopup, documentosSinDocumentoContainer, document.querySelectorAll('#documentos-sin-documento-popup input[type="checkbox"]'), documentosSinDocumentoSeleccionados.map(doc => doc.id));

// Implementación para "Solo buscaba información"
const guardarSoloInfoBtn = document.getElementById('guardar-solo-info');
const soloInfoPopup = document.getElementById('solo-info-popup');
const soloInfoContainer = document.getElementById('solo-info-container');
const soloInfoSeleccionadosList = document.getElementById('solo-info-seleccionados');
const editarSoloInfoBtn = document.getElementById('editar-solo-info');

let soloInfoSeleccionados = [];

// Función para obtener los checkboxes seleccionados del popup
const obtenerSoloInfoSeleccionados = () => {
    const selectedCheckboxes = document.querySelectorAll('#solo-info-popup input[type="checkbox"]:checked');
    soloInfoSeleccionados = [...selectedCheckboxes].map(checkbox => ({ id: checkbox.id, text: checkbox.value }));
    return soloInfoSeleccionados;
};

// Usar las funciones manejarPopup y editarPopup para "Solo buscaba información"
manejarPopup(guardarSoloInfoBtn, soloInfoPopup, soloInfoContainer, soloInfoSeleccionadosList, obtenerSoloInfoSeleccionados, 'No se seleccionó ninguna información.');
editarPopup(editarSoloInfoBtn, soloInfoPopup, soloInfoContainer, document.querySelectorAll('#solo-info-popup input[type="checkbox"]'), soloInfoSeleccionados.map(info => info.id));
