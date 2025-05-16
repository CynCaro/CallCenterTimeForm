// Función para mostrar las opciones en un <select> y asegurar que el contenedor sea visible
const mostrarOpciones = (selectId, options) => {
  const selectElement = document.getElementById(selectId);
  if (selectElement) {
    selectElement.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            ${options
              .map(
                (option) =>
                  `<option value="${option.value}">${option.text}</option>`
              )
              .join("")}
        `;
    selectElement.parentElement.parentElement.style.display = "block"; // Mostrar el contenedor que envuelve al select
  }
};

// Función para generar checkboxes dinámicamente en un contenedor
const generarCheckboxes = (containerId, opciones) => {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos checkboxes

  opciones.forEach((opcion) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = opcion.value;
    checkbox.value = opcion.text;

    const label = document.createElement("label");
    label.htmlFor = opcion.value;
    label.innerText = opcion.text;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
};

// Función para ocultar popups relacionados
const ocultarTodosLosPopups = () => {
  const popups = [
    "doc-dig-popup",
    "doc-dig-container",
    "documentos-popup",
    "documentos-container",
    "seguimiento-popup",
    "seguimiento-container",
    "documentos-sin-apostillar-popup",
    "documentos-sin-apostillar-container",
    "documentos-sin-documento-popup",
    "documentos-sin-documento-container",
    "informacion-popup",
    "informacion-container",
  ];

  popups.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });
};

// Función genérica para limpiar los checkboxes dentro de un contenedor
function limpiarCheckboxes(contenedorID) {
  document
    .querySelectorAll(`#${contenedorID} input[type="checkbox"]`)
    .forEach((checkbox) => {
      checkbox.checked = false; // Deseleccionar todas las opciones
    });
}

// Función para ocultar Tipificación 1, 2, 3, 4 y limpiar sus selecciones
const ocultarTipificaciones = () => {
  const tipificacionn1Container = document.getElementById(
    "tipificacionn1-container"
  );
  const tipificacionn2Container = document.getElementById(
    "tipificacionn2-container"
  );
  const tipificacionn3Container = document.getElementById(
    "tipificacionn3-container"
  );
  const tipificacionn4Container = document.getElementById(
    "tipificacionn4-container"
  ); // Tipificación N4 (Modalidad)

  // Ocultar Tipificación 1, 2, 3 y 4
  tipificacionn1Container.style.display = "none";
  tipificacionn2Container.style.display = "none";
  tipificacionn3Container.style.display = "none";
  tipificacionn4Container.style.display = "none";

  // Limpiar las opciones de Tipificación 1, 2 y 3
  document.getElementById("tipificacionn1").innerHTML = "";
  document.getElementById("tipificacionn2").innerHTML = "";
  document.getElementById("tipificacionn3").innerHTML = "";
  document.getElementById("tipificacionn4").innerHTML =
    '<option value="" disabled selected>Selecciona</option>';
};

// Función para reiniciar el campo statuslast
const reiniciarStatusFinal = () => {
  const statusFinalInput = document.getElementById("statuslast");
  statusFinalInput.value = ""; // Limpiar el campo statuslast
};

const limpiarCamposDependientes = () => {
  document.getElementById("interes").value = ""; // Limpiar Interés del lead
  document.getElementById("proximaactividad").value = ""; // Limpiar Próxima comunicación
  document.getElementById("fechaproxact").value = ""; // Limpiar Fecha próxima comunicación
  document.getElementById("horaproxact").value = ""; // Limpiar Hora próxima comunicación
  document.getElementById("descripcion").value = ""; // Limpiar Descripción de comunicación
  document.getElementById("tipificacionn4-container").style.display = "none"; // Ocultar Tipificación N4 (Modalidad)
};

// --- NUEVA función para desactivar campos de comunicación ---
function actualizarEstadoCamposComunicacion() {
  const statusFinalInput = document.getElementById("statuslast");
  const fechaEnvio = document.getElementById("fechaproxact");
  const horaEnvio = document.getElementById("horaproxact");
  const proximaComunicacion = document.getElementById("proximaactividad");

  const tipificacionN3Text = document.getElementById("tipificacionn3").selectedOptions[0]?.text || "";
  const tipificacionN4Text = document.getElementById("tipificacionn4")?.selectedOptions[0]?.text || "";

  const desactivar =
    tipificacionN3Text.includes("Asignar agente de retención") ||
    tipificacionN4Text.includes("Asignar agente de retención");

  if (desactivar) {
    fechaEnvio.disabled = true;
    fechaEnvio.value = "";
    horaEnvio.disabled = true;
    horaEnvio.value = "";
    proximaComunicacion.disabled = true;
    proximaComunicacion.value = "";
    statusFinalInput.disabled = false;
  } else {
    fechaEnvio.disabled = false;
    horaEnvio.disabled = false;
    proximaComunicacion.disabled = false;
    statusFinalInput.disabled = true;
  }
}

// Inicializar todo
document.addEventListener("DOMContentLoaded", () => {
    ocultarTodosLosPopups(); // ✅ Ocultar todos los contenedores al cargar la página
  });  

//>>> 1)ESTATUS DEL CONTACTO* <<<
// Constantes para opciones de Tipo de contacto y Resultado 2
const CONTACTADO = "contactado";
const NO_CONTACTADO = "no_contactado";
const SEGUIMIENTO_DOCUMENTOS = "seguimiento_documentos";

// >>> 1) ESTATUS DEL CONTACTO <<<
document.getElementById("resultado1").addEventListener("change", function () {
  const selectedValue = this.value;
  const tipoContactoContainer = document.getElementById("tipocontacto-container");
  const tipoContacto = document.getElementById("tipocontacto");
  const resultado2Container = document.getElementById("resultado2-container");
  const resultado2 = document.getElementById("resultado2");

  if (selectedValue === CONTACTADO || selectedValue === NO_CONTACTADO) {
    tipoContactoContainer.style.display = "block";
    tipoContacto.disabled = false;

    tipoContacto.innerHTML = `
      <option value="" disabled selected>Selecciona</option>
      <option value="${SEGUIMIENTO_DOCUMENTOS}">Seguimiento documentos</option>
    `;

    resultado2Container.style.display = "none";
    resultado2.value = "";

    limpiarCamposDependientes();
    reiniciarStatusFinal();
    ocultarTipificaciones();
    ocultarTodosLosPopups();
  } else {
    tipoContactoContainer.style.display = "none";
    tipoContacto.innerHTML = `<option value="" disabled selected>Selecciona</option>`;
    tipoContacto.disabled = true;

    resultado2Container.style.display = "none";
    resultado2.value = "";

    ocultarTipificaciones();
    ocultarTodosLosPopups();
  }
});

// >>> 2) RESPUESTA DEL LEAD <<<
document.getElementById("tipocontacto").addEventListener("change", function () {
  const selectedValue = this.value;
  const resultado2Container = document.getElementById("resultado2-container");
  const resultado2 = document.getElementById("resultado2");
  const resultado1Value = document.getElementById("resultado1").value;

  reiniciarStatusFinal();
  ocultarTipificaciones();
  ocultarTodosLosPopups();
  resultado2Container.style.display = "none";
  resultado2.value = "";

  if (selectedValue === SEGUIMIENTO_DOCUMENTOS) {
    let opcionesResultado2 = "";

    if (resultado1Value === NO_CONTACTADO) {
      opcionesResultado2 = `<option value="no_contesta">No contesta</option>`;
    } else if (resultado1Value === CONTACTADO) {
      opcionesResultado2 = `
        <option value="interesado">Interesado</option>
        <option value="no_efectivo">No efectivo</option>
        <option value="no_interesado">No interesado</option>
      `;
    }

    resultado2.innerHTML = `
      <option value="" disabled selected>Selecciona</option>
      ${opcionesResultado2}
    `;
    resultado2Container.style.display = "block";
  } else {
    resultado2Container.style.display = "none";
    resultado2.value = "";
  }

  limpiarCamposDependientes();
});

// >>> 3) TIPIFICACIÓN N1 <<<
const handleTipificacionN1Change = (tipificacionN2Options) => {
  const tipificacionN1 = document.getElementById("tipificacionn1");
  const tipificacionN2 = document.getElementById("tipificacionn2");
  const statusFinalInput = document.getElementById("statuslast");
  const fechaEnvio = document.getElementById("fechaproxact");
  const horaEnvio = document.getElementById("horaproxact");
  const informacionPopup = document.getElementById("informacion-popup");

  tipificacionN1.addEventListener("change", function () {
    const selectedText = this.options[this.selectedIndex].text;
    const selectedValue = this.value;

    const partes = selectedText.split("-");
    if (partes.length > 1) {
      const estadoFinal = partes[1].trim();
      statusFinalInput.value = estadoFinal;
      statusFinalInput.setAttribute("data-from-n1", "true");
    } else {
      statusFinalInput.value = "";
      statusFinalInput.setAttribute("data-from-n1", "false");
    }

    // Resultado 2 dinámico si es Seguimiento documentos
    const resultado1Value = document.getElementById("resultado1").value;
    const tipoContactoValue = document.getElementById("tipocontacto").value;
    const resultado2 = document.getElementById("resultado2");

    if (tipoContactoValue === SEGUIMIENTO_DOCUMENTOS) {
      let opcionesResultado2 = "";

      if (resultado1Value === NO_CONTACTADO) {
        opcionesResultado2 = `
          <option value="no_contesta">No contesta</option>
        `;
      } else if (resultado1Value === CONTACTADO) {
        opcionesResultado2 = `
          <option value="interesado">Interesado</option>
          <option value="no_efectivo">No efectivo</option>
          <option value="no_interesado">No interesado</option>
        `;
      }
    }

    // Reset de campos
    tipificacionN2.innerHTML = '<option value="" disabled selected>Selecciona</option>';
    document.getElementById("tipificacionn3").innerHTML = '<option value="" disabled selected>Selecciona</option>';
    document.getElementById("tipificacionn3-container").style.display = "none";
    fechaEnvio.value = "";
    horaEnvio.value = "";
    document.getElementById("descripcion").value = "";
    guardarButton.disabled = true;

    // Desactivación condicional
    // const proximaComunicacion = document.getElementById("proximaactividad");
    // const resultado2Value = document.getElementById("resultado2").value;

    // const desactivarComunicacion =
    //   selectedText.includes("Asignar agente de retención") ||
    //   resultado2Value === "asignar_agente_retencion";

    // if (desactivarComunicacion) {
    //   fechaEnvio.disabled = true;
    //   fechaEnvio.value = "";
    //   horaEnvio.disabled = true;
    //   horaEnvio.value = "";
    //   proximaComunicacion.disabled = true;
    //   proximaComunicacion.value = "";
    //   statusFinalInput.disabled = false;
    // } else {
    //   fechaEnvio.disabled = false;
    //   horaEnvio.disabled = false;
    //   proximaComunicacion.disabled = false;
    //   statusFinalInput.disabled = true;
    // }

    limpiarCamposDependientes();

    tipificacionN2.innerHTML = '<option value="" disabled selected>Selecciona</option>';
    document.getElementById("tipificacionn3").innerHTML = '<option value="" disabled selected>Selecciona</option>';
    document.getElementById("tipificacionn3-container").style.display = "none";

    // Ocultar popups excepto información
    [
      "doc-dig-popup",
      "doc-dig-container",
      "documentos-popup",
      "documentos-container",
      "documentos-sin-apostillar-popup",
      "documentos-sin-documento-popup",
      "documentos-sin-apostillar-container",
      "documentos-sin-documento-container",
      "informacion-popup",
      "informacion-container",
    ].forEach((id) => {
      if (id !== "informacion-popup") {
        document.getElementById(id).style.display = "none";
        limpiarCheckboxes(id);
      }
    });

    // Mostrar u ocultar el popup de información
    if (informacionPopup.style.display === "block" && selectedValue !== "solo_informacion") {
      informacionPopup.style.display = "none";
      limpiarCheckboxes("informacion-popup");
    }

    resetResultado4();

    if (selectedValue === "solo_informacion") {
      console.log("Mostrando el popup de Solo buscaba información");
      informacionPopup.style.display = "block";
      document.getElementById("tipificacionn2-container").style.display = "none";
    } else if (tipificacionN2Options[selectedValue]) {
      mostrarOpciones("tipificacionn2", tipificacionN2Options[selectedValue]);
      document.getElementById("tipificacionn2-container").style.display = "block";
    } else {
      document.getElementById("tipificacionn2-container").style.display = "none";
    }
  });
};


const handleTipificacionN2Change = (tipificacionN3Options) => {
  const tipificacionN2 = document.getElementById("tipificacionn2");
  const tipificacionN3 = document.getElementById("tipificacionn3");
  const tipificacionN3Container = document.getElementById(
    "tipificacionn3-container"
  );
  const tipificacionN4 = document.getElementById("tipificacionn4");
  const tipificacionN4Container = document.getElementById(
    "tipificacionn4-container"
  );
  const statusFinalInput = document.getElementById("statuslast");
  const documentacionDigital = document.getElementById("doc-dig-popup");
  const docDigResumen = document.getElementById("doc-dig-container");

  tipificacionN2.addEventListener("change", function () {
    const selectedText = this.options[this.selectedIndex].text;
    const selectedValue = this.value;
    console.log("Tipificación N2 seleccionada:", selectedValue); // Agrega esto
  
    // 🔹 Ocultar y limpiar TODOS los popups posibles
    [
      "doc-dig-popup",
      "documentos-popup",
      "seguimiento-popup",
      "documentos-sin-apostillar-popup",
      "documentos-sin-documento-popup"
    ].forEach(id => {
      const popup = document.getElementById(id);
      if (popup) {
        popup.style.display = "none";
        limpiarCheckboxes(id);
      }
    });
  
    [
      "doc-dig-container",
      "documentos-container",
      "seguimiento-container",
      "documentos-sin-apostillar-container",
      "documentos-sin-documento-container"
    ].forEach(id => {
      const cont = document.getElementById(id);
      if (cont) cont.style.display = "none";
    });
  
    // 🔹 Resetear campos
    resetResultado4();
    limpiarCamposDependientes();
    tipificacionN4.innerHTML = '<option value="" disabled selected>Selecciona</option>';
    tipificacionN4Container.style.display = "none";
  
    if (docDigResumen) {
      docDigResumen.style.display = "none";
      document.getElementById("doc-dig-seleccionada").innerHTML = "";
    }
  
    // 🔹 Asignar status final si aplica
    if (
      statusFinalInput.getAttribute("data-from-n1") === "false" ||
      statusFinalInput.value === ""
    ) {
      const partes = selectedText.split("-");
      const estadoFinal = partes.length > 1 ? partes[1].trim() : "";
      statusFinalInput.value = estadoFinal;
    }
  
    // 🔹 Mostrar popup de Documentación digital (doc-dig-popup)
    const valoresDocDig = ["ins_doc_dig_pen", "aplica_carta_compromiso"];
    if (valoresDocDig.includes(selectedValue)) {
        const popup = documentacionDigital;
    if (popup) popup.style.display = "block";
    }
     

    // 🔹 Mostrar popup de Documentos (documentos-popup)
    if (selectedValue === "inscrito_doc_faltante") {
        const popup = document.getElementById("documentos-popup");
    if (popup) popup.style.display = "block";
    }

    // 🔹 Mostrar popup de Seguimiento (seguimiento-popup)
    if (selectedValue === "seguimiento_inscripcion") {
        const popup = document.getElementById("seguimiento-popup");
    if (popup) popup.style.display = "block";
    // No mostramos el contenedor hasta dar clic en Guardar
  }  
  
    // 🔹 Tipificación N3
    if (tipificacionN3Options[selectedValue]) {
      mostrarOpciones("tipificacionn3", tipificacionN3Options[selectedValue]);
      tipificacionN3Container.style.display = "block";
    } else {
    tipificacionN3.innerHTML = '<option value="" disabled selected>Selecciona</option>';
    tipificacionN3Container.style.display = "none";
    }
    console.log("selectedValue N2:", selectedValue);
console.log("Tiene opciones en tipificacionN3?", !!tipificacionN3Options[selectedValue]);

    // ✅ Verificar si se deben reactivar o seguir desactivados los campos de comunicación
    actualizarEstadoCamposComunicacion();
  });

  // Ocultar todos los popups si cambia tipificaciónN1 o resultado2
["tipificacionn1", "resultado2"].forEach((id) => {
    document
    .getElementById(id)
    .addEventListener("change", ocultarTodosLosPopups);
});
};

const guardarBtn = document.getElementById("guardar-doc-digital");
guardarBtn.addEventListener("click", () => {
  const tipificacionN2 = document.getElementById("tipificacionn2").value;
  const tipificacionN4 = document.getElementById("tipificacionn4");
  const tipificacionN4Container = document.getElementById("tipificacionn4-container");

  // Validamos si algún campo de los 3 está presente y "activo"
  const seleccionados = [
    document.getElementById("cedula_profesional"),
    document.getElementById("certificado_licenciatura"),
    document.getElementById("titulo"),
  ].filter(cb => cb && cb.checked);

  // Si hay al menos uno seleccionado
  if (seleccionados.length > 0) {
    if (tipificacionN2 === "aplica_carta_compromiso") {
      mostrarOpcionesTipificacionN4(
        [
          { value: "espera_admision", text: "En espera de admisión" },
          { value: "espera_carta_firmada", text: "En espera de carta firmada" },
          { value: "carta_rechazada", text: "Carta compromiso rechazada" },
        ],
        false
      );
    } else if (tipificacionN2 === "ins_doc_dig_pen") {
      mostrarOpcionesTipificacionN4(
        [
          { value: "asig_agente_retencion", text: "Asignar agente de retención" },
        ],
        false
      );
    }
  } else {
    // Si no hay selección, ocultar Tipificación 4
    tipificacionN4.innerHTML = '<option value="" disabled selected>Selecciona</option>';
    tipificacionN4Container.style.display = "none";
  }
});

// Función para manejar el cambio en Tipificación N3 y actualizar Resultado 4 o mostrar popups de documentos
const handleTipificacionN3Change = () => {
  const tipificacionN3 = document.getElementById("tipificacionn3");
  const tipificacionN4Container = document.getElementById("tipificacionn4-container");
  const tipificacionN4 = document.getElementById("tipificacionn4");
  const statusFinalContainer = document.getElementById("statusfinal-container");
  const statusFinalInput = document.getElementById("statusfinal");

  tipificacionN3.addEventListener("change", function () {
    const selectedValue = this.value;

    // Reset visualización
    statusFinalContainer.style.display = "none";
    statusFinalInput.value = "";
    document.getElementById("documentos-sin-apostillar-popup").style.display =
      "none";
    limpiarCheckboxes("documentos-sin-apostillar-popup");
    document.getElementById("documentos-sin-documento-popup").style.display =
      "none";
    limpiarCheckboxes("documentos-sin-documento-popup");
    document.getElementById(
      "documentos-sin-apostillar-container"
    ).style.display = "none";
    document.getElementById(
      "documentos-sin-documento-container"
    ).style.display = "none";

    // Condiciones específicas
if (selectedValue === "con_experiencia") {
    statusFinalContainer.style.display = "block";
    statusFinalInput.value = "Aplica en otro programa";
  
  } else if (selectedValue === "doc_sin_apostillar") {
    document.getElementById("documentos-sin-apostillar-popup").style.display = "block";
  
  } else if (selectedValue === "doc_dig_pen") {
    // Mostrar documentos-popup para doc_dig_pen
    document.getElementById("documentos-popup").style.display = "block";
  
  } else if (selectedValue === "sin_doc") {
    // Mostrar sin-documento-popup solo para sin_doc
    document.getElementById("documentos-sin-documento-popup").style.display = "block";
  
  } else if (selectedValue === "ins_doc_dig_com") {
    mostrarOpcionesTipificacionN4(
      [{ value: "asig_agente_retencion", text: "Asignar agente de retención" }],
      false
    );
  
  } else if (selectedValue === "ingresa_ciclo_futuro") {
    mostrarOpcionesTipificacionN4([], true); // Usará el array `comunes`
  
  } else {
    tipificacionN4.innerHTML = '<option value="" disabled selected>Selecciona</option>';
    tipificacionN4Container.style.display = "none";
  } 
  
  // ✅ Llamar función para desactivar los campos de comunicación
  actualizarEstadoCamposComunicacion();
  });
};

document.getElementById("tipificacionn4").addEventListener("change", actualizarEstadoCamposComunicacion);

// Función para resetear Resultado 4
const resetResultado4 = () => {
  const statusFinalContainer = document.getElementById("statusfinal-container");
  const statusFinalInput = document.getElementById("statusfinal");

  // Ocultar y limpiar Resultado 4
  statusFinalContainer.style.display = "none";
  statusFinalInput.value = "";
};

// Inicializamos los cambios según el valor de Resultado 2
document.getElementById("resultado2").addEventListener("change", function () {
  const resultado2Value = this.value;
  const tipificacionn1Container = document.getElementById(
    "tipificacionn1-container"
  );
  const tipificacionn1 = document.getElementById("tipificacionn1");
  const tipificacionN4Container = document.getElementById("tipificacionn4-container"); // Contenedor de Tipificación N4 (Tipo de enseñanza)
  const tipificacionN4 = document.getElementById("tipificacionn4"); // Select de Tipificación N4 (Tipo de enseñanza)

  // Limpiar los campos dependientes, incluyendo Descripción
  limpiarCamposDependientes();

  // Ocultar y limpiar Tipificación N4 cuando cambie Resultado 2
  tipificacionN4.innerHTML =
    '<option value="" disabled selected>Selecciona</option>';
  tipificacionN4Container.style.display = "none";

  // Limpiamos y ocultamos las tipificaciones y popups
  tipificacionn1.innerHTML = "";
  document.getElementById("tipificacionn2-container").style.display = "none";
  document.getElementById("tipificacionn3-container").style.display = "none";
  document.getElementById("documentos-popup").style.display = "none"; // Ocultamos el popup por defecto
  limpiarCheckboxes("documentos-popup");
  document.getElementById("documentos-container").style.display = "none"; // Ocultamos también el contenedor por defecto
  document.getElementById("seguimiento-popup").style.display = "none"; // Ocultamos el popup de seguimiento
  limpiarCheckboxes("seguimiento-popup");
  document.getElementById("seguimiento-container").style.display = "none"; // Ocultamos el contenedor de seguimiento
  document.getElementById("documentos-sin-apostillar-popup").style.display =
    "none";
  limpiarCheckboxes("documentos-sin-apostillar-popup");
  document.getElementById("documentos-sin-documento-popup").style.display =
    "none";
  limpiarCheckboxes("documentos-sin-documento-popup");
  document.getElementById("documentos-sin-apostillar-container").style.display =
    "none";
  document.getElementById("documentos-sin-documento-container").style.display =
    "none";
  document.getElementById("informacion-popup").style.display = "none"; // Ocultamos el popup de Solo buscaba información
  limpiarCheckboxes("informacion-popup");
  document.getElementById("informacion-container").style.display = "none"; // Ocultamos el contenedor de Solo buscaba información

  // Ocultar y limpiar Resultado 4 si se cambia Tipificación N2
  resetResultado4();

  // Mostramos las opciones correspondientes en Tipificación N1 para "Interesado"
  if (resultado2Value === "interesado") {
    tipificacionn1Container.style.display = "block";
    tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="admitido">Admitido - Won</option>
            <option value="extranjero_pago_exitoso">Extranjero con pago exitoso - Won</option>
            <option value="ingresa_ciclo_futuro">Ingresa en ciclo futuro - Won</option>
            <option value="requiere_equivalencia">Requiere equivalencia / Admitido - Won</option>
            <option value="seguimiento_inscripcion">Seguimiento a inscripción - Won</option>
        `;
  }

  // Mostramos las opciones correspondientes en Tipificación N1 para "No efectivo"
  else if (resultado2Value === "no_efectivo") {
    tipificacionn1Container.style.display = "block";
    tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="contesta_y_cuelga">Contesta y cuelga - Won</option>
            <option value="llamada_cortada">Llamada cortada / Fallas en audio - Won</option>
            <option value="sin_aspirante">No se encuentra el aspirante - Won</option>
            <option value="se_agenda_peticion">Se agenda a petición del aspirante - Won</option>
        `;
  }

  // Mostramos las opciones correspondientes en Tipificación N1 para "No interesado"
  else if (resultado2Value === "no_interesado") {
    tipificacionn1Container.style.display = "block";
    tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="devolucion">Devolución - Won</option>
        `;
  }

  // Mostramos las opción "No contesta"
  else if (resultado2Value === "seguimiento") {
    tipificacionn1Container.style.display = "block";
    tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="no_contesta">No contesta</option>
    `;
  }

  // Mostramos las opciones correspondientes en Tipificación N1 para "No contesta"
  else if (resultado2Value === "no_contesta") {
    tipificacionn1Container.style.display = "block";
    tipificacionn1.innerHTML = `
            <option value="" disabled selected>Selecciona</option>
            <option value="fallas_audio">Llamada cortada / Fallas en audio - Won</option>
            <option value="num_invalido">Número inválido para llamada - Won</option>
            <option value="sin_contacto">Sin contacto cumpliendo máximo de intentos - Won</option>
            <option value="sin_respuesta">Sin respuesta - Won</option>
        `;
  }

  // Si no hay opción válida, ocultamos las tipificaciones
  else {
    tipificacionn1Container.style.display = "none";
  }
});

// Escuchar los cambios en Tipificación N1 para ocultar popups cuando se cambia de opción
const tipificacionn1 = document.getElementById("tipificacionn1");
tipificacionn1.addEventListener("change", function () {
  // Ocultar el popup de seguimiento y el contenedor de seguimiento al cambiar de opción en Tipificación N1
  document.getElementById("seguimiento-popup").style.display = "none";
  limpiarCheckboxes("seguimiento-popup");
  document.getElementById("seguimiento-container").style.display = "none";
});

// Opciones comunes para Tipificación N2
const opcionesComunesTipificacionN2 = [
  { value: "envio_whats", text: "Envío de WhatsApp" },
];

// Declaramos el array comunes en el scope global:
const comunes = [
    { value: "ciclo1", text: "Ciclo 1 Nov - Ene" },
    { value: "ciclo2", text: "Ciclo 2 Ene - Feb" },
    { value: "ciclo3", text: "Ciclo 3 Feb - Abril" },
    { value: "ciclo4", text: "Ciclo 4 Abril - Mayo" },
    { value: "ciclo5", text: "Ciclo 5 May - Jul" },
    { value: "ciclo6", text: "Ciclo 6 Jul - Ago" },
    { value: "ciclo7", text: "Ciclo 7 Ago - Sep" },
    { value: "ciclo8", text: "Ciclo 8 Sep - Nov" }
    // puedes agregar online/presencial si lo necesitas
  ];

// Opciones dinámicas para Tipificación N1 y N2
const opcionesTipificacionN1 = {
    // INTERESADO
  admitido: [
    { value: "ins_doc_dig_com", text: "Inscrito / Documentación digital completa" },
    { value: "ins_doc_dig_pen", text: "Inscrito / Documentación digital pendiente" }
  ],
  extranjero_pago_exitoso: [
    { value: "admitido", text: "Admitido" },
    { value: "doc_dig_pen", text: "Documentación digital pendiente" },
  ],
  ingresa_ciclo_futuro: comunes, // ✅ usa directamente el array
  requiere_equivalencia: [
    { value: "espera_resp_uni", text: "En espera de respuesta de la Universidad" },
    { value: "ins_doc_dig_com", text: "Inscrito / Documentación digital completa" },
    { value: "ins_doc_dig_pen", text: "Inscrito / Documentación digital pendiente" },
    { value: "no_procede", text: "No procede" }
  ],
  seguimiento_inscripcion: [
    // { value: "aplica_carta_compromiso", text: "Aplica carta compromiso" },
    { value: "inscrito_doc_faltante", text: "Inscrito / Documentación digital pendiente" }
  ],

// NO EFECTIVO
  se_agenda_peticion: [
    { value: "seguimiento_inscripcion", text: "Seguimiento a inscripción" },
    { value: "se_comparte_info", text: "Se comparte información por WhatsApp" },
  ],
  contesta_y_cuelga: [
    { value: "envio_whats", text: "Envío de WhatsApp" },
  ],
  sin_aspirante: [
    { value: "envio_whats", text: "Envío de WhatsApp" },
  ],

// NO INTERESADO
  devolucion: [
    { value: "documentos_incompletos", text: "Documentos incompletos" },
    { value: "inconformidad", text: "Inconformidad" },
    { value: "liquidez", text: "Liquidez" },
    { value: "temas_personales", text: "Temas personales" },
  ],

// NO CONTESTA
num_invalido: [
    { value: "num_invalido", text: "No existe número para envío WhatsApp" },
    { value: "envia_whatsapp", text: "Se envía WhatsApp" }
],
sin_contacto: [
    { value: "llamada", text: "Llamada" },
    { value: "whatsapp", text: "WhatsApp" },
],
sin_respuesta: [
    { value: "buzon_directo", text: "Buzón directo" },
    { value: "manda_buzon", text: "Da tono y manda a buzón" },
    { value: "fuera_de_servicio", text: "Fuera del área de servicio" },
    { value: "no_responde_whatsapp", text: "No responde WhatsApp" },
    { value: "rechaza_llamada", text: "Rechaza llamada" }
]
};

// Opciones dinámicas para Tipificación N2
// const opcionesTipificacionN2 = {
//   "2_ciclos_post": [
//     { value: "trimestre1", text: "Trimestre 1 (ene, feb, mar)" },
//     { value: "trimestre2", text: "Trimestre 2 (abr, may, jun)" },
//     { value: "trimestre3", text: "Trimestre 3 (jul, ago, sep)" },
//     { value: "trimestre4", text: "Trimestre 4 (oct, nov, dic)" },
//   ],

// Declaramos opciones comunes
const opcionesComunesCiclo = [
    { value: "admitido", text: "Admitido" },
    { value: "doc_dig_pen", text: "Documentación digital pendiente" }
  ];  

// Opciones dinámicas para Tipificación N3
const opcionesTipificacionN3 = {
// INTERESADO
  ins_doc_dig_com: [
    { value: "asignar_agente_retencion", text: "Asignar agente de retención" },
  ],
  admitido: [
    { value: "ingresa_ciclo_futuro", text: "Ingresa ciclo futuro" },
    { value: "ins_doc_dig_com", text: "Inscrito / Documentación digital completa" },
  ],
  doc_dig_pen: [
    { value: "doc_sin_apostillar", text: "Documento sin apostillar" },
    { value: "espera_resp_uni", text: "En espera de respuesta de la Universidad" },
    { value: "sin_doc", text: "Sin documento" }
  ],
  ciclo1: opcionesComunesCiclo,
  ciclo2: opcionesComunesCiclo,
  ciclo3: opcionesComunesCiclo,
  ciclo4: opcionesComunesCiclo,
  ciclo5: opcionesComunesCiclo,
  ciclo6: opcionesComunesCiclo,
  ciclo7: opcionesComunesCiclo,
  ciclo8: opcionesComunesCiclo,
  no_procede: [
    { value: "continua_inscripcion", text: "Continúa con la inscripción" },
    { value: "pide_devolucion", text: "Pide devolución" }
  ],

  // NO EFECTIVO
  se_comparte_info: [
    { value: "espera_de_resp", text: "En espera de respuesta" }
  ],
  
  // NO INTERESADO
    inconformidad: [
        { value: "info_erronea", text: "Información errónea" },
      ],

  // NO CONTESTA
  envia_whatsapp: [
    { value: "espera_de_resp", text: "En espera de respuesta" }
  ],
  manda_buzon: [{ value: "envio_whats", text: "Envío de WhatsApp" }],
  buzon_directo: opcionesComunesTipificacionN2,
  fuera_de_servicio: opcionesComunesTipificacionN2,
  rechaza_llamada: opcionesComunesTipificacionN2,
};

//>>> Función dinámica de Tipificación 4 <<<
function mostrarOpcionesTipificacionN4(extra = [], incluirComunes = true) {
    const tipificacionN4 = document.getElementById("tipificacionn4");
    const tipificacionN4Container = document.getElementById("tipificacionn4-container");
  
    const todas = [
      { value: "", text: "Selecciona", disabled: true, selected: true },
      ...(incluirComunes ? comunes : []),
      ...extra
    ];
  
    tipificacionN4.innerHTML = todas
      .map(opt => `
        <option value="${opt.value}"${opt.disabled ? " disabled" : ""}${opt.selected ? " selected" : ""}>
          ${opt.text}
        </option>
      `).join("");
  
    tipificacionN4Container.style.display = "block";
  }  

// Listener para los cambios en Tipificación N1
handleTipificacionN1Change(opcionesTipificacionN1);

// Listener para los cambios en Tipificación N2
handleTipificacionN2Change(opcionesTipificacionN3);

// **Listener para los cambios en Tipificación N3**
handleTipificacionN3Change();

// Función genérica para manejar la interacción con los popups y contenedores de selección
const manejarPopup = (
  guardarBtnId,
  popupId,
  containerId,
  selectorCheckboxes,
  listaId,
  mensajeVacio
) => {
  const guardarBtn = document.getElementById(guardarBtnId);
  const popup = document.getElementById(popupId);
  const container = document.getElementById(containerId);
  const listaSeleccionados = document.getElementById(listaId);
  const editarBtn = container.querySelector("button"); // Botón de edición dentro del contenedor

  let seleccionados = [];

  // Función para actualizar la lista de seleccionados
  const actualizarListaSeleccionados = () => {
    listaSeleccionados.innerHTML = seleccionados.length
      ? seleccionados.map((item) => `<li>&#183; ${item.text}</li>`).join("")
      : `<li>${mensajeVacio}</li>`;
  };

  // Función para obtener los checkboxes seleccionados del popup específico
  const obtenerSeleccionados = () => {
    const checkboxes = popup.querySelectorAll(selectorCheckboxes); // Re-seleccionar checkboxes dinámicos por popup
    seleccionados = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => ({ id: checkbox.id, text: checkbox.value }));
  };

  // Evento: Guardar selección y mostrar en el contenedor
  guardarBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir validación global del formulario
    obtenerSeleccionados(); // Guardar seleccionados
    actualizarListaSeleccionados(); // Mostrar las selecciones
    popup.style.display = "none"; // Ocultar popup
    container.style.display = "block"; // Mostrar contenedor con resultados
  });

  // Evento: Editar selección previa
  if (editarBtn) {
    editarBtn.addEventListener("click", function (event) {
      event.preventDefault();
      popup.style.display = "block"; // Mostrar popup
      container.style.display = "none"; // Ocultar contenedor

      // Restaurar la selección previa de los checkboxes
      const checkboxes = popup.querySelectorAll(selectorCheckboxes); // Restaurar dinamismo
      checkboxes.forEach((checkbox) => {
        checkbox.checked = seleccionados.some(
          (item) => item.id === checkbox.id
        );
      });
    });
  } else {
    console.warn(
      `El botón de edición no se encontró en el contenedor ${containerId}`
    );
  }
};

