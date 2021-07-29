'use strict';

module.exports = function(app) {
	const url = '/evcharge/api';

  const loginusr = require('../controller/User/loginUserController.js');
	const logoutusr = require('../controller/User/logoutUserController.js');
	const modifyusr = require('../controller/User/modifyUserController.js');
	const getusr = require('../controller/User/getUserController.js');

	const gethealth = require('../controller/Help/getHealthCheckController.js')
	const resetdb = require('../controller/Help/postResetController.js')

	const getsesprov = require('../controller/getSessions/getSessionsPerProviderController.js')
	const getsesev = require('../controller/getSessions/getSessionsPerEVController.js')
	const getsespoint = require('../controller/getSessions/getSessionsPerPointController.js')
	const getsessta = require('../controller/getSessions/getSessionsPerStationController.js')



  app.route(url+'/login')
		.post(loginusr.login_as_user);
	app.route(url+'/logout')
		.post(logoutusr.logout_user);

	app.route(url+'/admin/usermod/:username/:password')
		.post(modifyusr.modify_a_user);
	app.route(url+'/admin/users/:username')
		.get(getusr.get_a_user);

	app.route(url+'/admin/healthcheck')
		.get(gethealth.health_check);
	app.route(url+'/admin/resetsessions')
		.post(resetdb.reset_database);

	app.route(url+'/SessionsPerProvider/:providerID/:date_from/:date_to')
		.get(getsesprov.get_sessions_per_provider);
	app.route(url+'/SessionsPerEV/:vehicleID/:date_from/:date_to')
		.get(getsesev.get_sessions_per_ev);
	app.route(url+'/SessionsPerPoint/:pointID/:date_from/:date_to')
		.get(getsespoint.get_sessions_per_point);
	app.route(url+'/SessionsPerStation/:stationID/:date_from/:date_to')
		.get(getsessta.get_sessions_per_station);

}
