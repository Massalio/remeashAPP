
const API = {}

// Configuration
API.config = {
	// serverRoute: 'http://rocky-headland-53719.herokuapp.com/api/v1'
	serverRoute: 'http://192.168.2.100:8000/api/v1'
}
const headers = {
  'Content-Type': 'application/json',
}

// Endpoints

// Create Meter (not need it)
/*
{
	"meter": {
		"DBID": "aecbe4ed-c995-4376-be72-bcfea9ece591",
		"ID": 2,
		"consumption": 2372.508053543617,
		"timestamp": 1540651470.0565515,
		"value": 20
	}
}
*/
API.meters = ({ID, value}) => {
  return fetch(`${API.config.serverRoute}/meters`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ID, value})
  });
};

// Query for consumption 
/*
{
	"meter": [
		{
			"DBID": "62b14c66-da28-466b-a609-f1b1e1f6269b",
			"ID": "Mayada",
			"consumption": 1.9339335978031158,
			"timestamp": 1541348464.0351772,
			"value": 0
		},
		{
			"DBID": "de2f9059-43ac-4aed-b1de-aa4a65084cb0",
			"ID": "Carlos",
			"consumption": 0.25432728161414464,
			"timestamp": 1541348431.9028873,
			"value": 0
		}
	]
}
*/
API.getConsumptions = (ids) => {
  return fetch(`${API.config.serverRoute}/meters/meterConsumption`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ meterConsumption: ids })
  });
};

/* Initialize meter switches */
/*
{
	"meterSwitch": {
		"ID": 2,
		"value": true
	}
}
*/
API.meterSwitches = ({ID, value}) => {
  return fetch(`${API.config.serverRoute}/meter_switches`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ID, value})
  });
};

/* List status for the given switches*/
/*
{
	"meterSwitches": [
		{
			"ID": 1,
			"value": true
		},
		{
			"ID": 2,
			"value": true
		}
	]
}
*/
API.meterSwitchesList = ({listOfIDs}) => {
  return fetch(`${API.config.serverRoute}/meter_switches/list`, {
    method: 'POST',
    headers,
    body: JSON.stringify({listOfIDs})
  });
};

export default API;
