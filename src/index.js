document.getElementById('resultado2').addEventListener('change', function () {
    const resultado2Value = this.value;
    const tipificacionn1Container = document.getElementById('tipificacionn1-container');
    const tipificacionn1 = document.getElementById('tipificacionn1');
    const tipificacionn2Container = document.getElementById('tipificacionn2-container');
    const tipificacionn2 = document.getElementById('tipificacionn2');
    const tipificacionn3Container = document.getElementById('tipificacionn3-container');
    const tipificacionn3 = document.getElementById('tipificacionn3');

    // Ocultar Tipificación N2 y N3 y limpiar sus opciones cada vez que se cambie "Resultado 2*"
    tipificacionn2Container.style.display = 'none';
    tipificacionn2.innerHTML = ''; // Limpia el contenido de Tipificación N2
    tipificacionn3Container.style.display = 'none'; // Ocultar Tipificación N3
    tipificacionn3.innerHTML = ''; // Limpiar Tipificación N3

    if (resultado2Value === 'interesado') {
        // Mostrar Tipificación N1 y agregar las opciones correspondientes para "Interesado"
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="agenda_sig_ciclo">Agenda para siguiente ciclo - Lost/Hold</option>
            <option value="evaluando_propuesta">Evaluando propuesta - Open</option>
            <option value="referido">Referido - Open</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
            <option value="lead_repetido">Lead repetido - Lost</option>
        `;
    } else if (resultado2Value === 'no_efectivo') {
        // Mostrar Tipificación N1 con las opciones para "No efectivo"
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
    } else {
        // Ocultar Tipificación N1 si no es "Interesado" ni "No efectivo"
        tipificacionn1Container.style.display = 'none';
        document.getElementById('tipificacionn2-container').style.display = 'none';
        document.getElementById('tipificacionn3-container').style.display = 'none';
    }
    // Siempre oculta el popup y la lista de documentos cuando cambia "Resultado 2*"
    if (resultado2Value !== '') {
        document.getElementById('documentos-popup').style.display = 'none';
        document.getElementById('documentos-container').style.display = 'none';

        // También oculta Tipificación N3 cuando cambia el valor de Resultado 2
        document.getElementById('tipificacionn3-container').style.display = 'none';
        document.getElementById('tipificacionn3').innerHTML = ''; // Limpia Tipificación N3 si es necesario

        // También oculta el popup y método de seguimiento cuando cambia "Resultado 2*"
        document.getElementById('seguimiento-popup').style.display = 'none';
        document.getElementById('seguimiento-container').style.display = 'none';
    }
});

// Evento para Tipificación N1 (nivel 1)
document.getElementById('tipificacionn1').addEventListener('change', function () {
    const tipificacionn1Value = this.value;
    const tipificacionn2Container = document.getElementById('tipificacionn2-container');
    const tipificacionn2 = document.getElementById('tipificacionn2');
    const documentosContainer = document.getElementById('documentos-container');
    const documentosPopup = document.getElementById('documentos-popup');
    const tipificacionn3Container = document.getElementById('tipificacionn3-container'); // Para ocultar Tipificación N3

    // Ocultar el campo "Seguimiento" y Tipificación N3 al cambiar la selección de Tipificación N1
    seguimientoContainer.style.display = 'none';
    seguimientoPopup.style.display = 'none';
    document.getElementById('metodo-seleccionado').value = '';

    // Ocultar el campo "Documentos" y Tipificación N3 al cambiar la selección de Tipificación N1
    documentosContainer.style.display = 'none'; // Oculta el contenedor de Documentos
    documentosPopup.style.display = 'none'; // Oculta el popup de Documentos
    document.getElementById('documentos-seleccionados').value = ''; // Limpia el campo "Documentos"

    // Ocultar Tipificación N3 y limpiar su contenido
    tipificacionn3Container.style.display = 'none'; // Oculta Tipificación N3
    tipificacionn3.innerHTML = ''; // Limpia Tipificación N3

    // Limpiar Tipificación N2 al cambiar la selección de Tipificación N1
    tipificacionn2.innerHTML = ''; // Limpia Tipificación N2 por si se ha seleccionado otra opción antes

    // Condición para "Evaluando propuesta"
    if (tipificacionn1Value === 'evaluando_propuesta') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="presupuesto">Presupuesto</option>
            <option value="comparacion_universidades">Comparación con otras Universidades</option>
            <option value="documento_tramite">Documento en trámite</option>
            <option value="plan_estudios">Plan de estudios / programa si es de su interés</option>
            <option value="duracion_programa">Duración del programa</option>
            <option value="otra_persona">El programa es para otra persona</option>
            <option value="revalidacion_equivalencia">Busca revalidación/equivalencia</option>
            <option value="otro">Otro</option>
            <option value="interesado_potencial">Interesado potencial</option>
        `;
    }
    // Condición para "Agenda para siguiente ciclo"
    else if (tipificacionn1Value === 'agenda_sig_ciclo') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="proximo_ciclo">Próximo ciclo</option>
            <option value="2_ciclos_post">2 ciclos posteriores o más</option>
        `;
    }
    // Condición para "Referido - Open"
    else if (tipificacionn1Value === 'referido') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="universidad">Universidad</option>
            <option value="amigo_familiar">Amigo / Familiar</option>
            <option value="empresa">Empresa</option>
        `;
    }
    // Condición para "Se agenda a peticición del aspirante - Open"
    else if (tipificacionn1Value === 'agenda_peticion_aspirante') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="seguimiento">Seguimiento</option>
        `;
    }
    // Condición para "Número equivocado - Lost / Hold"
    else if (tipificacionn1Value === 'numero_equivocado') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="no_lo_conocen">No lo conocen</option>
            <option value="familiar_amigo">Es familiar / amigo</option>
            <option value="no_especifica">No especifica</option>
        `;
    }
    // Condición para "Lead Repetido - Lost"
    else if (tipificacionn1Value === 'lead_repetido') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="atencion_otro_lead">Atención en otro lead / más de un registro</option>
        `;
    }
    // Nueva condición para "No se registró - Lost / Hold"
    else if (tipificacionn1Value === 'no_se_registro') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="vio_tik_tok">Vió un tik tok</option>
            <option value="busca_trabajo">Busca trabajo</option>
            <option value="publicidad_enganosa">Publicidad engañosa</option>
            <option value="otro">Otro</option>
        `;
    }
    // Si no es ninguna de las opciones relevantes, ocultar Tipificación N2
    else {
        tipificacionn2Container.style.display = 'none';
    }
});

