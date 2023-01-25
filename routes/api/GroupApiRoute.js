const express = require('express');
const router = express.Router();

const groupApiController = require('../../api/GroupAPI');
const isAuth = require('../../middleware/isAuth')

router.get('/', groupApiController.getGroups);
router.get('/:groupId', groupApiController.getGroupById);
router.post('/', isAuth, groupApiController.createGroup);
router.put('/:groupId', isAuth, groupApiController.updateGroup);
router.delete('/:groupId', isAuth, groupApiController.deleteGroup);

module.exports = router;