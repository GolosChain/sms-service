const core = require('gls-core-service');
const BasicController = core.controllers.Basic;
const Logger = core.utils.Logger;

class Registration extends BasicController {
    constructor({ smsGate, smsSecondCheck, connector }) {
        super({ connector });

        smsGate.on('incoming', this.incomingSms.bind(this));
        smsSecondCheck.on('sms', this.recentSmsList.bind(this));
    }

    async incomingSms(data = {}) {
        await this.callService('registration', 'incomingSms', data);
    }

    async recentSmsList(data = {}) {
        await this.callService('registration', 'recentSmsList', data);
    }

    async callService(...args) {
        try {
            await super.callService(...args);
        } catch (error) {
            Logger.warn(`Cant send data to registration-service - ${error}`);
        }
    }
}

module.exports = Registration;
