const XLSX = require("xlsx");

class XlsxDataAsJson {
    /**
     * use getData(sheet, headers) when need custom headers
     * @param sheet is Sheet
     * @param headers is an array with headers
     */
    getBody(sheet, headers) {
        if (!sheet) { return [] };
        if (!headers) headers = this.getHeaders(sheet);
        var result = [];
        var line = 2;
        var blankLine = false;
        while (!blankLine) {
            var blankCell = 0;
            var row = {};

            headers.forEach((element, index) => {
                var column = String.fromCharCode("A".charCodeAt() + index);
                var cell = sheet[column + line];
                if (!cell) {
                    cell = {};
                    cell['v'] = "";
                    blankCell++;
                }
                row[element] = cell.v;
            });

            blankLine = blankCell == headers.length;
            if (!blankLine) {
                result.push(row);
            }
            line++;
        }
        return result;
    }
    /**
     * Use this to get headers of table
     * @param sheet is sheet from xlsx library
     */
    getHeaders(sheet) {
        if (!sheet) return [];
        var result = [];
        var column = "A";
        const line = 1;
        var cell = sheet[column + line];
        while (cell) {
            result.push(cell.v);
            column = String.fromCharCode(column.charCodeAt() + 1);
            cell = sheet[column + line];
        }
        return result;
    }

    getData(fileUrl) {
        var wb = XLSX.readFile(fileUrl);
        var result = [];
        wb.SheetNames.forEach(name => {
            var sheet = wb.Sheets[name];
            this.getBody(sheet).forEach(row => {
                result.push(row);
            });
        });
        return result;
    }

}


module.exports = XlsxDataAsJson;