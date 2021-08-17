# xlsx_data_as_json
Simple parse from .xlsx, .csv, .ods, etc... to JSON.
This package depend of xslx package and it based in the Common SpreadSheet format defined on xslx package. 

## Node Compatibility
xlsx_data_as_json has been tested with node 8.x, 10.x, 11.x, 12.x, 14.x, 15.x, and 16.x. However, it should work with previous versions.

# Usage
# Instalation
` npm install xlsx_data_as_json `

## Quick Start
``` [JavaScript]
 const XlsxDataAsJson = require("xlsx_data_as_json");
 var rows = XlsxDataAsJson.parseFile(__dirname + "/menu1.xlsx");
```

# Input
A file named "menu1.xlsx" (may be have another extension like .csv, .ods, etc.) with this table.

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



### v1.0.1 
- main functionality

### v1.0.2
- improves code style

### v1.0.3
- Make it works with AA, AB, ... columns
