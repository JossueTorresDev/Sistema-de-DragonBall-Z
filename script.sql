-- ===========================================
-- BASE DE DATOS: Dragon Ball (PostgreSQL-Neon)
-- ===========================================

-- ⚠️ (En Neon no se puede usar CREATE DATABASE dentro del query)
-- Así que crea la DB manualmente desde el panel y luego ejecuta esto dentro de ella.

-- Limpiar tablas si ya existen (por seguridad al reinstalar)
DROP TABLE IF EXISTS participantes_batalla CASCADE;
DROP TABLE IF EXISTS batallas CASCADE;
DROP TABLE IF EXISTS personaje_transformacion CASCADE;
DROP TABLE IF EXISTS transformaciones CASCADE;
DROP TABLE IF EXISTS personaje_tecnica CASCADE;
DROP TABLE IF EXISTS tecnicas CASCADE;
DROP TABLE IF EXISTS personajes CASCADE;
DROP TABLE IF EXISTS sagas CASCADE;
DROP TABLE IF EXISTS planetas CASCADE;
DROP TABLE IF EXISTS razas CASCADE;

-- ==========================
-- TABLA: razas
-- ==========================
CREATE TABLE razas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- ==========================
-- TABLA: planetas
-- ==========================
CREATE TABLE planetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    sistema_origen VARCHAR(100),
    descripcion TEXT
);

-- ==========================
-- TABLA: sagas
-- ==========================
CREATE TABLE sagas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE
);

-- ==========================
-- TABLA: personajes
-- ==========================
CREATE TABLE personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    raza_id INT REFERENCES razas(id) ON DELETE SET NULL,
    planeta_id INT REFERENCES planetas(id) ON DELETE SET NULL,
    nivel_poder BIGINT,
    afiliacion VARCHAR(100),
    descripcion TEXT
);

-- ==========================
-- TABLA: tecnicas
-- ==========================
CREATE TABLE tecnicas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    tipo VARCHAR(50)
);

-- ==========================
-- TABLA: personaje_tecnica (N:N)
-- ==========================
CREATE TABLE personaje_tecnica (
    personaje_id INT REFERENCES personajes(id) ON DELETE CASCADE,
    tecnica_id INT REFERENCES tecnicas(id) ON DELETE CASCADE,
    dominio INT CHECK (dominio BETWEEN 1 AND 100),
    PRIMARY KEY (personaje_id, tecnica_id)
);

-- ==========================
-- TABLA: transformaciones
-- ==========================
CREATE TABLE transformaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    multiplicador_poder DECIMAL(10,2),
    descripcion TEXT
);

-- ==========================
-- TABLA: personaje_transformacion (N:N)
-- ==========================
CREATE TABLE personaje_transformacion (
    personaje_id INT REFERENCES personajes(id) ON DELETE CASCADE,
    transformacion_id INT REFERENCES transformaciones(id) ON DELETE CASCADE,
    PRIMARY KEY (personaje_id, transformacion_id)
);

-- ==========================
-- TABLA: batallas
-- ==========================
CREATE TABLE batallas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    saga_id INT REFERENCES sagas(id) ON DELETE SET NULL,
    ubicacion VARCHAR(100),
    resultado TEXT,
    fecha DATE
);

-- ==========================
-- TABLA: participantes_batalla (N:N)
-- ==========================
CREATE TABLE participantes_batalla (
    batalla_id INT REFERENCES batallas(id) ON DELETE CASCADE,
    personaje_id INT REFERENCES personajes(id) ON DELETE CASCADE,
    rol VARCHAR(50),
    PRIMARY KEY (batalla_id, personaje_id)
);

-- ==========================
-- DATOS INICIALES
-- ==========================

