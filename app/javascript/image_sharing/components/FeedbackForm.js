import React from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class FeedbackForm extends React.Component {
  render() {
    return (
      <Container >
        <Row className="justify-content-md-center">
          <Col xs="6">
            <Form>
              <FormGroup>
                <Label>Your name:</Label>
                <Input name="name" type="text" />
              </FormGroup>

              <FormGroup>
                <Label>Comments:</Label>
                <Input name="comments" type="textarea" />
              </FormGroup>
              <Button color="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FeedbackForm;
