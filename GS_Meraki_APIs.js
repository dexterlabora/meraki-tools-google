// **************************
// Meraki API 
// **************************

function getAdmins(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId+"/admins", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getOrgs(apiKey) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  data = data.replace(/([\[:])?(\d+)([,\}\]])/g, "$1\"$2\"$3");
  var json = JSON.parse(data);
  return json; 
}

function getOrg(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  data = data.replace(/([\[:])?(\d+)([,\}\]])/g, "$1\"$2\"$3");
  var json = JSON.parse(data)
  return json; 
}

function getNetworks(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId+"/networks", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getDevicesStatuses(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId+"/deviceStatuses", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getDevices(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/devices", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getDeviceLossAndLatencyHistory(apiKey, netId, serial, timespan) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/devices/"+serial+"/lossAndLatencyHistory?timespan="+timespan+"&ip=8.8.8.8&uplink=wan1", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getLicenseState(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId+"/licenseState", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json;
}

function getConfigTemplates(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId+"/configTemplates", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getClient(apiKey,netId, clientMac) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/clients/"+clientMac, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getClients(apiKey,serial) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/devices/"+serial+"/clients?timespan="+settings.timespan, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getInventory(apiKey, orgId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/organizations/"+orgId+"/inventory", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getGroupPolicies(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/groupPolicies", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getSsids(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/ssids", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getStaticRoutes(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/staticRoutes", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getUplinkInfo(apiKey, netId, serial) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/devices/"+serial+"/uplink", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getVlans(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/vlans", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data); 
  return json; 
}

function getSiteToSiteVpn(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/siteToSiteVpn", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}


// Requires Meraki Network to be configured with Hostname Visibility to work
function getTraffic(apiKey, netId) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/traffic?timespan=7200", {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

// Wireless Health 
function getConnectionStats(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/connectionStats?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getConnectionStatsByNode(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/devices/connectionStats?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getConnectionStatsByClient(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/clients/connectionStats?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getLatencyStats(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/latencyStats?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getLatencyStatsByNode(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/devices/latencyStats?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getLatencyStatsByClient(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/clients/latencyStats?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function getFailedConnections(apiKey, netId, t0, t1) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/networks/"+netId+"/failedConnections?t0="+t0+"&t1="+t1, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

// Sense
// GET /devices/[serial]/camera/analytics/overview
function getCameraSenseOverview(apiKey, serial, timespan) {
  var response = UrlFetchApp.fetch("https://api.meraki.com/api/v0/devices/"+serial+"/camera/analytics/overview?timespan="+timespan, {headers:{'X-Cisco-Meraki-API-Key': apiKey}});
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function provisionClient(apiKey, netId, data) {
  var options = {
     'method' : 'post',
     'payload' : data,
     'headers':{
       'X-Cisco-Meraki-API-Key': apiKey
     }
  };
  var response = UrlFetchApp.fetch("https://mp.meraki.com/api/v0/networks/"+netId+"/clients/provision", options);
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}

function claimOrder(apiKey, orgId, data) {
  var options = {
     'method' : 'post',
     'payload' : data,
     'headers':{
       'X-Cisco-Meraki-API-Key': apiKey
     }
  };
  var response = UrlFetchApp.fetch("https://mp.meraki.com/api/v0/organizations/"+orgId+"/claim", options);
  var data = response.getContentText();
  var json = JSON.parse(data);
  return json; 
}
