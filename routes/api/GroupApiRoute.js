const express = require('express');
const router = express.Router();

const groupApiController = require('../../api/GroupAPI');

router.get('/', groupApiController.getGroups);
router.get('/:groupId', groupApiController.getGroupById);
router.post('/', groupApiController.createGroup);
router.put('/:groupId', groupApiController.updateGroup);
router.delete('/:groupId', groupApiController.deleteGroup);

module.exports = router;