import React, { Component } from 'react';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListGroupItem = styled.li`
  cursor: pointer;
`;

export default class ItemList extends Component {
  constructor() {
    super();
    this.id = 41;
  }

  gotService = new GotService();

  state = {
    charList: null,
    error: false,
  };

  componentDidCatch() {
    this.setState((state) => {
      return { ...state, error: true };
    });
  }

  componentDidMount() {
    this.gotService.getAllCharaters().then((charList) => {
      this.setState((state) => {
        const newState = charList.map((item) => {
          return { ...item, id: this.id++ };
        });
        const result = { ...state, charList: newState };
        return result;
      });
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id, name } = item;
      return (
        <ListGroupItem
          key={id}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(id)}
        >
          {name}
        </ListGroupItem>
      );
    });
  }

  render() {
    const { charList, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!charList) {
      return <Spinner />;
    }

    const items = this.renderItems(charList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
