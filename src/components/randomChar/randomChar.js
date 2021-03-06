import React, { Component } from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

const dataNotFound = 'Sorry! Data not found :(';

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
  img {
    width: 100%;
  }
`;

const Term = styled.span`
  font-weight: bold;
`;

export default class RandomChar extends Component {
  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
    this.timeId = setInterval(this.updateChar, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25); // 25 - 140
    // const id = 1223333333333333
    this.gotService
      .getCharater(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <RandomBlock className="rounded">
        {errorMessage}
        {spinner}
        {content}
      </RandomBlock>
    );
  }
}

RandomChar.defaultProps = {
  interval: 5000,
};

RandomChar.propTypes = {
  // interval: (props, propName, componentName) => {
  //   const value = props[propName];

  //   if (typeof value === 'number' && !isNaN(value)) {
  //     return null;
  //   }
  //   return new TypeError(`${componentName}: ${propName} must be a number`)
  // },
  interval: PropTypes.number
};

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name || dataNotFound}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender</Term>
          <span>{gender || dataNotFound}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born</Term>
          <span>{born || dataNotFound}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died</Term>
          <span>{died || dataNotFound}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture</Term>
          <span>{culture || dataNotFound}</span>
        </li>
      </ul>
    </>
  );
};
