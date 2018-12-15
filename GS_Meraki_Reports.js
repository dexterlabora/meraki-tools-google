// **************************
// Reports
// **************************

function callOrgs() {
  var data = [];
  var keys = [];
  var result = getOrgs(settings.apiKey, settings.orgId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callOrg() {
  var data = [];
  var keys = [];
  var result = getOrg(settings.apiKey, settings.orgId);

  var flat = flattenObject(result);
  data.push(flat);

  // set keys
  Object.keys(flat).forEach(function(value) {
    if (keys.indexOf(value) == -1) keys.push(value);
  });

  displayJSON(data, keys);
}

function callAdmins() {
  var data = [];
  var keys = [];
  var result = getAdmins(settings.apiKey, settings.orgId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callNetworks() {
  var data = [];
  var keys = [];
  if (!settings.orgId) {
    promptOrg();
  }
  var result = getNetworks(settings.apiKey, settings.orgId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callDevices() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get Devices for each network in the organization
  for (var i = 0; i <= nets.length; i++) {
    try {
      var result = getDevices(settings.apiKey, nets[i].id);
      if (!Array.isArray(result)) {
        continue;
      }

      result.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["networkId"] = nets[i].id;
        flat["networkName"] = nets[i].name;
        data.push(flat);

        // set keys
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callSsids() {
  var data = [];
  var keys = [];
  var result = getSsids(settings.apiKey, settings.netId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callDeviceLossAndLatencyHistory() {
  var data = [];
  var keys = [];
  var devices = getDevices(settings.apiKey, settings.netId);

  // Get Devices for each network in the organization
  for (var i = 0; i <= devices.length; i++) {
    try {
      var result = getDeviceLossAndLatencyHistory(
        settings.apiKey,
        settings.netId,
        devices[i].serial,
        settings.timespan
      );
      if (!Array.isArray(result)) {
        continue;
      }

      result.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["deviceSerial"] = devices[i].serial;
        flat["deviceName"] = devices[i].name;
        data.push(flat);

        // set keys
        keys = ["deviceName", "deviceSerial"];
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}
function callDevicesStatuses() {
  var data = [];
  var keys = [];
  var result = getDevicesStatuses(settings.apiKey, settings.orgId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callInventory() {
  var data = [];
  var keys = [];
  var result = getInventory(settings.apiKey, settings.orgId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callLicenseState() {
  var data = [];
  var keys = [];
  var result = getLicenseState(settings.apiKey, settings.orgId);

  var flat = flattenObject(result);
  data.push(flat);

  keys = ["status", "expirationDate"];

  displayJSON(data, keys);
}

function callLicenseStateForOrgs() {
  var data = [];
  var keys = [];
  var orgs = getOrgs(settings.apiKey);

  // Get License State for each org for API key
  for (var i = 0; i <= orgs.length; i++) {
    try {
      var license = getLicenseState(settings.apiKey, orgs[i].id);

      // flatten object and add org info
      var flat = flattenObject(license);
      flat["orgId"] = orgs[i].id;
      flat["orgName"] = orgs[i].name;
      data.push(flat);

      // set keys
      keys = ["orgName", "orgId", "status", "expirationDate"];

      // device count details
      Object.keys(flat).forEach(function(value) {
        if (keys.indexOf(value) == -1) keys.push(value);
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callLicenseStateDetails() {
  var data = [];
  var keys = [];
  var result = getLicenseState(settings.apiKey, settings.orgId);

  var flat = flattenObject(result);
  data.push(flat);

  // set keys
  Object.keys(flat).forEach(function(value) {
    if (keys.indexOf(value) == -1) keys.push(value);
  });

  displayJSON(data, keys);
}

function callConfigTemplates() {
  var data = [];
  var keys = [];
  var result = getConfigTemplates(settings.apiKey, settings.orgId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callVlans() {
  var data = [];
  var keys = [];
  var result = getVlans(settings.apiKey, settings.netId);

  if (!Array.isArray(result)) {
    return;
  }
  result.forEach(function(obj) {
    var flat = flattenObject(obj);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callVlansOfOrg() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get VLANs for each network in the organization
  for (var i = 0; i <= nets.length; i++) {
    try {
      var result = getVlans(settings.apiKey, nets[i].id);
      if (!Array.isArray(result)) {
        continue;
      }

      result.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["networkId"] = nets[i].id;
        flat["networkName"] = nets[i].name;
        data.push(flat);

        // set keys
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callTrafficOfOrg() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get traffic analysis for each network in the organization
  for (var i = 0; i < nets.length; i++) {
    try {
      var traffic = getTraffic(settings.apiKey, nets[i].id);

      // flatten object and add network info
      var flat = flattenObject(traffic);
      flat.networkId = nets[i].id;
      flat.networkName = nets[i].name;

      // set data
      data.push(flat);

      // set keys
      Object.keys(flat).forEach(function(value) {
        if (keys.indexOf(value) == -1) keys.push(value);
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callSiteToSiteVpn() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get vpn info for each network in the organization
  for (var i = 0; i < nets.length; i++) {
    try {
      var vpn = getSiteToSiteVpn(settings.apiKey, nets[i].id);

      // flatten object and add network info
      var flat = flattenObject(vpn);
      flat.networkId = nets[i].id;
      flat.networkName = nets[i].name;

      // set data
      data.push(flat);

      // set keys
      Object.keys(flat).forEach(function(value) {
        if (keys.indexOf(value) == -1) keys.push(value);
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callSsidsOfOrg() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get SSIDs for each network in the organization
  for (var i = 0; i <= nets.length; i++) {
    try {
      var ssids = getSsids(settings.apiKey, nets[i].id);
      if (!Array.isArray(ssids)) {
        continue;
      }

      ssids.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["networkId"] = nets[i].id;
        flat["networkName"] = nets[i].name;
        data.push(flat);

        // set keys
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callGroupPoliciesOfOrg() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get Policies for each network in the organization
  for (var i = 0; i < nets.length; i++) {
    try {
      var policies = getGroupPolicies(settings.apiKey, nets[i].id);
      if (!Array.isArray(policies)) {
        continue;
      }

      policies.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["networkId"] = nets[i].id;
        flat["networkName"] = nets[i].name;
        data.push(flat);

        // set keys
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callClientsOfOrg() {
  var data = [];
  var keys = [];
  const devices = getDevicesStatuses(settings.apiKey, settings.orgId);
  const nets = getNetworks(settings.apiKey, settings.orgId);

  // Get clients for each device in the organization
  for (var i = 0; i < devices.length; i++) {
    try {
      var clients = getClients(settings.apiKey, devices[i].serial);

      if (!Array.isArray(clients)) {
        continue;
      }

      clients.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat.deviceName = devices[i].name;
        flat.deviceLanIp = devices[i].lanIp;
        flat.deviceWan1IP = devices[i].wan1Ip;
        flat.deviceWan2IP = devices[i].wan2Ip;
        flat.deviceMac = devices[i].mac;
        flat.deviceName = devices[i].name;
        flat.networkId = devices[i].networkId;
        flat.networkName = nets.filter(function(obj) {
          return devices[i].networkId == obj["id"];
        })[0]["name"];

        data.push(flat);

        // set keys
        keys = [
          "description",
          "dhcpHostname",
          "mac",
          "ip",
          "usage.sent",
          "usage.recv",
          "id",
          "networkId",
          "networkName"
        ];
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callClientsOfOrgDetails() {
  var data = [];
  var keys = [];
  const devices = getDevicesStatuses(settings.apiKey, settings.orgId);
  const nets = getNetworks(settings.apiKey, settings.orgId);

  // Get clients for each device in the organization
  for (var i = 0; i < devices.length; i++) {
    try {
      var clients = getClients(settings.apiKey, devices[i].serial);

      if (!Array.isArray(clients)) {
        continue;
      }

      clients.forEach(function(obj) {
        // flatten object
        var flat = flattenObject(obj);

        // add network info
        flat.deviceName = devices[i].name;
        flat.deviceLanIp = devices[i].lanIp;
        flat.deviceWan1IP = devices[i].wan1Ip;
        flat.deviceWan2IP = devices[i].wan2Ip;
        flat.deviceMac = devices[i].mac;
        flat.deviceName = devices[i].name;
        flat.networkId = devices[i].networkId;
        flat.networkName = nets.filter(function(obj) {
          return devices[i].networkId == obj["id"];
        })[0]["name"];

        // add client info
        var client = getClient(settings.apiKey, devices[i].networkId, obj.mac);
        for (var attrname in client) {
          flat[attrname] = client[attrname];
        }

        data.push(flat);

        // set keys
        keys = [
          "description",
          "dhcpHostname",
          "mac",
          "ip",
          "usage.sent",
          "usage.recv",
          "id",
          "networkId",
          "networkName"
        ];
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callClientsOfNet() {
  var data = [];
  var keys = [];
  var deviceStatuses = getDevicesStatuses(settings.apiKey, settings.orgId);

  var devices = deviceStatuses.filter(function(d) {
    return d.networkId == settings.netId;
  });

  // Get clients for each device in the organization
  for (var i = 0; i < devices.length; i++) {
    try {
      var clients = getClients(settings.apiKey, devices[i].serial);

      if (!Array.isArray(clients)) {
        continue;
      }

      clients.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat.deviceName = devices[i].name;
        flat.deviceLanIp = devices[i].lanIp;
        flat.deviceWan1IP = devices[i].wan1Ip;
        flat.deviceWan2IP = devices[i].wan2Ip;
        flat.deviceMac = devices[i].mac;
        flat.deviceName = devices[i].name;
        flat.networkId = devices[i].networkId;
        data.push(flat);

        // set keys
        keys = [
          "description",
          "dhcpHostname",
          "mac",
          "ip",
          "usage.sent",
          "usage.recv",
          "id"
        ];
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callClientsOfNetDetails() {
  var data = [];
  var keys = [];
  var deviceStatuses = getDevicesStatuses(settings.apiKey, settings.orgId);

  var devices = deviceStatuses.filter(function(d) {
    return d.networkId == settings.netId;
  });

  // Get clients for each device in the organization
  for (var i = 0; i < devices.length; i++) {
    try {
      var clients = getClients(settings.apiKey, devices[i].serial);
      // Logger.log(JSON.parse(clients));
      if (!Array.isArray(clients)) {
        continue;
      }

      clients.forEach(function(obj) {
        var client = getClient(settings.apiKey, devices[i].networkId, obj.mac);
        Logger.log(client);
        // flatten object
        var flat = flattenObject(obj);

        // Copy device info
        flat.deviceName = devices[i].name;
        flat.deviceLanIp = devices[i].lanIp;
        flat.deviceWan1IP = devices[i].wan1Ip;
        flat.deviceWan2IP = devices[i].wan2Ip;
        flat.deviceMac = devices[i].mac;
        flat.deviceName = devices[i].name;
        flat.networkId = devices[i].networkId;

        // Copy over all client details
        for (var attrname in client) {
          flat[attrname] = client[attrname];
        }

        Logger.log("flat" + JSON.stringify(flat));
        data.push(flat);

        // set keys
        keys = [
          "description",
          "dhcpHostname",
          "mac",
          "ip",
          "usage.sent",
          "usage.recv",
          "id"
        ];
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callStaticRoutes() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);

  // Get routes for each network in the organization
  for (var i = 0; i <= nets.length; i++) {
    try {
      var routes = getStaticRoutes(settings.apiKey, nets[i].id);

      if (!Array.isArray(routes)) {
        continue;
      }
      routes.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["networkId"] = nets[i].id;
        flat["networkName"] = nets[i].name;
        data.push(flat);

        // set keys
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callConnectionStatsOfOrg() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);
  /*
  var nets = [
    {
      "name":"test",
      "id":"L_643451796760561218"
    }
  ];
  */
  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  // Get routes for each network in the organization
  for (var i = 0; i <= nets.length; i++) {
    try {
      var stats = getConnectionStats(settings.apiKey, nets[i].id, t0, t1);
      Logger.log("stats " + JSON.stringify(stats));
      typeof val === "object";
      if (!isObject(stats)) {
        stats = {};
        //continue;
      }

      // flatten object and add network info
      var flat = flattenObject(stats);
      flat["networkId"] = nets[i].id;
      flat["networkName"] = nets[i].name;
      Logger.log("stats parsed " + JSON.stringify(flat));
      data.push(flat);

      // set keys
      Object.keys(flat).forEach(function(value) {
        if (keys.indexOf(value) == -1) keys.push(value);
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callLatencyStatsOfOrg() {
  var data = [];
  var keys = [];
  var nets = getNetworks(settings.apiKey, settings.orgId);
  /*
  var nets = [
    {
      "name":"test",
      "id":"L_643451796760561218"
    }
  ];
  */
  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  // Get routes for each network in the organization
  for (var i = 0; i <= nets.length; i++) {
    try {
      var stats = getLatencyStats(settings.apiKey, nets[i].id, t0, t1);
      Logger.log("stats " + JSON.stringify(stats));
      typeof val === "object";
      if (!isObject(stats)) {
        stats = {};
        //continue;
      }

      // flatten object and add network info
      var flat = flattenObject(stats);
      flat["networkId"] = nets[i].id;
      flat["networkName"] = nets[i].name;
      Logger.log("stats parsed " + JSON.stringify(flat));
      data.push(flat);

      // set keys
      Object.keys(flat).forEach(function(value) {
        if (keys.indexOf(value) == -1) keys.push(value);
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callConnectionStatsByNode() {
  var data = [];
  var keys = [];

  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  var stats = getConnectionStatsByNode(settings.apiKey, settings.netId, t0, t1);

  stats.forEach(function(s) {
    // flatten object and add network info
    var flat = flattenObject(s);
    flat["networkId"] = settings.netId;
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callConnectionStatsByClient() {
  var data = [];
  var keys = [];

  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  var stats = getConnectionStatsByClient(
    settings.apiKey,
    settings.netId,
    t0,
    t1
  );

  stats.forEach(function(s) {
    // flatten object and add network info
    var flat = flattenObject(s);
    flat["networkId"] = settings.netId;
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callLatencyStatsByNode() {
  var data = [];
  var keys = [];

  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  var stats = getLatencyStatsByNode(settings.apiKey, settings.netId, t0, t1);

  stats.forEach(function(s) {
    // flatten object and add network info
    var flat = flattenObject(s);
    flat["networkId"] = settings.netId;
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callLatencyStatsByClient() {
  var data = [];
  var keys = [];

  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  var stats = getLatencyStatsByClient(settings.apiKey, settings.netId, t0, t1);

  stats.forEach(function(s) {
    // flatten object and add network info
    var flat = flattenObject(s);
    flat["networkId"] = settings.netId;
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callFailedConnections() {
  var data = [];
  var keys = [];

  var t1 = Math.floor(new Date().getTime() / 1000);
  var t0 = t1 - settings.timespan;

  var stats = getFailedConnections(settings.apiKey, settings.netId, t0, t1);

  stats.forEach(function(s) {
    // flatten object and add network info
    var flat = flattenObject(s);
    flat["networkId"] = settings.netId;
    data.push(flat);

    // set keys
    keys = ["clientMac"];
    Object.keys(flat).forEach(function(value) {
      if (keys.indexOf(value) == -1) keys.push(value);
    });
  });

  displayJSON(data, keys);
}

function callUplinkInfos() {
  var data = [];
  var keys = [];
  var devices = getDevicesStatuses(settings.apiKey, settings.orgId);

  // Get uplink info for each device in the organization
  for (var i = 0; i < devices.length; i++) {
    try {
      var uplink = getUplinkInfo(
        settings.apiKey,
        devices[i].networkId,
        devices[i].serial
      );

      // flatten object and add network info
      var flat = flattenObject(uplink);
      flat.networkId = devices[i].networkId;
      flat.serial = devices[i].serial;
      flat.mac = devices[i].mac;
      flat.deviceName = devices[i].name;
      flat.status = devices[i].status;

      // set data
      data.push(flat);

      // set keys
      keys = ["networkId", "serial", "mac", "deviceName", "status"];
      Object.keys(flat).forEach(function(value) {
        if (keys.indexOf(value) == -1) keys.push(value);
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}

function callCameraSenseOverview() {
  var data = [];
  var keys = [];
  var devices = getDevices(settings.apiKey, settings.netId);

  // Get Devices for each network in the organization
  for (var i = 0; i <= devices.length; i++) {
    try {
      var result = getCameraSenseOverview(
        settings.apiKey,
        devices[i].serial,
        settings.timespan
      );
      if (!Array.isArray(result)) {
        continue;
      }

      result.forEach(function(obj) {
        // flatten object and add network info
        var flat = flattenObject(obj);
        flat["zoneId"] = String(flat.zoneId);
        flat["deviceSerial"] = devices[i].serial;
        flat["deviceName"] = devices[i].name;
        data.push(flat);

        // set keys
        keys = ["deviceName", "deviceSerial"];
        Object.keys(flat).forEach(function(value) {
          if (keys.indexOf(value) == -1) keys.push(value);
        });
      });
    } catch (e) {
      Logger.log("error" + e);
      continue;
    }
  }
  displayJSON(data, keys);
}
