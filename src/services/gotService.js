// API - https://anapioficeandfire.com/

export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResourse(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharaters() {
    return this.getResourse('/characters?page=5&pageSize=10');
  }

  getCharater(id) {
    return this.getResourse(`/characters/${id}`);
  }

  getAllBooks() {
    return this.getResourse('/books?page=1&pageSize=10');
  }

  getBook(id) {
    return this.getResourse(`/books/${id}`);
  }

  getAllHouses() {
    return this.getResourse('/houses');
  }

  getHouse(id) {
    return this.getResourse(`/houses/${id}`);
  }
}
