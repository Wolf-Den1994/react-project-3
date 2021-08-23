// API - https://anapioficeandfire.com/

export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharaters = async () => {
    const res = await this.getResourse('/characters?page=5&pageSize=10');
    return res.map(this._transformCharacter);
  };

  getCharater = async (id) => {
    const charater = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(charater);
  };

  getAllBooks = async () => {
    return await this.getResourse('/books/');
  };

  getBook = async (id) => {
    return await this.getResourse(`/books/${id}/`);
  };

  getAllHouses = async () => {
    return await this.getResourse('/houses/');
  };

  getHouse = async (id) => {
    return await this.getResourse(`/houses/${id}/`);
  };

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }
}
