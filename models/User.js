const db = require('../database/connect');

class User {

  constructor({username, user_password, user_id}) {
    this.username = username;
    this.user_password = user_password;
    this.user_id = user_id;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM user_account");
    return response.rows.map(u => new User(u));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
    
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    } 
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
}

  static async create(data) {
    const {username, user_password} = data;
    let response = await db.query("INSERT INTO user_account (username, user_password) VALUES ($1, $2) RETURNING user_id",
      [username, user_password]);
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