// Evento para Tipificación N2 (nivel 2)
document.getElementById('tipificacionn2').addEventListener('change', function () {
    const tipificacionn2Value = this.value;
    const tipificacionn3Container = document.getElementById('tipificacionn3-container');
    const tipificacionn3 = document.getElementById('tipificacionn3');
    const documentosContainer = document.getElementById('documentos-container');
    const documentosPopup = document.getElementById('documentos-popup');
    const seguimientoPopup = document.getElementById('seguimiento-popup');

    // Ocultar el campo "Documentos" al cambiar la selección de Tipificación N2
    documentosContainer.style.display = 'none'; // Ocultar documentos container al inicio
    documentosPopup.style.display = 'none'; // Ocultar el popup de documentos al inicio
    document.getElementById('documentos-seleccionados').innerHTML = ''; // Limpiar el campo "Documentos"

    if (tipificacionn2Value === '2_ciclos_post') {
        // Mostrar Tipificación N3 con las opciones correspondientes
        tipificacionn3Container.style.display = 'block';
        tipificacionn3.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="trimestre_1">Trimestre 1 (ene, feb, mar)</option>
            <option value="trimestre_2">Trimestre 2 (abril, mayo, jun)</option>
            <option value="trimestre_3">Trimestre 3 (jul, ago, sep)</option>
            <option value="trimestre_4">Trimestre 4 (oct, nov, dic)</option>
            <option value="no_especifica">No especifica</option>
        `;
    }
    // Condición: Mostrar opciones específicas si el valor de Tipificación N2 es "Presupuesto"
    else if (tipificacionn2Value === 'presupuesto') {
        tipificacionn3Container.style.display = 'block';
        tipificacionn3.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="meses_sin_intereses">Busca meses sin intereses</option>
            <option value="busca_financiamiento">Busca financiamiento / Convenio con la universidad</option>
            <option value="empresa_apoya">Lo apoyará su empresa</option>
            <option value="espera_credito">En espera que le aprueben un crédito</option>
            <option value="tercero_apoya">Lo apoyará un tercero / Tercero toma decisión</option>
            <option value="otro">Otro</option>
        `;
    }

    // Nueva condición: Mostrar opciones si el valor de Tipificación N2 es "Comparación con otras Universidades"
    else if (tipificacionn2Value === 'comparacion_universidades') {
        tipificacionn3Container.style.display = 'block';
        tipificacionn3.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="tec">TEC</option>
            <option value="itam">ITAM</option>
            <option value="uvm">UVM</option>
            <option value="panamericana">Panamericana</option>
            <option value="ibero">IBERO</option>
            <option value="otro">Otro</option>
        `;
    }
    // Nueva condición: Mostrar opciones si el valor de Tipificación N2 es "Interesado potencial"
    else if (tipificacionn2Value === 'interesado_potencial') {
        tipificacionn3Container.style.display = 'block';
        tipificacionn3.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="evaluando_costos">Evaluando costos</option>
            <option value="espera_fecha_aplicar">En espera de fecha para aplicar solicitud</option>
            <option value="evaluando_otras_opciones">Evaluando otras opciones</option>
            <option value="promesa_de_pago">Promesa de pago</option>
        `;
    }

    // Si se selecciona "Documento en trámite"
    else if (tipificacionn2Value === 'documento_tramite') {
        // Ocultar Tipificación N3 y mostrar solo el popup
        tipificacionn3Container.style.display = 'none'; // Ocultar Tipificación N3
        documentosPopup.style.display = 'block'; // Muestra el popup de documentos
        documentosContainer.style.display = 'none'; // Asegúrate de ocultar el contenedor de documentos
    }

    // Ocultar Tipificación N3 si no se selecciona "2 ciclos post" ni "Presupuesto"
    else {
        tipificacionn3Container.style.display = 'none';
    }

    // Lógica para mostrar documentos si es necesario
    if (tipificacionn2Value === 'documento_tramite') {
        documentosPopup.style.display = 'block'; // Muestra el popup de documentos
    }

    // Ocultar el popup de documentos
    documentosPopup.style.display = 'none';

    // Mostrar el contenedor de documentos seleccionados
    documentosContainer.style.display = 'block';
});

