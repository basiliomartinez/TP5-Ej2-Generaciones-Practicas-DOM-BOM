/* =========================================================
   TP5 — Ejercicio 2 (Generaciones)

FLUJO:: usuario completa formulario → creo un objeto Persona → muestro resultados y habilito acciones → opción para crear otra persona

   ORDEN:
   1) FUNCIONES
   2) VARIABLES QUE YO DECLARO
   3) LÓGICA / EVENTOS
   ========================================================= */

/* =======================
   1) FUNCIONES
   ======================= */
function determinarGeneracion(anio) {
  const y = Number(anio);
  if (y >= 2011 && y <= 2025) return "Generación Alpha — hiperconectividad";
  if (y >= 1994 && y <= 2010) return "Generación Z — irreverencia";
  if (y >= 1981 && y <= 1993) return "Millennials — frustración";
  if (y >= 1969 && y <= 1980) return "Generación X — obsesión por el éxito";
  if (y >= 1949 && y <= 1968) return "Baby Boom — ambición";
  if (y >= 1930 && y <= 1948) return "Silent — austeridad";
  return "Fuera de tabla";
}

function scrollYFocusForm(form) {
  if (!form) return;
  if (location.hash === "#form-persona") {
    console.log("[scrollYFocusForm] activada");
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => form.querySelector("#inp-nombre")?.focus(), 250);
  }
}

/* ===== Clase con propiedades privadas + getters/setters ===== */
class Persona {
  #nombre;
  #edad;
  #dni;
  #sexo;
  #peso;
  #altura;
  #anioNacimiento;

  constructor({ nombre, edad, dni, sexo, peso, altura, anioNacimiento }) {
    this.nombre = nombre;
    this.edad = edad;
    this.dni = dni;
    this.sexo = sexo;
    this.peso = peso;
    this.altura = altura;
    this.anioNacimiento = anioNacimiento;
  }

  get nombre() {
    return this.#nombre;
  }
  set nombre(v) {
    this.#nombre = String(v ?? "").trim();
  }

  get edad() {
    return this.#edad;
  }
  set edad(v) {
    this.#edad = Number(v);
  }

  get dni() {
    return this.#dni;
  }
  set dni(v) {
    this.#dni = String(v ?? "").trim();
  }

  get sexo() {
    return this.#sexo;
  }
  set sexo(v) {
    this.#sexo = String(v ?? "").toUpperCase();
  }

  get peso() {
    return this.#peso;
  }
  set peso(v) {
    this.#peso = Number(v);
  }

  get altura() {
    return this.#altura;
  }
  set altura(v) {
    this.#altura = Number(v);
  }

  get anioNacimiento() {
    return this.#anioNacimiento;
  }
  set anioNacimiento(v) {
    this.#anioNacimiento = Number(v);
  }
  esMayorDeEdad() {
    return this.#edad >= 18;
  }
  mostrarGeneracion() {
    return determinarGeneracion(this.#anioNacimiento);
  }
  mostrarDatos() {
    const sexoStr = this.#sexo === "H" ? "Hombre" : "Mujer";
    return `Nombre: ${this.#nombre}
Edad: ${this.#edad}
DNI: ${this.#dni}
Sexo: ${sexoStr}
Peso: ${this.#peso} kg
Altura: ${this.#altura} cm
Año de nacimiento: ${this.#anioNacimiento}`;
  }
}

/* =======================
   2) VARIABLES QUE YO DECLARO
   ======================= */
let persona = null; //va a guardar el objeto Persona cuando el usuario crea una.

const main = document.querySelector("main");
/*
/*Guarda la raíz de trabajo.
En vez de buscar todo desde document (global), busca dentro de <main>.
Ventaja: scoping. Si mañana agrego otro form en otra sección, no se mezclan.
*/
const form = main.querySelector("#form-persona");

const btnCrear = form.querySelector(".btn-crear");
const btnGen = form.querySelector(".btn-generacion");
const btnMayor = form.querySelector(".btn-mayor");
const btnDatos = form.querySelector(".btn-datos");
const btnReset = form.querySelector(".btn-reset");

const estadoVacio = main.querySelector(".estado-vacio");
const detalle = main.querySelector(".detalle");
/**
 estadoVacio: el bloque que dice “Todavía no hay una persona creada…”.
Se muestra al inicio y se ocultás cuando el usuario crea una persona.
detalle: el bloque con la lista de datos.
Arranca oculto y se muestra al crear la persona.
 */

//Salidas (dónde inyectar texto)
const out = {
  nombre: main.querySelector(".out-nombre"),
  edad: main.querySelector(".out-edad"),
  dni: main.querySelector(".out-dni"),
  sexo: main.querySelector(".out-sexo"),
  peso: main.querySelector(".out-peso"),
  altura: main.querySelector(".out-altura"),
  anio: main.querySelector(".out-anio"),
};

const focusForm = () =>
  location.hash === "#form-persona" &&
  document.querySelector("#inp-nombre")?.focus();
addEventListener("hashchange", focusForm);
focusForm();

/* =======================
   3) LÓGICA / EVENTOS
   ======================= */

document.addEventListener("DOMContentLoaded", () => {
  // Si llega con #form-persona, ir directo al form
  scrollYFocusForm(form);

  // Submit: dejamos que valide el navegador
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Si algo no cumple (required, pattern, min/max), el navegador lo indica
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    persona = new Persona({
      nombre: data.nombre,
      edad: data.edad,
      dni: data.dni,
      sexo: data.sexo,
      peso: data.peso,
      altura: data.altura,
      anioNacimiento: data.anioNacimiento,
    });

    // Mostrar resultados
    estadoVacio.classList.add("d-none");
    detalle.classList.remove("d-none");

    out.nombre.textContent = persona.nombre;
    out.edad.textContent = persona.edad;
    out.dni.textContent = persona.dni;
    out.sexo.textContent = persona.sexo === "H" ? "Hombre" : "Mujer";
    out.peso.textContent = `${persona.peso} kg`;
    out.altura.textContent = `${persona.altura} cm`;
    out.anio.textContent = persona.anioNacimiento;

    // Habilitar acciones
    [btnGen, btnMayor, btnDatos, btnReset].forEach((b) =>
      b.removeAttribute("disabled")
    );
  });

  btnGen.addEventListener("click", () => {
    if (!persona) return;
    alert(`Generación: ${persona.mostrarGeneracion()}`);
  });

  btnMayor.addEventListener("click", () => {
    if (!persona) return;
    alert(persona.esMayorDeEdad() ? "Es mayor de edad" : "Es menor de edad");
  });

  btnDatos.addEventListener("click", () => {
    if (!persona) return;
    alert(persona.mostrarDatos());
  });

  // Crear otra persona (reset suave, sin recargar)
  btnReset.addEventListener("click", () => {
    persona = null;
    form.reset();
    detalle.classList.add("d-none");
    estadoVacio.classList.remove("d-none");
    [btnGen, btnMayor, btnDatos, btnReset].forEach((b) =>
      b.setAttribute("disabled", "true")
    );
    form.querySelector("#inp-nombre")?.focus();
  });
});

main.querySelector('.btn-generacion-2')?.addEventListener('click', () => btnGen.click());
main.querySelector('.btn-mayor-2')?.addEventListener('click', () => btnMayor.click());
