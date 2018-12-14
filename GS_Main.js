// Settings - Modify this with your values
// *************************

// User Defined in the Script
var API_KEY = "";
var ORG_ID = "";
var NET_ID = "";
var TIMESPAN = "";

// User Defined in a Sheet
var SHEET_NAME = "settings";
var API_KEY_SHEET_CELL = "B3";
var API_KEY_SHEET_CELL_LABEL = "A3";
var ORG_ID_SHEET_CELL = "B4";
var ORG_ID_SHEET_CELL_LABEL = "A4";
var NET_ID_SHEET_CELL = "B5";
var NET_ID_SHEET_CELL_LABEL = "A5";
var TIMESPAN_SHEET_CELL = "B6";
var TIMESPAN_SHEET_CELL_LABEL = "A6";

// *************************

// Initialize Settings Sheet and Environment Variables

// find or create settings sheet
var ss = SpreadsheetApp.getActiveSpreadsheet();
if (ss.getSheetByName(SHEET_NAME) == null) {
  ss.insertSheet(SHEET_NAME);
  ss.getRange(API_KEY_SHEET_CELL_LABEL).setValue("API KEY:");
  ss.getRange(ORG_ID_SHEET_CELL_LABEL).setValue("Org ID:");
  ss.getRange(NET_ID_SHEET_CELL_LABEL).setValue("Net ID:");
  ss.getRange(API_KEY_SHEET_CELL).setValue("YourAPIKey");
  ss.getRange(ORG_ID_SHEET_CELL).setValue("YourOrgId");
  ss.getRange(NET_ID_SHEET_CELL).setValue("YourNetId (optional)");
  ss.getRange(TIMESPAN_SHEET_CELL_LABEL).setValue("Timespan:");
  ss.getRange(TIMESPAN_SHEET_CELL).setValue(7200);
}
var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
  SHEET_NAME
);

// assign settings
var settings = {};
settings.apiKey =
  settingsSheet.getRange(API_KEY_SHEET_CELL).getValue() || API_KEY;
settings.orgId = settingsSheet.getRange(ORG_ID_SHEET_CELL).getValue() || ORG_ID;
settings.netId = settingsSheet.getRange(NET_ID_SHEET_CELL).getValue() || NET_ID;
settings.timespan =
  settingsSheet.getRange(TIMESPAN_SHEET_CELL).getValue() || TIMESPAN;

// web app - testing

function doGet() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  /*
   var yourNewSheet = activeSpreadsheet.insertSheet();
   var date = new Date();
  
   yourNewSheet.setName("Meraki Tools Workspace - "+date);
   */
  var app = HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Meraki Tools")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
  return app;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile("app/" + filename).getContent();
}

// ----
// Global Environment Variables - used by GS files
// ----

function setApiKey(apiKey) {
  Logger.log("setting API key" + apiKey);
  settings.apiKey = apiKey;
  settingsSheet.getRange(API_KEY_SHEET_CELL).setValue(apiKey);
}

function getApiKey(apiKey) {
  return settings.apiKey;
}

function setOrgId(orgId) {
  settings.orgId = orgId;
  settingsSheet.getRange(ORG_ID_SHEET_CELL).setValue(orgId);
}

function setNetId(netId) {
  settings.netId = netId;
  settingsSheet.getRange(NET_ID_SHEET_CELL).setValue(netId);
}

function setTimespan(timespan) {
  settings.timespan = timespan;
  settingsSheet.getRange(TIMESPAN_SHEET_CELL).setValue(timespan);
}

// Toolbar Menu Items
function onOpen() {
  loadMenu();
  loadSidebar();
}

function onInstall() {
  onOpen();
}

function loadSidebar() {
  //getScriptProperties_()
  var htmlTemplate = HtmlService.createTemplateFromFile("app/index");
  var html = htmlTemplate.evaluate().setTitle("Meraki Tools");
  SpreadsheetApp.getUi().showSidebar(html);
}

