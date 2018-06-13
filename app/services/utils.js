const crypto = require('crypto');

module.exports = {

    hash: (password) => {
        const hashPassword = crypto.createHmac('sha256', password)
            .update('random')
            .digest('hex');
        return hashPassword;
    },

    isValidRequest: (data, expectedFields) => {
        const hasAllFields = expectedFields.reduce((acc, field) => {
            return acc && data.hasOwnProperty(field);
        }, true);
        return hasAllFields;
    },

    isJsonValid: (data) => {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    }
};