// Referencias a los elementos relevantes
const guardarDocumentosBtn = document.getElementById('guardar-documentos');
const documentosContainer = document.getElementById('documentos-container');
const documentosPopup = document.getElementById('documentos-popup');
const documentosSeleccionadosList = document.getElementById('documentos-seleccionados');
const editarDocumentosBtn = document.getElementById('editar-documentos');

// Almacenar los documentos seleccionados
let documentosSeleccionados = [];

// Función para agregar un elemento a la lista de documentos
function agregarDocumentoALista(texto) {
    const listItem = document.createElement('li');
    listItem.textContent = texto;
    documentosSeleccionadosList.appendChild(listItem);
}

// Evento para el botón Guardar
guardarDocumentosBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado de envío de formulario

    // Obtener todos los checkboxes seleccionados
    const selectedCheckboxes = document.querySelectorAll('#documentos-popup input[type="checkbox"]:checked');
    
    // Limpiar la lista anterior antes de agregar nuevos elementos
    documentosSeleccionadosList.innerHTML = '';
    documentosSeleccionados = []; // Vaciar la lista de documentos seleccionados

    // Si no se selecciona ningún documento, muestra un mensaje
    if (selectedCheckboxes.length === 0) {
        agregarDocumentoALista('No se seleccionaron documentos.');
    } else {
        // Recorrer los checkboxes seleccionados y agregarlos a la lista de documentos seleccionados
        selectedCheckboxes.forEach(checkbox => {
            documentosSeleccionados.push(checkbox.id); // Almacenar el ID del checkbox seleccionado
            agregarDocumentoALista(checkbox.value); // Utiliza la función para añadir documentos
        });
    }

    // Ocultar el popup de documentos
    documentosPopup.style.display = 'none';

    // Mostrar el contenedor de documentos seleccionados
    documentosContainer.style.display = 'block';
});

// Evento para el botón "Editar" que permite modificar los documentos seleccionados
editarDocumentosBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    // Mostrar el popup para reseleccionar documentos
    documentosContainer.style.display = 'none';
    documentosPopup.style.display = 'block';

    // Restaurar las selecciones anteriores en los checkboxes
    const allCheckboxes = document.querySelectorAll('#documentos-popup input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = documentosSeleccionados.includes(checkbox.id); // Restaurar los checkboxes seleccionados
    });
});
