import React, { Component } from 'react';
import GotService from '../services/gotService';
import ItemList from '../components/itemList/itemList';
import ItemDetails, { Field } from '../components/itemDetails/itemDetails';
import ErrorMessage from '../components/errorMessage/errorMessage';
import RowBlock from '../components/rowBlock/RowBlock';

export default class BooksPage extends Component {
  gotService = new GotService();

  state = {
    selectedBook: Math.floor(Math.random() * 5 + 2),
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({ selectedBook: id });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        getData={this.gotService.getAllBooks}
        onItemSelected={this.onItemSelected}
        renderItem={({ name }) => name}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedBook + 1}
        getData={this.gotService.getBook}
      >
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