INSERT INTO razas (nombre, descripcion) VALUES
('Saiyajin', 'Guerreros del planeta Vegeta con transformaciones poderosas.'),
('Humano', 'Habitantes de la Tierra, algunos pueden usar Ki.'),
('Namekuseijin', 'Raza del planeta Namek, expertos en regeneración y magia.'),
('Androide', 'Seres artificiales creados por el Dr. Gero.'),
('Dios', 'Seres divinos con poderes superiores.');

INSERT INTO planetas (nombre, sistema_origen, descripcion) VALUES
('Tierra', 'Sistema Solar', 'Planeta principal donde se desarrollan muchas batallas.'),
('Namek', 'Sistema Namek', 'Planeta de los Namekuseijin.'),
('Vegeta', 'Sistema Saiyajin', 'Planeta natal de los Saiyajin.');

INSERT INTO sagas (nombre, descripcion, fecha_inicio, fecha_fin) VALUES
('Saga Saiyajin', 'Invasión de Vegeta y Nappa a la Tierra.', '1989-04-26', '1990-03-19'),
('Saga Freezer', 'Viaje al planeta Namek y la batalla contra Freezer.', '1990-03-20', '1991-01-09'),
('Saga Cell', 'Aparición de los androides y Cell.', '1992-04-08', '1993-03-10'),
('Saga Majin Buu', 'Resurrección de Majin Buu y batalla final.', '1994-03-09', '1995-01-31');

INSERT INTO personajes (nombre, raza_id, planeta_id, nivel_poder, afiliacion, descripcion) VALUES
('Goku', 1, 1, 9000000000, 'Z Fighters', 'Saiyajin criado en la Tierra.'),
('Vegeta', 1, 3, 8500000000, 'Saiyajins / Z Fighters', 'Príncipe de los Saiyajins.'),
('Piccolo', 3, 2, 4000000000, 'Z Fighters', 'Namekuseijin aliado de Goku.'),
('Freezer', 5, 3, 12000000000, 'Imperio Galáctico', 'Tirano del universo.'),
('Cell', 4, 1, 8000000000, 'Villano', 'Bioandroide creado por el Dr. Gero.');

INSERT INTO tecnicas (nombre, descripcion, tipo) VALUES
('Kamehameha', 'Rayo de energía concentrado', 'Ki'),
('Final Flash', 'Ataque de energía devastador', 'Ki'),
('Makankosappo', 'Ataque perforante en espiral', 'Ki'),
('Genkidama', 'Bola de energía formada con la energía vital de los seres', 'Ki'),
('Teletransportación', 'Permite moverse instantáneamente a otro lugar', 'Habilidad');

INSERT INTO personaje_tecnica (personaje_id, tecnica_id, dominio) VALUES
(1, 1, 95),
(1, 4, 90),
(1, 5, 85),
(2, 2, 90),
(3, 3, 80);

INSERT INTO transformaciones (nombre, multiplicador_poder, descripcion) VALUES
('Super Saiyajin', 50, 'Transformación básica Saiyajin'),
('Super Saiyajin Blue', 300, 'Ki divino y gran poder'),
('Ultra Instinto', 1000, 'Movimiento autónomo divino');

INSERT INTO personaje_transformacion (personaje_id, transformacion_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2);

INSERT INTO batallas (nombre, saga_id, ubicacion, resultado, fecha) VALUES
('Goku vs Vegeta (Primera vez)', 1, 'Tierra', 'Goku y Vegeta empatan tras una intensa batalla.', '1990-02-10'),
('Goku vs Freezer', 2, 'Namek', 'Goku derrota a Freezer con el Super Saiyajin.', '1991-01-09'),
('Gohan vs Cell', 3, 'Tierra', 'Gohan vence a Cell con la ayuda de su padre.', '1993-03-10');

INSERT INTO participantes_batalla (batalla_id, personaje_id, rol) VALUES
(1, 1, 'protagonista'),
(1, 2, 'antagonista'),
(2, 1, 'protagonista'),
(2, 4, 'antagonista'),
(3, 1, 'apoyo'),
(3, 5, 'antagonista');
