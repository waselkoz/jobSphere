const express = require('express');
const router = express.Router();
const { protect, checkRealm } = require('../middleware/authMiddleware');
const { getAllUsers, deleteUser, toggleUserStatus, sendWarning } = require('../controllers/adminController');

router.get('/users', protect, checkRealm(['admin']), getAllUsers);
router.delete('/users/:id', protect, checkRealm(['admin']), deleteUser);
router.put('/users/:id/status', protect, checkRealm(['admin']), toggleUserStatus);
router.post('/users/:id/warning', protect, checkRealm(['admin']), sendWarning);

module.exports = router;
