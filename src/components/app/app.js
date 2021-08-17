import React, { useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import Button from '../button/Button';

const App = () => {
  const [randomChar, setRandomChar] = useState(true);
  const toggleRandomCharacter = () => setRandomChar((state) => !state);
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Container>
        <Row>
          <Col lg={{ size: 5, offset: 0 }}>
            {randomChar ? <RandomChar /> : null}
            <Button onClick={toggleRandomCharacter}>
              Toggle random character
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <ItemList />
          </Col>
          <Col md="6">
            <CharDetails />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
