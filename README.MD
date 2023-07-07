// LA CONFIGURACION WEBPACK ESTA DENTRO DE LA CARPETA 'VIEWS-UTILS' Y SOLO MINIFICA LOS SCRIPTS DE LA CARPETA 'VIEWS-SCRIPTS' CON SALIDA EN 'MINIFICADO'.

//dentro de las carpetas /views-scripts y /types tenemos que modificar el entorno: DEV / PROD
mediante la variable singleton. pd: modificar de ambos directorios el archivo config.js y config.php respectivamente segun sea el entorno requerido.

//dentro de la carpeta cron-jobs tenemos el cron que envia mails de notificaciones de eventos proximos dentro del calendario de cada usuario.

//para ejecutar los cron usar este comando en cpanel:
```
curl -s "https://nutribarf.ar/cron-jobs/alertar-clientes-eventos.php"
```