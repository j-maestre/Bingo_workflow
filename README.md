# Bingo Workflow 

## ¿Qué es un workflow?

_En Acciones de GitHub, un flujo de trabajo es un proceso automatizado que define en su repositorio de GitHub. Este proceso indica a GitHub cómo compilar e implementar el proyecto de aplicación de funciones en GitHub._

_Un archivo YAML (.yml) define un flujo de trabajo en la ruta de acceso /.github/workflows/ de su repositorio. En esta definición se incluyen los diversos pasos y parámetros que componen el flujo de trabajo._


Para empezar, deberemos crear una carpeta llamada ".github" al nivel de la raiz de nuestro proyect, que contenga una carpeta llamada "workflows", tal que así:

![Alt text](/img/1.png)

*Es importante la nomenglatura*

Dentro de la carpeta workflows , crearemos nuestro workflow.yml, que constará de lo siguiente para la realización del primer ejercicio:

## Comprobar la sintaxi del proyecto

Nuestro workflow se llamará main_workflow, que se ejecutará cuando se haga un push en la rama "Bingo_Workflow"

Tendrá por el momento un job llamado syntax_check_job, que correrá en un ubuntu-latest y tendrá una step que se encargará de revisar que la sintaxi sea correcta:

![Alt text](/img/2.png)

Después, constará de un linter job. El superlinter encuentra problemas y los informa a la salida de la consola. Se sugieren correcciones en la salida de la consola, pero no se corrigen automáticamente
linter job

![Alt text](/img/3.png)

Deberemos introducir las variables de entorno necesarias, a destacar, la variable "GITHUB_TOKEN", una variable interna de cada repositorio que contiene el token del repositorio.

_Son una alternativa al uso de contraseñas para la autenticación en GitHub cuando utilizas la API de GitHub. Desaparecen automaticamente al cabo de un año si no son usados durante el mismo._
 
Deberemos añadir al archivo ".eslintignore" los test y toda la carpeta "doc" para que no compruebe estos archivos

![Alt text](/img/4.png)

Tras esto, hacemos un push para comprobar que se ejecuta correctamente:

![Alt text](/img/5.png)

## Job de ejecución de tests

Creamos un job que se encargará de ejecutar y validar los tests que hemos creado en la aplicación:

```
Correrá en un ubuntu latest
```
```
Ejecutará npm install && npm run test
```

![Alt text](/img/6.png)

Una vez hecho el push, comprobamos que funciona correctamente

