const { logger } = require('../../utils/logger');
const { createTableProperties: createTablePropertiesQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createTablePropertiesQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
        process.exit(0);
    });
})();