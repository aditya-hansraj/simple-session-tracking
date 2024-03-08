const User = require('../models/user');

const homepage = (req, res) => {
    res.render('index', {title: 'Home', name: ''});
}

const dashboard = (req, res) => {
    res.render('dashboard', {title: 'Dashboard'});
}

const loginpage = (req, res) => {
    res.status(200).render('login', {title: 'Login'});
}

const signuppage = (req, res) => {
    res.status(200).render('signup', {title: 'signup'});
}

const signup_post = async (req, res) => {
    const {username, password} = req.body;

    let user = await User.findOne({username});

    if(user){
        res.redirect('/signup');
    }else{
        user = new User({
        username, password
        })
        user.save();
        res.status(200).render('index', {title: 'Home', name: username});
    }
}

const login_post = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user)
        res.redirect('/login');
    else{
        if(password == user.password){
            req.session.isAuth = true;
            res.render('index', {title: 'Home', name: username});
        }
        else
        res.redirect('/login');
    }
}

const logout_post = (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
        else res.redirect('/')
    });
}

module.exports = {
    homepage,
    dashboard,
    loginpage,
    signuppage,
    login_post,
    signup_post,
    logout_post
};