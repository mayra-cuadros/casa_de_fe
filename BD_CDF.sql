
CREATE DATABASE casa_de_fe;
USE casa_de_fe;

-- Tabla de categorías (para cursos)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla de instructores
CREATE TABLE instructores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de usuarios (para comentarios o registro)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_us TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    dia_evento DATE NOT NULL,
    fecha_ev TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cursos
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    idcategoria INT NOT NULL,
    idinstructor INT NOT NULL,
    nivel INT NOT NULL,
    fecha_cr TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcategoria) REFERENCES categorias(id),
    FOREIGN KEY (idinstructor) REFERENCES instructores(id)
);

-- Tabla de archivos de cursos
CREATE TABLE archivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idcurso INT NOT NULL,
    nombre_archivo VARCHAR(200) NOT NULL,
    url_archivo TEXT NOT NULL,
    fecha_ar TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcurso) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabla de comentarios en cursos
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idcurso INT NOT NULL,
    nombre_us VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    fecha_com TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcurso) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabla de consultas del formulario de contacto
CREATE TABLE consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ap VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    asunto VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_con TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de versículos (backend~)
CREATE TABLE versiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    datos VARCHAR(100) NOT NULL,
    fecha_ver TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

