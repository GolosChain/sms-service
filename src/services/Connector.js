const core = require('gls-core-service');
const BasicConnector = core.services.Connector;
const Send = require('../controllers/Send');

class Connector extends BasicConnector {
    constructor(smsGate) {
        super();

        this._sendController = new Send({ smsGate, connector: this });
    }

    async start() {
        await super.start({
            serverRoutes: {
                sendPlainSms: this._sendController.sendPlainSms.bind(this._sendController),
            },
            requiredClients: {
                registration: env.GLS_REGISTRATION_CONNECT,
            },
        });
    }
}

module.exports = Connector;
