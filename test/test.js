/* global it, describe */
var assert = require('assert')

const JsonFactory = require('../JsonFactory')
const XlsxDataAsJson = require('../index')
console.log(XlsxDataAsJson)
const XLSX = require('xlsx')
var path = require('path')

describe('JsonFactory', function () {
  describe('getHeaders', function () {
    const mf = new JsonFactory()
    it('should return A1, B1, ..., XX1, until not null cell', function () {
      var wb = XLSX.readFile(path.join(__dirname, '/menu1.xlsx'))
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name]
        var headers = mf.getHeaders(sheet)
        var expectedHeader = ['Nombre', 'Descripción', 'Precio', 'URL de la imagen']
        for (let index = 0; index < expectedHeader.length; index++) {
          assert.strictEqual(headers[index], expectedHeader[index])
        }
      })
    })
  })

  describe('getBody', function () {
    const mf = new JsonFactory()
    it('Should return [], when the sheets is null or undefined or empty', function () {
      assert.strictEqual(mf.getBody(null).length === 0, true)
      assert.strictEqual(mf.getBody(undefined).length === 0, true)
    })

    it('Should return data in the file, when the sheets contain data', function () {
      var wb = XLSX.readFile(path.join(__dirname, '/menu1.xlsx'))
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name]
        var headers = ['name', 'description', 'price', 'url']
        var rows = mf.getBody(sheet, headers)
        assert.strictEqual(rows.length > 0, true)
        rows.forEach((row, index) => {
          var expectedData = resultData1[index]
          assert.strictEqual(row.name, expectedData.Nombre)
          assert.strictEqual(row.description, expectedData['Descripción'])
          assert.strictEqual(row.price.toString(), expectedData.Precio)
          assert.strictEqual(row.url, expectedData['URL de la imagen'])
        })
      })
    })

    it('should return data in the sheet, when the sheet contain data', function () {
      var wb = XLSX.readFile(path.join(__dirname, '/menu1.xlsx'))
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name]
        var rows = mf.getBody(sheet)
        assert.strictEqual(rows.length > 0, true)
        rows.forEach((row, index) => {
          var expectedData = resultData1[index]
          assert.strictEqual(row.Nombre, expectedData.Nombre)
          assert.strictEqual(row['Descripción'], expectedData['Descripción'])
          assert.strictEqual(row.Precio.toString(), expectedData.Precio.toString())
          assert.strictEqual(row['URL de la imagen'], expectedData['URL de la imagen'])
        })
      })
    })

    it('should return data in the sheet, when the sheet contain data', function () {
      var wb = XLSX.readFile(path.join(__dirname, '/menu2.xlsx'))
      wb.SheetNames.forEach(name => {
        var sheet = wb.Sheets[name]
        var rows = mf.getBody(sheet)
        assert.strictEqual(rows.length > 0, true)
        rows.forEach((row, index) => {
          assert.strictEqual(row.Nombre, resultData2[index].Nombre)
          assert.strictEqual(row['Descripción'], resultData2[index]['Descripción'])
          assert.strictEqual(row.Precio.toString(), resultData2[index].Precio.toString())
          assert.strictEqual(row['URL de la imagen'], resultData2[index]['URL de la imagen'])
        })
      })
    })
  })

  describe('getData', function () {
    const jsonFactory = new JsonFactory()
    it('Should return data in sheets until blank line, when file has data', function () {
      var rows = jsonFactory.getData(path.join(__dirname, '/menu1.xlsx'))
      var expectedData = resultData1
      assert.strictEqual(rows.length, expectedData.length)
      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre)
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })

    it('Should return data in sheets until blank line, when file has data', function () {
      var rows = jsonFactory.getData(path.join(__dirname, '/menu2.xlsx'))
      var expectedData = resultData2
      assert.strictEqual(rows.length, expectedData.length)
      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre)
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })
  })
})

/**
 * Test interface
 */
describe('It test the interface index.js', function () {
  describe('parseFile', function () {
    it('Should return data in sheets until blank line, when file has data', function () {
      var rows = XlsxDataAsJson.parseFile(path.join(__dirname, '/menu1.xlsx'))
      var expectedData = resultData1
      assert.strictEqual(rows.length, expectedData.length)
      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre.toString())
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })

    it('Should return data in sheets until blank line, when file has data', function () {
      var rows = XlsxDataAsJson.parseFile(path.join(__dirname, '/menu2.xlsx'))
      var expectedData = resultData2
      assert.strictEqual(rows.length, expectedData.length)
      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre.toString())
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })
  })
})

const resultData2 = [{
  Nombre: 'Piza Italiana',
  Descripción: 'Salsa, muzarella, peperoni, parmesano',
  Precio: '350',
  'URL de la imagen': 'www.serviciodeimagenes.com/unaimagen.png'
},
{
  Nombre: 'Milanesa Napolitana',
  Descripción: 'Milanesa, jamón, muzarella.',
  Precio: '234',
  'URL de la imagen': ''
},
{
  Nombre: 'Piza Común',
  Descripción: '',
  Precio: '200',
  'URL de la imagen': ''
}]

const resultData1 = [{
  Nombre: 'Piza Italiana',
  Descripción: 'Salsa, muzarella, peperoni, parmesano',
  Precio: '350',
  'URL de la imagen': 'www.serviciodeimagenes.com/unaimagen.png'
}]
