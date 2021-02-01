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

(ejercicio2)