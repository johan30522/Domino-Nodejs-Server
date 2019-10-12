/**
 * @file 
 * Permiute definir objetos y funciones Utilitarias para la conexión al domino
 */

var path = require("path");
//define el server domino
const { useServer } = require("@domino/domino-db");
//permite obtener la configuracion que utiliza el domino desde el config.json
const config=require('./config');
// certificado de authenticacion
const fs = require("fs");

/**
 * readFile permite leer los archivos de certificados de seguridad
 * @param  {String} arg1 [ruta del archivo que se esta leyendo]
 * @return {file}      [retorna el contenido del directorio ]
 */
const readFile = fileName => {
  try {
    return fs.readFileSync(path.resolve(fileName));
  } catch (error) {
    console.log("Errore leggendo " + fileName);
    return undefined;
  }
};

//Certificados de conexion a la base de datos
const rootCertificate = readFile(global.gConfig.rootCertificate);
const clientCertificate = readFile(global.gConfig.clientCertificate);
const clientKey = readFile(global.gConfig.clientKey);

/**
 * serverConfig Permite definir la configuracion  de Proton, URL del servidor Domino, ssl habilitado
 * @return {json}      [retorna el contenido del directorio ]
 */
const serverConfig = {
  //Servidor domino a conectarse
  hostName:global.gConfig.Domino_hostName,
  connection: {
    //Depende del puerto configurado en la instalacion de proton
    port: global.gConfig.Domino_port,
    secure: true
  },
  credentials: {
    rootCertificate,
    clientCertificate,
    clientKey
  }
};

/**
 * databaseConfig Permite definir la configuracion de base de datos de domino que se utilizará
 * @return {json}      [retorna el contenido del directorio ]
 */
const databaseConfig = {
  filePath: global.gConfig.Domino_FilePath // The database file name
};

  
  module.exports = {
    useServer,
    fs,
    serverConfig,
    databaseConfig
  };
  