const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const {create_property, get_all_properties, get_property, find_by_type, update_property, update_status, delete_property} = require('../controllers/property.controller');
const { property:propertyValidator } = require('../validators/property')

router.route('/').post(propertyValidator, asyncHandler(create_property));
router.route('/').get(asyncHandler(get_all_properties));
router.route('/search').get(asyncHandler(find_by_type));
router.route('/:id').get(asyncHandler(get_property));
router.route('/:id').patch(asyncHandler(update_property));
router.route('/sold').patch(asyncHandler(update_status));
router.route('/:id').delete(asyncHandler(delete_property));

module.exports = router;