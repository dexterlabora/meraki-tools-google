function DeviceUplinkDetails() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A2').activate();
  callUplinkInfos();
};