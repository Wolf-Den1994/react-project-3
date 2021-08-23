import React, { Component } from 'react';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from 'reactstrap/lib/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const dataNotFound = 'Sorry! Data not found :(';

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field] || dataNotFound}</span>
    </li>
  );
};

export { Field };

const ItemDetail = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

// const SelectError = styled.div`
//   color: #fff;
//   text-align: center;
//   font-size: 26px;
// `

export default class ItemDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidCatch() {
    this.setState((state) => {
      return { ...state, error: true };
    });
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) return;

    this.setState((state) => {
      return { ...state, loading: false };
    });

    getData(itemId).then((item) => {
      this.setState((state) => {
        return { ...state, item, loading: true };
      });
    });

    // this.foo.bar = 0; // ERROR
  }

  render() {
    if (!this.state.item && this.state.error) {
      return <ErrorMessage />;
    } else if (!this.state.item) {
      return (
        <span className="select-error">Please select item in the list</span>
      );
    }

    if (!this.state.loading) return <Spinner />;

    const { item } = this.state;
    const { name } = item;

    return (
      <ItemDetail className="rounded">
        <h4>{name || dataNotFound}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </ItemDetail>
    );
  }
}
