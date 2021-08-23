import React, { Component } from 'react';
import GotService from '../services/gotService';
import ItemList from '../components/itemList/itemList';
import ItemDetails, { Field } from '../components/itemDetails/itemDetails';
import ErrorMessage from '../components/errorMessage/errorMessage';
import RowBlock from '../components/rowBlock/RowBlock';

export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedChar: Math.floor(Math.random() * 140 + 25),
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({ selectedChar: id });
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
        getData={this.gotService.getAllCharaters}
        onItemSelected={this.onItemSelected}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedChar + 41}
        getData={this.gotService.getCharater}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
