import React, { Component } from 'react';
import GotService from '../services/gotService';
import ItemList from '../components/itemList/itemList';
import ItemDetails, { Field } from '../components/itemDetails/itemDetails';
import ErrorMessage from '../components/errorMessage/errorMessage';
import RowBlock from '../components/rowBlock/RowBlock';

export default class BooksPage extends Component {
  gotService = new GotService();

  state = {
    selectedHouses: Math.floor(Math.random() * 5 + 2),
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({ selectedHouses: id });
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
        getData={this.gotService.getAllHouses}
        // onItemSelected={this.onItemSelected}
        onItemSelected={this.onItemSelected}
        renderItem={({ name }) => name}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedHouses + 1}
        getData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="ancestralWeapons" label="Ancestral Weapons" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
