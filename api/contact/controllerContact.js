/**
 * @file 
 * Provee las Apis para brindar un CRUD de un tipo de documento en Domino 10.
 */

//Obtiene la configuracion desde domino
const configDomino = require("../../config/dominoConfig");

const contact=require('../../model/contact');

/**
 * @api {get} /api/contact/
 * Obtiene la lista de documentos de contacto que estan almacendaod
 * Se hace una consulta directamente a la base de datos en domino por medio de DQL
 *
 * @function
 * @param {Object} req 
 * @param {Object} res
 * @return [json]
 */
const get = (req, res) => {
  configDomino.useServer(configDomino.serverConfig).then(async server => {
    const database = await server.useDatabase(configDomino.databaseConfig);
    const documents = await database.bulkReadDocuments({
      query: "Form = 'Contact'", //query DQL
      itemNames: ["FirstName", "LastName", "City", "State"]//Items que quiero obtener
    });
    let docs = await documents.documents;
    console.log(documents.length);
    if (docs != 0) { 
      res.json({
        docs
      });
    } else {
      res.json({
        seccess: false,
        msg: "Document was not found."
      });
    }
  });
};
/**
 * @api {get} /api/contact/id
 * Obtiene un documento de acuerdo al UNID proporcionado
 *
 * @function
 * @param {Object} req 
 * @param {Object} res
 * @return json
 */
const getByUNID = (req, res) => {
  let idParam = req.params.id;
  let myDocument;
  configDomino.useServer(configDomino.serverConfig).then(async server => {
    const database = await server.useDatabase(configDomino.databaseConfig);
    const documents = await database.bulkReadDocumentsByUnid({
      unids: [idParam],
      itemNames: ["FirstName", "LastName", "City", "State"]
    });
    if (documents != null) {
      myDocument = await documents.documents[0];
    }
    if (myDocument.FirstName != null) {
      res.json({
        seccess: true,
        document: myDocument
      });
    } else {
      res.json({
        seccess: false,
        msg: "Document was not found."
      });
    }
  });
};
/**
 * @api {delete} /api/contact/id
 * Elimina un documento de acuerdo al UNID que se le proporciona.
 * Se hace una consulta directamente a la base de datos en domino por medio de DQL
 *
 * @function
 * @param {Object} req 
 * @param {Object} res
 * @return json
 */
const del = (req, res) => {
  let idParam = req.params.id;
  configDomino.useServer(configDomino.serverConfig).then(async server => {
    const database = await server.useDatabase(configDomino.databaseConfig);
    const document = await database.useDocument({
      unid: idParam
    });
    let result = await document.delete().catch(e => {
      console.log(e);
      return false;
    });
    if (result != false) {
      res.status(200).json({
        success: true
      });
    } else {
      res.status(500).json({
        success: true,
        msj: "document not found"
      });
    }
  });
};
/**
 * @api {post} /api/contact/
 * Crea un documento nuevo.
 * Se hace una consulta directamente a la base de datos en domino por medio de DQL
 *
 * @function
 * @param {Object} req 
 * @param {Object} res
 * @return json
 */
const post = (req, res) => {
  let idParametro = req.params.id;
  let document = contact.newDocument(req.body);
  //Conecta al Servidor domino y ejecuta el comando
  configDomino.useServer(configDomino.serverConfig).then(async server => {
    const database = await server.useDatabase(configDomino.databaseConfig);
    //const unid = await database.createDocument(document);
    const unid = await database.createDocument({
      document
    });
    // Display the new document UNID
    console.log(`Documents creclsated: ${unid}`);
  });
  res.json({
    seccess: true,
    msg: "test"
  });
};
/**
 * @api {put} /api/contact/id
 * Actualiza un documento.
 * Se hace una consulta directamente a la base de datos en domino por medio de DQL
 *
 * @module post
 * @function
 * @param {Object} req 
 * @param {Object} res
 * @return json
 */
const put = (req, res) => {
  let _unid = req.body['@unid'];
  let replaceItems = contact.replaceItems(req.body);
  if (_unid != "") {
    configDomino.useServer(configDomino.serverConfig).then(async server => {
      const database = await server.useDatabase(configDomino.databaseConfig);
      const document = await database.useDocument({
        unid: _unid
      });
      let result = await document
        .replaceItems({
          replaceItems
        })
        .catch(e => {
          console.log(e);
          return false;
        });
      if (result != false) {
        res.status(200).json({
          success: true
        });
      } else {
        res.status(500).json({
          success: true,
          msj: "document not found"
        });
      }
    });
  } else {
    res.status(500).json({
      success: true,
      msj: "document not found"
    });
  }
};
// export { getUserPublications, loginUser, logOutUser };
module.exports = {
  get,
  getByUNID,
  post,
  put,
  del
};
