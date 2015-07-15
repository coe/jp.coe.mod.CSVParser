// Generated by CoffeeScript 1.9.2
var CSVParser;

module.exports = CSVParser = (function() {
  var NAME, csv2json;

  NAME = "jp.coe.mod.csvparser";

  csv2json = function(csvArray) {
    var a_line, csvArrayD, i, items, j, jsonArray;
    jsonArray = [];
    items = csvArray[0].split(",");
    i = 1;
    while (i < csvArray.length - 1) {
      a_line = new Object();
      csvArrayD = csvArray[i].split(",");
      j = 0;
      while (j < items.length) {
        a_line[items[j]] = csvArrayD[j];
        j++;
      }
      jsonArray.push(a_line);
      i++;
    }
    return jsonArray;
  };

  function CSVParser() {}


  /**
  文字列からjson取得
  @param {String} 文字列
  @return {Array} json array
   */

  CSVParser.getJSON = function(res) {
    var d, jsonArray;
    d = res.split(/\r\n|\r|\n/);
    jsonArray = csv2json(d);
    return jsonArray;
  };


  /**
  リソースファイルからjson取得
  @param {String} ファイル名
  @return {Array} json array
   */

  CSVParser.getFileToJSON = function(res_filename) {
    return require(NAME).getJSON(require(NAME).getCSVResString(res_filename));
  };


  /**
  リソースファイルから文字列取得
  @param {String} ファイル名
  @return {String} file string
   */

  CSVParser.getCSVResString = function(res_filename) {
    var blob, file, readText;
    file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, res_filename);
    blob = file.read();
    readText = blob != null ? blob.text : void 0;
    Ti.API.debug("getfile = " + file.nativePath + " " + blob);
    return readText;
  };

  return CSVParser;

})();
