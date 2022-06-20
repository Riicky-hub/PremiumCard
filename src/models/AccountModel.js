const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const AccountSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const AccountModel = mongoose.model('user', AccountSchema);

class Account {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valid();
    if(this.errors.length > 0) return;
    await this.userExits();
    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    try {
      this.user = await AccountModel.create(this.body);
    } catch(e) {
      console.log(e);
    }
  }
  valid() {
    this.cleanUp();
    const regName = /^[a-zA-Z]*$/;
    if (!regName.test(this.body.user)) {
      this.errors.push('Por favor coloque um nome válido');
    }
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido');
    }
    if (this.body.password.length < 4 || this.body.password.length >= 25) {
      this.errors.push('Sua senha precisa ter mais que 3 e menor que 25 caracteres');
    }
    if (this.body.password !== this.body.confirm) {
      this.errors.push('Por favor confirme a mesma senha');
    }
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      user: this.body.user__register,
      email: this.body.email__register,
      password: this.body.password__register,
      confirm: this.body.confirm__register
    }
  }
  async userExits() {
    const user = await AccountModel.findOne({ email: this.body.email });
    if(user) this.errors.push('Usuário já existe!');
  }
}

module.exports = Account;