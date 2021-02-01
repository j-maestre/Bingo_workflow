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
Ejecutará Checkout code creado anteriormente
```
![Alt text](/img/6.png)

```
Correrá en un ubuntu latest
```
```
Ejecutará npm install && npm run test
```

![Alt text](/img/7.png)

Una vez hecho el push, comprobamos que funciona correctamente

![Alt text](/img/8.png)

## Job de generación de estáticos

_Los artefactos de compilación son archivos producidos por una compilación. Normalmente, estos incluyen paquetes de distribución, archivos WAR, informes, archivos de registro, etc._

Para generar los artifacts, deberemos crear un job con las siguientes caracteristicas:

```
Correra en un ubuntu-latest
```
```
Dependerá de los dos jobs anteriores (syntax cehckout && test_execution)
```
```
Realizará un checkout code
```
![Alt text](/img/9.png)

Generará los statics con:

```
npm install
```
```
npm run buildDev
```

![Alt text](/img/10.png)

El proyecto minificado por buildDev se encontrará en la carpeta "build", que será donde depositaremos los artifacts generados

```
path: ./build
```

![Alt text](/img/11.png)

Tras realizar los pasos anteriores, hacemos un push y comprobamos que funciona correctamente

![Alt text](/img/12.png)

## Job de despliegue de los estáticos generados

En este job, desplegaremos nuestra aplicacion en un dominio proporcionado por _surge_, para ello, deberemos seguir los siguientes pasos:

Para empezar, crearemos un nuevo job, que al igual que los anteriores, correrá en un ubuntu latest.

Además, dependerá del job anterior "build_statics_job"

![Alt text](/img/13.png)

La siguiente step, para poder configurar surge, constará de lo siguiente:

Un dominio no utilizado previamente
```
xemaMaestreBingo.surge.sh
```
La ruta del proyecto

```
project: .
```

El email de login
```
login: ${{ secrets.surge_login }}
```

El token del proyecto

```
token: ${{ secrets.surge_token }}
```
![Alt text](/img/14.png)


El token del proyecto nos lo proporciona surge, para ello, primero deberemos instalrnos surge con

```
npm install --global surge
```

Ejecutaremos en nuestra terminal

```
surge token
```

![Alt text](/img/token.png)

Copiaremos este token que nos proporciona surge y lo añadiremos a los secrets de nuestro proyecto

Para ello, nos dirigimos a nuestro proyecto -> Settings -> Secrets

Hacemos click en _New repository secret_ y añadimos nuestro token

![Alt text](/img/token_secret.png)

Lo mismo para nuestro email de surge

![Alt text](/img/secret_email.png)

Y quedaría tal que así:

![Alt text](/img/all_secrets.png)

Una vez tenemos todo listo para el despliegue, hacemos un push para comprobar que funciona todo correctamente

![Alt text](/img/15.png)

Accedemos a _xemaMaestreBingo.surge.sh_ y comprobamos que se ha desplegado correctamente

![Alt text](/img/16.png)

##  Job de envío de notificación a los usuarios del proyecto

Empezamos creando una carpeta llamada "actions" dentro del directorio .github, que contendrá los siguientes archivos:

- Un archivo index.js encargado de enviar el email
- Un archivo action.yml encargado de recibir las variables necesarias para el envio
- Un archivo package.json encargado de las dependencias de las librerias

![Alt text](/img/17.png)

Para crear el archivo package.json ejecutamos en la terminal
```
$ npm init
```
Nos creará el archivo package.json al que le tendremos que añadir las siguientes dependencias:
```
"dependencies": {
    "@actions/core": "^1.2.6",
    "nodemailer": "^6.4.17"
  }
```
```
npm install
```

Una vez hecho el paso anterior, nos dirigimos al archivo _action.yml_ que deberemos configurar de la siguiente manera:

- email_sender -> El email desde el que enviaremos el email
- password -> Nuestra contraseña del email
- email_to_send -> Destinatario
- runs -> Utilizando nodejs, le diremos que use nuestro js minificado dentro del directorio _dist_

![Alt text](/img/18.png)


Una vez hecho el archivo yml, nos dirijimos al index.js, el encargado de enviar el email

Para ello, deberemos confugurar las siguientes variables.

- La dirección de email con el que enviaremos el email
- La password del email
- Email destinatario
- Los jobs anteriores (syntax_check_job, test_execution_job, build_statics_job, deploy_job)

El valor de estas variables se encuentra en _core_ (@actions/core)

![Alt text](/img/19.png)

Definimos la variable _transporter_, que nos servirá para poder enviar el email

![Alt text](/img/20.png)

Completamos el contenido del email, utilizando las variables mencionadas anteriormente

![Alt text](/img/21.png)

Una vez todo configurado correctamente, enviamos el email utilizando la variable transporter creada anteriormente

![Alt text](/img/22.png)

Aun no podemos enviar el email, para ello, primero debemos definir nuestro email, contraseña y email de destino 
como secrets de github, mencionados anteriormente

![Alt text](/img/23.png)

Después, en nuestro _worflow.yml_ recogeremos estos secrets de la siguiente manera

![Alt text](/img/24.png)

Y recogeremos tambien el resultado de los jobs anteriores

![Alt text](/img/24.png)

Compilamos el proyecto con:

```
ncc build index.js -o dist
```

Una vez todo listo, procedemos a hacer el push para comprobar que todo funciona correctamente
