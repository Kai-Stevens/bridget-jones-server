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

  static async getAll(author_id) {
    const response = await db.query("SELECT * FROM diary_entry WHERE author_id = $1 ORDER BY date_time DESC", [author_id]);
    return response.rows.map(de => new Entry(de));
  }

  static async getOneById(id, author_id) {
    const response = await db.query("SELECT * FROM diary_entry WHERE diary_entry_id = $1 AND author_id = $2", [id, author_id]);
    
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
    const newEntry = await Entry.getOneById(newId, author_id);
    return newEntry;
  }

  async update(data) {
 
    let {title, content, category} = data;

    if (!title) {
      title = this.title;
    }

    if (!content) {
      content = this.content;
    }

    if (!category) {
      category = this.category;
    }
    
    // update the record
    const response = await db.query("UPDATE diary_entry SET title = $1, content = $2, category = $3 WHERE author_id = $4 AND diary_entry_id = $5 RETURNING *", [title, content, category, this.author_id, this.diary_entry_id]);
    // const updatedEntry = await Entry.getOneById(this.diary_entry_id, this.author_id);
    
    // if (response.rows[0].length != 1) {
    //   throw new Error("Unable to update entry.");
    // }

    return new Entry(response.rows[0]);
  }

  async destroy() {
    const response = await db.query("DELETE FROM diary_entry WHERE diary_entry_id = $1 AND author_id = $2 RETURNING *;", [this.diary_entry_id, this.author_id]);
    
    // if (response.rows[0].length != 1) {
    //   throw new Error("Unable to delete entry.");
    // }

    return new Entry(response.rows[0]);
  }

}

module.exports = Entry;
