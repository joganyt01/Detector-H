// Obtengo los elementos principales del DOM que voy a usar
const boton = document.getElementById("boton");

const fileInput = document.getElementById("fileInput");
const animal = document.getElementById("animal");
const preview = document.getElementById("preview"); //  ahora sí declaro preview

// Cuando hago clic en el botón principal
boton.addEventListener("click", () => {
  const presentacion = document.getElementById("container");
  const detector = document.querySelector(".DetectorContenedor");

  // Aplico la animación de desvanecimiento
  presentacion.classList.add("fadeOut");

  // Espero 1.2 segundos a que termine la animación y luego elimino el contenedor
  setTimeout(() => {
    presentacion.remove();
    detector.classList.remove("oculto"); // aquí muestro el detector
  }, 1200);
});


// reutilizo el div de ejemplo (el que ahora dice "Ejemplo Johan seria un perro HP")
const ejemploDiv = document.querySelector(".ejemplo");

// variable para guardar la foto del usuario (DataURL)
let fotoUsuario = "";

// lista de animales (nombre, ruta de imagen y emoji)
const animales = [
  { nombre: "Gorila Feo de mierda", img: "gorila.jpg", emoji: "🦍" },
  { nombre: "Perro HP", img: "perro.jpg", emoji: "🐶" },
  { nombre: "Gato Desnutrido", img: "gato.jpg", emoji: "🐱" },
  { nombre: "Loro Cacorro", img: "loro.jpg", emoji: "🦜" },
  { nombre: "Tigre Homosexual", img: "tigre.jpg", emoji: "🐯" },
  { nombre: "Cerdo Buche Plomo", img: "cerdo.jpg", emoji: "🐷" },
  { nombre: "Vaca muerta", img: "vaca.jpg", emoji: "🐂" },
  { nombre: "Pescado Caremierda", img: "pescado.jpg", emoji: "🐟" },
  { nombre: "Mono Narizon Hp", img: "mono.jpg", emoji: "🐵" },
  { nombre: "Lemur Ojon Mpdo", img: "lemor.jpg", emoji: "🦝" }
];
// Abrir el input al hacer click en el botón
document.getElementById("uploadBtn").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});
// Reiniciar todo
document.getElementById("reiniciar").addEventListener("click", () => {
  // Restaurar el ejemplo original
  document.querySelector(".ejemplo").innerHTML = `
        <div class="img"></div>
        <h3 for="" class="subtitulo">Ejemplo Johan seria un perro HP 🐶</h3>
    `;

  // Vaciar input file
  const fileInput = document.getElementById("fileInput");
  if (fileInput) fileInput.value = "";

  // Quitar foto subida
  document.querySelector(".img").innerHTML = "";

  // 🔑 Limpiar también la variable global
  fotoUsuario = "";
});
// Detectar archivo subido
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      fotoUsuario = e.target.result; // guardo la foto
      document.querySelector(".img").innerHTML = `<img class="img-media" src="${fotoUsuario}" alt="Foto subida" style="width:180px; height:170px; border-radius:10px;" >`;
      document.querySelector(".img").classList.add("img--has-photo");
    };
    reader.readAsDataURL(file);
  }
});


// Copia de animales para ir sacando sin repetir
let animalesDisponibles = [...animales];

animal.addEventListener("click", () => {
  if (!fotoUsuario) {
    alert("Primero sube una foto, parcero 😎");
    return;
  }

  // Si ya no quedan animales, reinicio la lista
  if (animalesDisponibles.length === 0) {
    animalesDisponibles = [...animales]; // vuelvo a tener todos
  }

  // elijo un índice aleatorio dentro de los disponibles
  const index = Math.floor(Math.random() * animalesDisponibles.length);
  const elegido = animalesDisponibles.splice(index, 1)[0]; 
  // splice: me devuelve y elimina ese animal de la lista

  // reemplazo el contenido del ejemplo
  ejemploDiv.innerHTML = `
    <div class="result-row">
      <div class="person-box">
        <div class="label">Tu foto</div>
        <img src="${fotoUsuario}" alt="foto usuario" class="person-photo">
      </div>

      <div class="animal-box">
        <div class="label">Resultado</div>
        <img src="${elegido.img}" alt="${elegido.nombre}" class="animal-photo blur-in-expand">
        <div class="result-name">${elegido.nombre} ${elegido.emoji}</div>
      </div>
    </div>
  `;

  ejemploDiv.scrollIntoView({ behavior: "smooth", block: "center" });
});
