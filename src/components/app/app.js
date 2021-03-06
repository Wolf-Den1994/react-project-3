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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BooksItem from '../../pages/BooksItem';
import './app.css';
import NotFound from '../../pages/NotFound';

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
      <Router>
        <div className="app">
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
            <Switch>
              <Route
                path="/"
                exact
                component={() => (
                  <h1 style={{ color: '#fff' }}>Welcome to GOT DB</h1>
                )}
              />
              <Route path="/character" exact component={CharacterPage} />
              <Route path="/houses" exact component={HousesPage} />
              <Route path="/books" exact component={BooksPage} />
              <Route
                path="/books/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <BooksItem bookId={id} />;
                }}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
