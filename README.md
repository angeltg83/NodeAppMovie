# NodeAppMovie

Instalar version node v10 o superior

Realizar git clone y ejecutar npm install(para descargar las dependencias).

Debe tener instalado mysql version 5.7, e sunir la base de datos de este repositorio, el archivo es dump.sql

al realizar esto. ejecutar en la raiz del proyecto el comando **node index.js**

Esto inicializara un servidor en el puerto 7000

**Detalles adicionales**
la api tiene administracion con autenticacion JWT, no utilizada para este proyecto.


**Dockerfile**

#Creación de la imagen desde Dockerfile
sudo docker build -t dev-express .

#Ejecución de base de datos en postgres, exponiendo un puerto 8009 al puerto nativo, configurando la password "secret", carpeta de persistencia de datos en directorio local.
#Atachar contenedor a red backend asignado una ip fija.
sudo docker run --net backend_backend --ip 172.20.0.20 -d --name dev-postgres -p 8009:5432 -e "POSTGRES_PASSWORD=secret" -v ${PWD}/postgres-data:/var/lib/postgres/data postgres

#Ejecución contenedor desde una imagen, e atachandola a la red backend_backend
sudo docker run --net backend_backend --ip 172.20.0.21 -p 7000:7000 -d node-express

#Verificar las configuraciones de la red para los contenedores ejecutados.
sudo docker network inspect backend_backend
