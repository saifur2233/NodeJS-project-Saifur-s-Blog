const X2JS = require('x2js');
const JS2PT = require('json-to-plain-text');
const json2html = require('json-to-html');
const jsonData = (inputData) => {
  return JSON.parse(JSON.stringify(inputData));
};
const xmlData = (inputData) => {
  const x2js = new X2JS();
  const myXML = x2js.js2xml(JSON.parse(JSON.stringify(inputData)));
  return myXML;
};
const textData = (inputData) => {
  return JS2PT.toPlainText(JSON.parse(JSON.stringify(inputData)));
};
const htmlData = (inputData) => {
  return json2html(JSON.parse(JSON.stringify(inputData)));
};
const sendResponse = (req, res, inputData, statuscode) => {
  if (!statuscode) statuscode = 200;
  return res.format({
    'application/json': function () {
      res.status(statuscode).send(jsonData(inputData));
    },
    'application/xml': function () {
      res.status(statuscode).send(xmlData(inputData));
    },
    'text/plain': function () {
      res.status(statuscode).send(textData(inputData));
    },
    'text/html': function () {
      res.status(statuscode).send(htmlData(inputData));
    },
    default: function () {
      res.status(statuscode).send(jsonData(inputData));
    },
  });
};
module.exports = sendResponse;
