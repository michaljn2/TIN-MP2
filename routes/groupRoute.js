const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
router.get('/', groupController.showGroupList);
router.get('/add', groupController.showAddGroupForm);
router.get('/details/:groupId', groupController.showGroupDetailsForm);
router.get('/edit/:groupId', groupController.showEditGroupForm);
router.post('/add', groupController.addGroup);
router.post('/edit', groupController.updateGroup);
router.get('/delete/:groupId', groupController.deleteGroup);
module.exports = router;