import React, { Component } from 'react';
import GotService from '../services/gotService';
import ItemList from '../components/itemList/itemList';
import ErrorMessage from '../components/errorMessage/errorMessage';
import { withRouter } from 'react-router-dom';

class BooksPage extends Component {
  gotService = new GotService();

  state = {
    error: false,
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

    return (
      <ItemList
        getData={this.gotService.getAllBooks}
        onItemSelected={(itemId) => {
          this.props.history.push(`${itemId + 1}`);
        }}
        renderItem={({ name }) => name}
      />
    );
  }
}

export default withRouter(BooksPage);
