function writeFormData(rowContents) {
  //Write data to sheet
  //SpreadsheetApp.getActiveSpreadsheet().appendRow(rowContents);
  //Logger.log('writeFormData: ' + rowContents);
  //SpreadsheetApp.getActive().getSheetId('yourID here').appendRow(rowContents)
  var data = [rowContents
    ];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
  var values = [];
  var row = sheet.getActiveCell().getLastRow();
  var column = sheet.getActiveCell().getColumn();
  var numRows = 1;
  var numColumns = 1;
  
  // Display Data
    sheet.getRange(sheet.getActiveCell().getLastRow(), sheet.getActiveCell().getColumn(), 1, data.length).setValues([data]);
}
