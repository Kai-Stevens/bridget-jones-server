const db = require('../database/connect');

class Entry {

  constructor({diary_entry_id, title, content, category, date_time, author_id}) {
    this.diary_entry_id = diary_entry_id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.date_time = date_time;
    this.author_id = author_id;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM diary_entry");
    return response.rows.map(de => new Entry(de));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM diary_entry WHERE diary_entry_id = $1", [id]);
    
    if (response.rows.length != 1) {
      throw new Error("Unable to locate entry.");
    } 
    return new Entry(response.rows[0]);
  }

  static async create(data) {
    const {title, content, category, author_id} = data;
    let response = await db.query("INSERT INTO diary_entry (title, content, category, author_id) VALUES ($1, $2, $3, $4) RETURNING diary_entry_id",
      [title, content, category, author_id]);
    const newId = response.rows[0].diary_entry_id;
    const newEntry = await Entry.getOneById(newId);
    return newEntry;
  }

}

module.exports = Entry;
