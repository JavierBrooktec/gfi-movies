This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instalación

### Node
Para poder utilizar el proyecto mecesitamos tener instalado una version actualizada de node https://nodejs.org/es/download/

comprobar que lo tenemos instalado

```bash
node -v
```

### Npm

tambien es necesario tener instalado npm, se instala por defecto con node asi que comprobarlo

```bash
npm -v
```


### Clonar el repositorio 

```bash
git clone https://github.com/JavierBrooktec/gfi-movies.git
```

### Acceder

```bash
cd gfi-movies
```

### Dependencias
Antes de poder utilizar el proyecto, deben ser instaladas todas las dependencias del proyecto ejecutando el siguiente comando en el directorio raíz del proyecto.

```bash
npm install
```

### Arrancar

Para arrancar el proyecto es necesario utilizar el sript:
```bash
npm start
```

## Errores

Si tenemos algun error de version de node al ejecutar 

```bash
npm install
```

 - Descargarse nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
```export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

 - Instalar y utilizar la version 13 de Node

```bash
nvm install 13
nvm use 13
```



# funcionamiento de la app

- se puede utilizar la aplicación para buscar peliculas y ver sus fichas sin estar logged
- Para tener toda la funcionalidad de favoritos es necesario estar logged
- la barra de busqueda en Home busca peliculas en general
- la barra de busqueda en Favoritos filtra por nombre nuestras pelis favoritas
- Para reiniciar por completo la aplicacion es necesario limpiar localStorage
- Se pueden crear diferentes usuarios, y cada uno tiene sus pelis favoritas