module.exports = class CSVParser 

  NAME = "jp.coe.mod.csvparser"

  csv2json = (csvArray) ->
    jsonArray = []
    
    # 1行目から「項目名」の配列を生成する
    items = csvArray[0].split(",")
    
    # CSVデータの配列の各行をループ処理する
    #// 配列の先頭要素(行)は項目名のため処理対象外
    #// 配列の最終要素(行)は空のため処理対象外
    i = 1
  
    while i < csvArray.length - 1
      a_line = new Object()
      
      # カンマで区切られた各データに分割する
      csvArrayD = csvArray[i].split(",")
      
      #// 各データをループ処理する
      j = 0
  
      while j < items.length
        
        # 要素名：items[j]
        # データ：csvArrayD[j]
        a_line[items[j]] = csvArrayD[j]
        j++
      jsonArray.push a_line
      i++
    
    #console.debug(jsonArray);
    jsonArray

  constructor: () ->
    # body...}
    # 
    
  @getJSON :(res) ->
    d = res.split(/\r\n|\r|\n/) # 1行ごとに分割する
    jsonArray = csv2json(d) # JSON形式に変換
    jsonArray
  
  @getFileToJSON :(res_filename) ->
    require(NAME).getJSON require(NAME).getCSVResString res_filename
    
    

  ###*
  リソースファイルから文字列取得
  ###
  @getCSVResString:(res_filename)->
    #csvファイルから文字列取得
    file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, res_filename)
    blob = file.read()
    readText = blob?.text
    Ti.API.debug "getfile = #{file.nativePath} #{blob}"

    readText
  