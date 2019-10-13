const replaceItems = (docContact) => {
    return { 
        FirstName : docContact.FirstName,
        LastName : docContact.LastName,
        City : docContact.City,
        State : docContact.State
    }
};
const newDocument = (docContact) => {
    return { 
        Form: "Contact",
        FirstName : docContact.FirstName,
        LastName : docContact.LastName,
        City : docContact.City,
        State : docContact.State
    }
};
module.exports = {
    replaceItems,
    newDocument
};
