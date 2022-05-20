const { logger } = require('../../utils/logger');
const { createTableUsers,createTableProperties: createTablePropertiesQuery } = require('../queries');

(() => {
    require('../../config/db.config').query(createTableUsers, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
    });

   require('../../config/db.config').query(createTablePropertiesQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table properties created!');
        process.exit(0);
    });
})();