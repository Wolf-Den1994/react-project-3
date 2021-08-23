import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ListGroupItem = styled.li`
  cursor: pointer;
`;

export default class ItemList extends Component {
  constructor() {
    super();
    this.id = null;
  }

  state = {
    itemList: null,
    error: false,
  };

  componentDidCatch() {
    this.setState((state) => {
      return { ...state, error: true };
    });
  }

  componentDidMount() {
    const { getData } = this.props;

    getData().then((itemList) => {
      this.setState((state) => {
        const newState = itemList.map((item) => {
          return { ...item, id: this.id++ };
        });
        const result = { ...state, itemList: newState };
        return result;
      });
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const labal = this.props.renderItem(item);
      return (
        <ListGroupItem
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {labal}
        </ListGroupItem>
      );
    });
  }

  render() {
    const { itemList, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
