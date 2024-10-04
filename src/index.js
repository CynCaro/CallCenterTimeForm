document.getElementById('resultado2').addEventListener('change', function () {
    const resultado2Value = this.value;
    const tipificacionn1Container = document.getElementById('tipificacionn1-container');
    const tipificacionn1 = document.getElementById('tipificacionn1');

    if (resultado2Value === 'interesado') {
        // Mostrar Tipificación N1 y agregar las opciones correspondientes
        tipificacionn1Container.style.display = 'block';
        tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="agenda_sig_ciclo">Agenda para siguiente ciclo - Lost/Hold</option>
            <option value="evaluando_propuesta">Evaluando propuesta - Open</option>
            <option value="referido">Referido - Open</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Open</option>
            <option value="lead_repetido">Lead repetido - Lost</option>
        `;
    } else {
        // Ocultar Tipificación N1 si no selecciona "Interesado"
        tipificacionn1Container.style.display = 'none';
        document.getElementById('tipificacionn2-container').style.display = 'none';
        document.getElementById('tipificacionn3-container').style.display = 'none';
    }
    // Ocultar el popup y la lista de documentos si el usuario cambia "Resultado 2*"
    if (resultado2Value !== '') {
        document.getElementById('documentos-popup').style.display = 'none';
        document.getElementById('documentos-container').style.display = 'none';
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

    // Ocultar el campo "Documentos" y Tipificación N3 al cambiar la selección de Tipificación N1
    documentosContainer.style.display = 'none';
    documentosPopup.style.display = 'none';
    document.getElementById('documentos-seleccionados').value = ''; // Limpiar el campo "Documentos"
    tipificacionn3Container.style.display = 'none'; // Ocultar Tipificación N3
    tipificacionn2.innerHTML = ''; // Limpiar Tipificación N2 por si se ha seleccionado otra opción antes

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
    // Nueva condición para "Referido - Open"
    else if (tipificacionn1Value === 'referido') {
        tipificacionn2Container.style.display = 'block';
        tipificacionn2.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="universidad">Universidad</option>
            <option value="amigo_familiar">Amigo / Familiar</option>
            <option value="empresa">Empresa</option>
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

    // Ocultar el campo "Documentos" al cambiar la selección de Tipificación N2
    documentosContainer.style.display = 'none';
    documentosPopup.style.display = 'none';
    document.getElementById('documentos-seleccionados').value = ''; // Limpiar el campo "Documentos"

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
    // Mostrar opciones específicas si el valor de Tipificación N2 es "Presupuesto"
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

    // Ocultar Tipificación N3 si no se selecciona "2 ciclos post" ni "Presupuesto"
    else {
        tipificacionn3Container.style.display = 'none';
    }

    // Lógica para mostrar documentos si es necesario
    if (tipificacionn2Value === 'documento_tramite') {
        documentosContainer.style.display = 'block';
        documentosPopup.style.display = 'block'; // Muestra el popup de documentos
    } else {
        documentosContainer.style.display = 'none'; // Oculta documentos si no aplica
        documentosPopup.style.display = 'none'; // Oculta el popup de documentos
    }
});

// Evento para guardar los documentos seleccionados
document.getElementById('guardar-documentos').addEventListener('click', function () {
    const documentosSeleccionados = [];

    // Obtener el estado de cada checkbox
    const documentosCheckboxes = document.querySelectorAll('#documentos-popup input[type="checkbox"]');
    documentosCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            documentosSeleccionados.push(checkbox.value); // Añadir documento seleccionado
        }
    });

    // Mostrar los documentos seleccionados en la lista
    const documentosLista = document.getElementById('documentos-seleccionados');
    documentosLista.innerHTML = ''; // Limpiar la lista antes de añadir los documentos

    if (documentosSeleccionados.length > 0) {
        documentosSeleccionados.forEach(documento => {
            const listItem = document.createElement('li');
            listItem.textContent = documento;
            documentosLista.appendChild(listItem); // Añadir cada documento seleccionado como un <li>
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No se seleccionaron documentos.';
        documentosLista.appendChild(listItem);
    }

    // Ocultar el popup y mostrar la lista de documentos seleccionados
    document.getElementById('documentos-popup').style.display = 'none';
    document.getElementById('documentos-container').style.display = 'block';
});

// Evento para editar los documentos (volver a mostrar el popup)
document.getElementById('editar-documentos').addEventListener('click', function () {
    // Mostrar el popup y ocultar la lista de documentos
    document.getElementById('documentos-popup').style.display = 'block';
    document.getElementById('documentos-container').style.display = 'none';
});
