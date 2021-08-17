import React, { Component } from 'react';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from 'reactstrap/lib/Spinner';
import ErrorMessage from '../errorMessage';

const dataNotFound = 'Sorry! Data not found :(';

const CharDetail = styled.div`
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

export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    char: null,
    loading: true,
    error: false,
  };

  componentDidCatch() {
    this.setState((state) => {
      return { ...state, error: true };
    });
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar() {
    const { charId } = this.props;
    if (!charId) return;

    this.setState((state) => {
      return { ...state, loading: false };
    });

    this.gotService.getCharater(charId).then((char) => {
      this.setState((state) => {
        return { ...state, char, loading: true };
      });
    });

    // this.foo.bar = 0; // ERROR
  }

  render() {
    if (!this.state.char && this.state.error) {
      return <ErrorMessage />;
    } else if (!this.state.char) {
      return <span className="select-error">Please select a character</span>;
    }

    if (!this.state.loading) return <Spinner />;

    const { name, gender, born, died, culture } = this.state.char;

    return (
      <CharDetail className="rounded">
        <h4>{name || dataNotFound}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender || dataNotFound}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born || dataNotFound}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died || dataNotFound}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture || dataNotFound}</span>
          </li>
        </ul>
      </CharDetail>
    );
  }
}
