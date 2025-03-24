# 🏥 Sistema de Gestión de Hospitales

Este proyecto es un sistema de gestión para hospitales, desarrollado con **Spring Boot**, **Angular 19** y una base de datos en **Oracle**. Permite administrar hospitales, sedes, distritos, gerentes, condiciones y provincias de manera eficiente.

---

## 🛠️ Tecnologías Utilizadas

### 📌 Backend (API REST)
- **Spring Boot**  
- **Spring Data JPA** (para acceso a datos)  
- **Spring Web** (para la API REST)   
- **Oracle Database** (para almacenamiento de datos)  

### 📌 Frontend (Interfaz de Usuario)
- **Angular 19** (con TypeScript)  
- **Angular Material** (para UI/UX)   

### 📌 Base de Datos
- **Oracle Database**  
- **PL/SQL** (procedimientos almacenados para operaciones CRUD eficientes)  

---

## 🚀 Características
✅ Gestión de hospitales y sus sedes  
✅ Administración de distritos, provincias y gerentes  
✅ Uso de procedimientos almacenados en Oracle
✅ Interfaz de usuario con Angular Material  
✅ CRUD completo con validaciones y diálogos de confirmación  
✅ Filtros y búsquedas dinámicas en el frontend  

---


---

## 🔧 Instalación y Configuración

### 1️⃣ Configurar Base de Datos
1. Instalar Oracle Database.  
2. Crear las tablas y procedimientos almacenados ejecutando `RetoBootcamp.sql`.  

### 2️⃣ Ejecutar el Backend (Spring Boot)
1. Configurar `application.properties` con la conexión a Oracle.  
2. Compilar y ejecutar el proyecto:  
   ```sh
   mvn clean install
   mvn spring-boot:run
### 3️⃣ Ejecutar el Frontend (Angular)
1. Instalar dependencias:
   ```sh
   npm install
2. Ejecutar el servidor de desarrollo:
   ```sh
   ng serve --open
## 📌 Endpoints Principales (Backend)

| Método  | Endpoint                      | Descripción                     |
|---------|--------------------------------|---------------------------------|
| **GET**    | `/api/hospitales/listar`      | Lista todos los hospitales      |
| **POST**   | `/api/hospitales/registrar`   | Registra un nuevo hospital      |
| **PUT**    | `/api/hospitales/actualizar`  | Actualiza un hospital existente |
| **DELETE** | `/api/hospitales/eliminar/{id}` | Elimina un hospital             |

*(Se aplican las mismas rutas para sedes, provincias, condiciones y gerentes, cambiando hospitales por otra tabla.)*


