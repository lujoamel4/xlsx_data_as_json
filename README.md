# xlsx_data_as_json
Simple parse from xlsx to JSON.
This package depend of xslx package and it based in the Common SpreadSheet format defined on xslx package. 

## Node Compatibility
xlsx_data_as_json has been tested with node 8.10.0 and 11.10.1. However, it should work with previous versions.

# Usage
# Instalation
` npm instal xlsx_data_as_json `

## Quick Start
``` [JavaScript]
 const XlsxDataAsJson = require("xlsx_data_as_json");
 var rows = XlsxDataAsJson.parseFile(__dirname + "/menu1.xlsx");
```

# Input
A file(.ods, xlsx, etc.) with this table

|   | A          | B                         | C     | D         | E |
|--:|------------|---------------------------|-------|-----------|---|
| 1 | Name       | Description               | Price | Image     |   |
| 2 | Piza       | Tomate sauce, Muzarella  | 10    | /img/piza.png |   |
| 3 | Hamburguer |                           | 12    |           |   |

and those lines 
``` [JavaScript]
 const XlsxDataAsJson = require("xlsx_data_as_json");
 var rows = XlsxDataAsJson.parseFile(__dirname + "/menu1.xlsx");
```
# Output
rows variable should be
```[JavaScript]
[{
    "Name": "Piza",
    "Description": "Tomate sauce, Muzarella",
    "Price": "10",
    "Image": "/img/piza.png"
},{
    "Name": "Hamburguer",
    "Description": "",
    "Price": "12",
    "Image": ""
}]
```