function loadMenu() {
  // Main Menu
  var ui = SpreadsheetApp.getUi();
  var mainMenu = ui.createMenu("Meraki-Reports");

  mainMenu.addItem("Main Menu", "loadSidebar");

  /*
  mainMenu.addItem('Organizations','callOrgs')
  mainMenu.addItem('Networks','callNetworks')
  */

  // Reports
  mainMenu.addSubMenu(
    SpreadsheetApp.getUi()
      .createMenu("Org-Wide")
      .addItem("Admins", "callAdmins")
      .addItem("Clients", "callClientsOfOrg")
      .addItem("Clients Details", "callClientsOfOrgDetails")
      .addItem("Configuration Templates", "callConfigTemplates")
      .addItem("Devices Details", "callDevices")
      .addItem("Devices Status", "callDevicesStatuses")
      .addItem("Devices Uplink Details", "callUplinkInfos")
      .addItem("License State", "callLicenseState")
      .addItem("License State all Orgs", "callLicenseStateForOrgs")
      .addItem("License State Details", "callLicenseStateDetails")
      .addItem("Group Policies", "callGroupPoliciesOfOrg")
      .addItem("Inventory", "callInventory")
      .addItem("Networks", "callNetworks")
      .addItem("Organizations", "callOrgs")
      .addItem("Organization", "callOrg")
      .addItem("SSIDs", "callSsidsOfOrg")
      .addItem("StaticRoutes", "callStaticRoutes")
      .addItem("Wireless Health Connection Stats", "callConnectionStatsOfOrg")
      .addItem("Wireless Health Latency Stats", "callLatencyStatsOfOrg")
      .addItem("Traffic Analysis", "callTrafficOfOrg") // Testing
      .addItem("VLANS", "callVlansOfOrg")
      .addItem("VPN", "callSiteToSiteVpn")
  );

  mainMenu.addSubMenu(
    SpreadsheetApp.getUi()
      .createMenu("Network-Wide")
      .addItem("Clients", "callClientsOfNet")
      .addItem("Clients Details", "callClientsOfNetDetails")
      .addItem(
        "Device Loss and Latency History",
        "callDeviceLossAndLatencyHistory"
      )
      .addItem("Sense Overview", "callCameraSenseOverview")
      .addItem("SSIDs", "callSsids")
      .addItem("Wireless Health Failed Connections", "callFailedConnections")
      .addItem(
        "Wireless Health Connection Stats by Device",
        "callConnectionStatsByNode"
      )
      .addItem(
        "Wireless Health Connection Stats by Client",
        "callConnectionStatsByClient"
      )
      .addItem(
        "Wireless Health Latency Stats by Device",
        "callLatencyStatsByNode"
      )
      .addItem(
        "Wireless Health Latency Stats by Client",
        "callLatencyStatsByClient"
      )
  );
  /*
  mainMenu.addSubMenu(SpreadsheetApp.getUi().createMenu('Settings')
      .addItem('Set API Key','promptApiKey')
      .addItem('Set Org ID','promptOrg')
      .addItem('Set Net ID','promptNet')
      .addItem('Set Timespan','promptTimespan'));
  */
  mainMenu.addToUi();
}

/*
function selectOrg(id){
  var ui = SpreadsheetApp.getUi();
  settings.orgId = id;
  ui.alert('Organization Set To: '+settings.orgId, ui.ButtonSet.YES_NO);
}
*/

/*
function promptApiKey(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Meraki API Key', 'Required to run reports.', ui.ButtonSet.OK_CANCEL);
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    
    // save key and refresh menu
    setApiKey(response.getResponseText());
    //ui.alert('API Key Set: '+settings.apiKey, ui.ButtonSet.YES_NO);

    loadMenu();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user didn\'t want to provide an API key.');
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function promptOrg(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Organization ID', 'Run the Organizations report to get this info.', ui.ButtonSet.OK_CANCEL);
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    Logger.log('The user\'s Org Id is %s.', response.getResponseText());
    // save key and refresh menu
    setOrgId(response.getResponseText());

    loadMenu();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user didn\'t want to provide an Org Id.');
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function promptNet(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Network ID', 'Sets the network for "network-wide" reports. Run the org-wide "Networks" report to get this info.', ui.ButtonSet.OK_CANCEL);
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    Logger.log('The user\'s Net Id is %s.', response.getResponseText());
    // save key and refresh menu
    setNetId(response.getResponseText());

    loadMenu();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user didn\'t want to provide an Net Id.');
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}

function promptTimespan(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Timespan', 'Used by some reports to get range of data', ui.ButtonSet.OK_CANCEL);
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    Logger.log('The user\'s timespan is %s.', response.getResponseText());
    // save key and refresh menu
    setTimespan(response.getResponseText());

    loadMenu();
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user didn\'t want to provide a timespan');
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}
*/

function isObject(obj) {
  return obj === Object(obj);
}

function displayJSON(json, keys) {
  if (!Array.isArray(json) || !keys.length) {
    // array does not exist, is not an array, or is empty
    Logger.log("displayJson did not receive json data");
    return;
  }
  if (!Array.isArray(keys) || !keys.length) {
    // array does not exist, is not an array, or is empty
    Logger.log("displayJson did not receive keys");
    return;
  }
  //json = [{"id":"1234","name":"sample"},{"id":"9876","name":"sample 2", "extra":"more info"}];
  Logger.log("displayJSON" + JSON.stringify(json));
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
  var values = [];
  var row = sheet.getActiveCell().getLastRow();
  var column = sheet.getActiveCell().getColumn();
  var numRows = 1;
  var numColumns = 1;

  // Display Headers (keys)
  sheet
    .getRange(
      sheet.getActiveCell().getLastRow(),
      sheet.getActiveCell().getColumn(),
      1,
      keys.length
    )
    .setValues([keys]);

  // Parse JSON Object
  if (!Array.isArray(json)) {
    // Get Values
    var v = [];
    keys.forEach(function(k) {
      v.push(json[k]);
    });
    values.push(v);
    Logger.log("Parse Object values " + values);
  } else {
    // Parse JSON Array of Objects
    for (i = 0; i < json.length; i++) {
      var data = json[i];

      // Get Values
      var v = [];
      keys.forEach(function(k) {
        v.push(data[k]);
      });
      values.push(v);
      Logger.log("Parse Array of Object values " + values);
    }
  }

  // Display Data
  numRows = values.length;
  numColumns = keys.length;
  /*
    Logger.log('display numRows: '+ numRows);
    Logger.log('display numColumns: ' + numColumns);
    Logger.log('values '+values);
  */
  sheet.getRange(row + 1, column, numRows, numColumns).setValues(values);
}

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object") {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
