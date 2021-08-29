import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

const ListGroupItem = styled.li`
  cursor: pointer;
`;

const ItemList = ({ data, renderItem, onItemSelected }) => {
  const renderItems = (arr) => {
    return arr.map((item) => {
      const { id } = item;
      const labal = renderItem(item);
      return (
        <ListGroupItem
          key={id}
          className="list-group-item"
          onClick={() => onItemSelected(id)}
        >
          {labal}
        </ListGroupItem>
      );
    });
  };
  const items = renderItems(data);
  return (
    <ul style={{ marginBottom: 15 }} className="item-list list-group">
      {items}
    </ul>
  );
};

const withData = (View, getData) => {
  return class extends Component {
    constructor() {
      super();
      this.id = null;
    }

    state = {
      data: null,
      error: false,
    };

    static defaultProps = {
      onItemSelected: () => {},
    };

    static propTypes = {
      onItemSelected: PropTypes.func,
    };

    componentDidCatch() {
      this.setState((state) => {
        return { ...state, error: true };
      });
    }

    componentDidMount() {
      const { getData } = this.props;
      getData().then((data) => {
        this.setState((state) => {
          const newState = data.map((item) => {
            return { ...item, id: this.id++ };
          });
          const result = { ...state, data: newState };
          return result;
        });
      });
    }

    render() {
      const { data, error } = this.state;

      if (error) {
        return <ErrorMessage />;
      }

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData(ItemList);
