var assert = require('assert');

const XlsxDataAsJson = require('../XlsxDataAsJson');

const XLSX = require("xlsx");
var fs = require('fs');

describe('XlsxDataAsJson', function () {
  describe('getHeaders', function () {
    const mf = new XlsxDataAsJson();
    it("should return A1, B1, ..., XX1, until not null cell", function () {
      var wb = XLSX.readFile(__dirname + "/menu1.xlsx");
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name];
        var headers = mf.getHeaders(sheet);
        var expectedHeader = ["Nombre", "Descripción", "Precio", "URL de la imagen"];
        for (let index = 0; index < expectedHeader.length; index++) {
          assert.equal(headers[index], expectedHeader[index]);
        }
      })
    });
  });

  describe('getBody', function () {
    const mf = new XlsxDataAsJson();
    it("Should return [], when the sheet is null or undefined or empty", function () {
      assert.equal(mf.getBody(null).length == 0, true);
      assert.equal(mf.getBody(undefined).length == 0, true);
    });

    it("Should return data in the sheet, when the sheet contain data", function () {
      var wb = XLSX.readFile(__dirname + "/menu1.xlsx");
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name];
        var headers = ["name", "description", "price", "url"];;
        var rows = mf.getBody(sheet, headers);
        assert.equal(rows.length > 0, true);
        rows.forEach((row, index) => {
          var expectedData = resultData1[index];
          assert.equal(row["name"], expectedData["Nombre"]);
          assert.equal(row["description"], expectedData["Descripción"]);
          assert.equal(row["price"], expectedData["Precio"]);
          assert.equal(row["url"], expectedData["URL de la imagen"]);
        });
      });
    });

    it("should return data in the sheet, when the sheet contain data", function () {
      var wb = XLSX.readFile(__dirname + "/menu1.xlsx");
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name];
        var rows = mf.getBody(sheet);
        assert.equal(rows.length > 0, true);
        rows.forEach((row, index) => {
          var expectedData = resultData1[index];
          assert.equal(row["Nombre"], expectedData["Nombre"]);
          assert.equal(row["Descripción"], expectedData["Descripción"]);
          assert.equal(row["Precio"], expectedData["Precio"]);
          assert.equal(row["URL de la imagen"], expectedData["URL de la imagen"]);
        });
      });
    });

    it("should return data in the sheet, when the sheet contain data", function () {
      var wb = XLSX.readFile(__dirname + "/menu2.xlsx");
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name];
        var rows = mf.getBody(sheet);
        assert.equal(rows.length > 0, true);
        rows.forEach((row, index) => {
          assert.equal(row["Nombre"], resultData2[index]["Nombre"]);
          assert.equal(row["Descripción"], resultData2[index]["Descripción"]);
          assert.equal(row["Precio"], resultData2[index]["Precio"]);
          assert.equal(row["URL de la imagen"], resultData2[index]["URL de la imagen"]);
        });
      });
    });
  });
  
  describe('parseFile', function () {
    const jsonFactory = new XlsxDataAsJson();
    it("Should return data in sheets until blank line, when file has data", function () {
      var rows = jsonFactory.getData(__dirname + "/menu1.xlsx");
      var expectedData = resultData1;
      assert.equal(rows.length, expectedData.length);
      rows.forEach((row, index) => {
        assert.equal(row["Nombre"], expectedData[index]["Nombre"]);
        assert.equal(row["Descripción"], expectedData[index]["Descripción"]);
        assert.equal(row["Precio"], expectedData[index]["Precio"]);
        assert.equal(row["URL de la imagen"], expectedData[index]["URL de la imagen"]);
      });
    });
    
    it("Should return data in sheets until blank line, when file has data", function () {
      var rows = jsonFactory.getData(__dirname + "/menu2.xlsx");
      var expectedData = resultData2;
      assert.equal(rows.length, expectedData.length);
      rows.forEach((row, index) => {
        assert.equal(row["Nombre"], expectedData[index]["Nombre"]);
        assert.equal(row["Descripción"], expectedData[index]["Descripción"]);
        assert.equal(row["Precio"], expectedData[index]["Precio"]);
        assert.equal(row["URL de la imagen"], expectedData[index]["URL de la imagen"]);
      });
    });
  });

});

const resultData2 = [{
  "Nombre": "Piza Italiana",
  "Descripción": "Salsa, muzarella, peperoni, parmesano",
  "Precio": "350",
  "URL de la imagen": "www.serviciodeimagenes.com/unaimagen.png"
},
{
  "Nombre": "Milanesa Napolitana",
  "Descripción": "Milanesa, jamón, muzarella.",
  "Precio": "234",
  "URL de la imagen": ""
},
{
  "Nombre": "Piza Común",
  "Descripción": "",
  "Precio": "200",
  "URL de la imagen": ""
}];

const resultData1 = [{
  "Nombre": "Piza Italiana",
  "Descripción": "Salsa, muzarella, peperoni, parmesano",
  "Precio": "350",
  "URL de la imagen": "www.serviciodeimagenes.com/unaimagen.png"
}];