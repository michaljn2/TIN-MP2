const GroupRepository = require("../repository/sequelize/GroupRepository");
exports.showGroupList = (req, res, next) => {
    GroupRepository.getGroups()
        .then(groups => {
            res.render('pages/group/list', {
                groups: groups,
                navLocation: 'group'
            });
        });
}

exports.showAddGroupForm = (req, res, next) => {
    res.render('pages/group/form', {
        group:{},
        pageTitle: req.__('group.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('group.form.add.btnLabel'),
        formAction: '/groups/add',
        navLocation: 'group',
        validationErrors: []
    });
}

exports.showGroupDetailsForm = (req, res, next) => {
    const grpId = req.params.groupId;
    GroupRepository.getGroupById(grpId)
        .then(group => {
            res.render('pages/group/form', {
                group: group,
                formMode: 'showDetails',
                pageTitle: req.__('group.form.details.pageTitle'),
                formAction: '',
                navLocation: 'group',
                validationErrors: []
            });
        });
}

exports.showEditGroupForm = (req, res, next) => {
    const grpId = req.params.groupId;
    GroupRepository.getGroupById(grpId)
        .then(group => {
            res.render('pages/group/form', {
                group: group,
                formMode: 'edit',
                pageTitle: req.__('group.form.edit.pageTitle'),
                btnLabel: req.__('group.form.edit.btnLabel'),
                formAction: '/groups/edit',
                navLocation: 'group',
                validationErrors: []
            });
        });}

exports.addGroup = (req, res, next) => {
    const groupData = { ...req.body};
    GroupRepository.createGroup(groupData)
        .then(result => {
            res.redirect('/groups');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('shortcut') && e.type == 'unique violation'){
                    e.message = "Podany skrót jest już używany";
                }
            });
            res.render('pages/group/form', {
                group: groupData,
                pageTitle: req.__('group.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('group.form.add.btnLabel'),
                formAction: '/groups/add',
                navLocation: 'group',
                validationErrors: err.errors
            });
        })
};

exports.updateGroup = (req, res, next) => {
    const grpId = req.body._id;
    const groupData = { ...req.body};
    GroupRepository.updateGroup(grpId, groupData)
        .then(result => {
            res.redirect('/groups');
        })
        .catch(err => {
            GroupRepository.getGroupById(grpId)
                .then(grp => {
                    groupData.studies = grp.studies;
                    err.errors.forEach(e => {
                        if (e.path.includes('shortcut') && e.type == 'unique violation'){
                            e.message = "Podany skrót jest już używany";
                        }
                    });
                    res.render('pages/group/form', {
                        group: groupData,
                        pageTitle: req.__('group.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('group.form.edit.btnLabel'),
                        formAction: '/groups/edit',
                        navLocation: 'group',
                        validationErrors: err.errors
                    });
                })
        })
};

exports.deleteGroup = (req, res, next) => {
    const grpId = req.params.groupId;
    GroupRepository.deleteGroup(grpId)
        .then( () => {
            res.redirect('/groups');
        });
};