// Implementación para manejar el popup de documentación digital
manejarPopup(
  "guardar-doc-digital",
  "doc-dig-popup",
  "doc-dig-container",
  '#doc-dig-popup input[type="checkbox"]',
  "doc-dig-seleccionada",
  "No se seleccionó documentación."
);

// Implementación para manejar el popup de documentos
manejarPopup(
  "guardar-documentos", // ID del botón de guardar en el popup
  "documentos-popup", // ID del popup
  "documentos-container", // ID del contenedor donde se muestra la lista seleccionada
  '#documentos-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
  "documentos-seleccionados", // ID del <ul> donde se mostrará la lista seleccionada
  "No se seleccionaron documentos." // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de seguimiento
manejarPopup(
  "guardar-seguimiento", // ID del botón de guardar en el popup
  "seguimiento-popup", // ID del popup
  "seguimiento-container", // ID del contenedor donde se muestra la lista seleccionada
  '#seguimiento-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
  "metodo-seleccionado", // ID del <ul> donde se mostrará la lista seleccionada
  "No se seleccionaron métodos de seguimiento." // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de documentos sin apostillar
manejarPopup(
  "guardar-documentos-sin-apostillar", // ID del botón de guardar en el popup
  "documentos-sin-apostillar-popup", // ID del popup
  "documentos-sin-apostillar-container", // ID del contenedor donde se muestra la lista seleccionada
  '#documentos-sin-apostillar-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
  "documentos-seleccionados-sin-apostillar", // ID del <ul> donde se mostrará la lista seleccionada
  "No se seleccionaron documentos." // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de sin documento
manejarPopup(
  "guardar-documentos-sin-documento", // ID del botón de guardar en el popup
  "documentos-sin-documento-popup", // ID del popup
  "documentos-sin-documento-container", // ID del contenedor donde se muestra la lista seleccionada
  '#documentos-sin-documento-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
  "documentos-seleccionados-sin-documento", // ID del <ul> donde se mostrará la lista seleccionada
  "No se seleccionaron documentos." // Mensaje en caso de que no haya selección
);

// Implementación para manejar el popup de Solo busca información
manejarPopup(
  "guardar-informacion", // ID del botón de guardar en el popup
  "informacion-popup", // ID del popup
  "informacion-container", // ID del contenedor donde se muestra la lista seleccionada
  '#informacion-popup input[type="checkbox"]', // Selector para los checkboxes dentro del popup
  "informacion-seleccionados", // ID del <ul> donde se mostrará la lista seleccionada
  "No se seleccionó información." // Mensaje en caso de que no haya selección
);

const manejarTitulacionMaestria = (
  titulacionMaestriaId,
  statusFinalContainerId,
  statusFinalInputId
) => {
  const titulacionMaestriaCheckbox =
    document.getElementById(titulacionMaestriaId);
  const statusFinalContainer = document.getElementById(statusFinalContainerId);
  const statusFinalInput = document.getElementById(statusFinalInputId);

  if (
    !titulacionMaestriaCheckbox ||
    !statusFinalContainer ||
    !statusFinalInput
  ) {
    console.error(
      "No se encontraron uno o más elementos necesarios para Titulación por Maestría."
    );
    return;
  }

  titulacionMaestriaCheckbox.addEventListener("change", function () {
    if (this.checked) {
      statusFinalContainer.style.display = "block"; // Mostrar el contenedor
      statusFinalInput.value = "En espera del certificado"; // Asignar el valor predeterminado
      console.log('Mostrando "Resultado 4" con valor:', statusFinalInput.value);
    } else {
      statusFinalContainer.style.display = "none"; // Ocultar el contenedor
      statusFinalInput.value = ""; // Limpiar el valor
      console.log('Ocultando "Resultado 4" y limpiando valor.');
    }
  });
};

// Función para obtener el texto seleccionado de un <select> y evitar "Selecciona"
function obtenerTextoSelect(id) {
  const elemento = document.getElementById(id);
  if (elemento) {
    const textoSeleccionado =
      elemento.options[elemento.selectedIndex]?.text || "";
    const valorSeleccionado = elemento.value || ""; // Obtener el valor seleccionado
    // Si el texto es "Selecciona" o el valor está vacío, retornamos una cadena vacía
    return textoSeleccionado === "Selecciona" || valorSeleccionado === ""
      ? ""
      : textoSeleccionado;
  }
  return ""; // Si no hay elemento, retornamos cadena vacía
}

// Función para capturar los checkboxes seleccionados
function obtenerCheckboxSeleccionados(selector) {
  const seleccionados = [];
  document.querySelectorAll(selector).forEach((checkbox) => {
    if (checkbox.checked) {
      seleccionados.push(checkbox.value);
    }
  });
  return seleccionados.join(", ");
}

// Función para exportar a Excel (incluir la verificación del checkbox "Costos")
function exportarExcel(event) {
  event.preventDefault(); // Previene el reinicio de la página o envío de formulario

  // Objeto intermedio para almacenar los datos a exportar
  const dataToExport = {};

  // Capturar los valores de los elementos `select`
  dataToExport["Canal de comunicación"] = obtenerTextoSelect(
    "canaldecomunicacion"
  );
  dataToExport["Estatus de contacto"] = obtenerTextoSelect("resultado1");
  dataToExport["Nivel de contacto"] = obtenerTextoSelect("tipocontacto");
  dataToExport["Respuesta de lead"] = obtenerTextoSelect("resultado2");
  dataToExport["Tipificación de respuesta"] =
    obtenerTextoSelect("tipificacionn1");
  dataToExport["Subtipificación de respuesta"] =
    obtenerTextoSelect("tipificacionn2");

  // Capturar "Solo buscaba información" justo después de "Subtipificación de respuesta"
  dataToExport["Solo buscaba información"] = obtenerCheckboxSeleccionados(
    '#informacion-popup input[type="checkbox"]'
  );

  // Verificación si el checkbox "Costos" está marcado
  const costosCheckbox = document.getElementById("costos");
  let detallesSubtipificacionTitle = "6) Detalles de subtipificación"; // Título por defecto
  let detallesSubtipificacion = obtenerTextoSelect("tipificacionn3");

  // Si el checkbox de "Costos" está marcado, cambiar el título dinámicamente
  if (costosCheckbox && costosCheckbox.checked) {
    detallesSubtipificacionTitle = "Opciones asociadas a Costos *"; // Cambiar el título dinámicamente si es Costos
  }

  dataToExport[detallesSubtipificacionTitle] = detallesSubtipificacion; // Agregar el valor con el título adecuado

  // Capturar el valor de "Resultado 4"
  dataToExport["Resultado 4"] =
    document.getElementById("statusfinal").value || "";
  // Capturar el valor de "Tipificación 4"
  dataToExport["Tipo de enseñanza"] = obtenerTextoSelect("tipificacionn4");

  // Capturar los checkboxes seleccionados
  dataToExport["Documentos faltantes"] = obtenerCheckboxSeleccionados(
    '#documentos-popup input[type="checkbox"]'
  );
  dataToExport["Método de seguimiento"] = obtenerCheckboxSeleccionados(
    '#seguimiento-popup input[type="checkbox"]'
  );
  dataToExport["Documentos sin apostillar"] = obtenerCheckboxSeleccionados(
    '#documentos-sin-apostillar-popup input[type="checkbox"]'
  );
  dataToExport["Sin documento"] = obtenerCheckboxSeleccionados(
    '#documentos-sin-documento-popup input[type="checkbox"]'
  );

  // Capturar el valor de otros campos
  dataToExport["Interés del lead"] = obtenerTextoSelect("interes");
  dataToExport["Próxima comunicación"] = obtenerTextoSelect("proximaactividad");
  dataToExport["Fecha de envío de comunicación"] =
    document.getElementById("fechaproxact").value || ""; // Campo de fecha
  dataToExport["Hora de envío de comunicación"] =
    document.getElementById("horaproxact").value || ""; // Campo de hora
  dataToExport["Descripción de comunicación"] =
    document.getElementById("descripcion").value || ""; // Captura el valor de la descripción
  dataToExport["Status Final"] =
    document.getElementById("statuslast").value || "";

  // Filtrar solo los campos que tienen valor
  const filteredData = {};
  Object.keys(dataToExport).forEach((key) => {
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
document
  .getElementById("exportarExcelButton")
  .addEventListener("click", exportarExcel);

// Activar o desactivar el botón de guardar
document.addEventListener("DOMContentLoaded", function () {
  const guardarButton = document.getElementById("guardarButton");
  const form = document.querySelector("form"); // Seleccionar el primer formulario en el DOM

  if (!form || !guardarButton) {
    console.error("Formulario o botón guardar no encontrados.");
    return; // Si el formulario o el botón no existen, salir de la función
  }

  const requiredFields = form.querySelectorAll(
    "select[required], input[required], textarea[required]"
  );

  // Función para verificar si un campo está visible
  function isFieldVisible(field) {
    return field.offsetParent !== null; // Verifica si el campo es visible (no oculto)
  }

  // Función para verificar si el formulario está completo
  function checkFormCompletion() {
    let allFilled = true;

    // Validar los campos requeridos visibles
    requiredFields.forEach((field) => {
      if (!field.disabled && isFieldVisible(field)) {
        if (!field.value.trim()) {
          allFilled = false;
        }
      }
    });

    // Verificar los checkboxes dentro de los popups visibles
    const popups = [
      "documentos-popup",
      "seguimiento-popup",
      "documentos-sin-apostillar-popup",
      "documentos-sin-documento-popup",
      "informacion-popup",
    ];

    popups.forEach((popupId) => {
      const popup = document.getElementById(popupId);
      if (popup && popup.style.display !== "none") {
        const checkboxes = popup.querySelectorAll('input[type="checkbox"]');
        const isChecked = Array.from(checkboxes).some(
          (checkbox) => checkbox.checked
        );
        if (!isChecked) {
          allFilled = false;
        }
      }
    });

    // Verificar si la fecha de envío de comunicación está habilitada y tiene un valor
    const fechaEnvio = document.getElementById("fechaproxact");
    if (fechaEnvio && isFieldVisible(fechaEnvio)) {
      // Asegúrate de que está visible y no deshabilitado
      if (!fechaEnvio.disabled && !fechaEnvio.value) {
        // Si está habilitado pero vacío, no permitir guardar
        allFilled = false;
      }
    }

    // Verificar si la hora de envío de comunicación está habilitada y tiene un valor
    const horaEnvio = document.getElementById("horaproxact");
    if (horaEnvio && isFieldVisible(horaEnvio)) {
      // Asegúrate de que está visible y no deshabilitado
      if (!horaEnvio.disabled && !horaEnvio.value) {
        // Si está habilitado pero vacío, no permitir guardar
        allFilled = false;
      }
    }

    // Habilitar o deshabilitar el botón según la validación
    guardarButton.disabled = !allFilled;
  }

  // Escuchar cambios en los campos obligatorios y checkboxes
  requiredFields.forEach((field) => {
    field.addEventListener("input", checkFormCompletion);
    field.addEventListener("change", checkFormCompletion);
  });

  // Escuchar cambios en los checkboxes dentro de los popups
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", checkFormCompletion);
  });

  // Escuchar cambios en el campo de fecha
  const fechaEnvio = document.getElementById("fechaproxact");
  if (fechaEnvio) {
    fechaEnvio.addEventListener("input", checkFormCompletion);
    fechaEnvio.addEventListener("change", checkFormCompletion);
  }

  // Inicializar la comprobación al cargar la página
  checkFormCompletion();
});
