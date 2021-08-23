import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import Button from '../button/Button';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../../pages/CharacterPage';
import HousesPage from '../../pages/HousesPage';
import GotService from '../../services/gotService';
import BooksPage from '../../pages/BooksPage';

export default class App extends Component {
  gotService = new GotService();

  state = {
    randomChar: true,
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  toggleRandomCharacter = () =>
    this.setState((state) => {
      return { randomChar: !state.randomChar };
    });

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {this.state.randomChar ? <RandomChar /> : null}
              <Button onClick={this.toggleRandomCharacter}>
                Toggle random character
              </Button>
            </Col>
          </Row>
          <CharacterPage />
          <BooksPage />
          <HousesPage />
        </Container>
      </>
    );
  }
}
