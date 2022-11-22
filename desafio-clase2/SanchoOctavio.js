// Clase Usuario
class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  
  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    const libroObj = {nombre, autor};
    this.libros.push(libroObj);
  }

  getBookNames() {
    const bookNamesArr = [...this.libros];

    const newArr = bookNamesArr.map( (book) => {
      return book.nombre;
    });

    return newArr;
  }
}

const usuarioPrueba = new Usuario('Octavio', 'Sancho', [{nombre: 'Harry Potter', autor: 'JK Rowling'}], ['gato']);

usuarioPrueba.getFullName();
usuarioPrueba.addMascota('mascota1');
usuarioPrueba.countMascotas();
usuarioPrueba.addBook('lotr', 'tolkien');
usuarioPrueba.getBookNames();

console.log(usuarioPrueba.getFullName());
console.log(usuarioPrueba.mascotas);
console.log(usuarioPrueba.countMascotas());
console.log(usuarioPrueba.libros);
console.log(usuarioPrueba.getBookNames());