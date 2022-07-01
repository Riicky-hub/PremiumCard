const Account = require('../models/AccountModel');

exports.loginIndex = (req, res) => {
    res.render('login');
}

exports.registerIndex = (req, res) => {
    res.render('register');
}

exports.accountIndex = (req, res) => {
    res.render('account');
}

exports.accountConfigIndex = (req, res) => {
    res.render('accountConfig');
}
exports.register = async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.register();

        if(account.errors.length > 0) {
            req.flash('errors', account.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Conta criada, login agora está disponivel!');
        req.session.save(() => {
            return res.redirect('/login');
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}
exports.login = async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.login();

        if(account.errors.length > 0) {
            req.flash('errors', account.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.session.user = account.user;
        req.session.save(() => {
            return res.redirect(`/account/${account.user._id}`);
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}
exports.temp = (req, res) => {
    req.flash('errors', 'Função indisponivel por motivos de segurança, em breve será implementado essa função');
    req.session.save(() => {
        res.redirect('back');
        return;
    });
}
// exports.accountConfigEdit = async (req, res) => {
//     try {
//         if(!req.params.id) return res.render('404');
//         const account = new Account(req.body);
//         await account.edit(req.params.id);

//         if(account.errors.length > 0) {
//             req.flash('errors', account.errors);
//             req.session.save(() => {
//                 res.redirect('back');
//                 return
//             })
//             return
//         }
//         req.flash('success', 'Sua conta foi editada com sucesso!');
//         req.session.save(() => {
//             res.redirect('back');
//         });
//         return;
//     } catch(e) {
//         console.error(e);
//     }
// }
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}