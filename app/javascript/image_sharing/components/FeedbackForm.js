import { Alert, Button, Container, Form, FormFeedback, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import React from 'react';
import * as api from '../utils/helper';

class FeedbackForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      comments: '',
      successMessage: '',
      failureMessage: '',
      nameErrorMessage: '',
      commentsErrorMessage: ''
    };
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleChangeComments = (event) => {
    this.setState({
      comments: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const feedback = {
      name: this.state.name,
      comments: this.state.comments
    };

    return api.post('http://localhost:3000/api/feedbacks', feedback)
      .then(response => this.setState({
        name: '',
        comments: '',
        successMessage: response.message,
        nameErrorMessage: '',
        commentsErrorMessage: '',
        failureMessage: ''
      }))
      .catch((error) => {
        this.setState({
          successMessage: '',
          nameErrorMessage: '',
          commentsErrorMessage: '',
          failureMessage: ''
        });
        if (error.data) {
          if (error.data.name) {
            this.setState({ nameErrorMessage: error.data.name });
          }
          if (error.data.comments) {
            this.setState({ commentsErrorMessage: error.data.comments });
          }
        } else {
          this.setState({ failureMessage: error.message });
        }
      });
  }
  render() {
    return (
      <Container >
        <Alert color="success" isOpen={Boolean(this.state.successMessage)}>
          {this.state.successMessage}
        </Alert>
        <Alert color="danger" isOpen={Boolean(this.state.failureMessage)}>
          {this.state.failureMessage}
        </Alert>
        <Row className="justify-content-md-center">
          <Col xs="6">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>Your name:</Label>
                <Input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                  invalid={Boolean(this.state.nameErrorMessage)}
                />
                <FormFeedback>{this.state.nameErrorMessage}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label>Comments:</Label>
                <Input
                  name="comments"
                  type="textarea"
                  value={this.state.comments}
                  onChange={this.handleChangeComments}
                  invalid={Boolean(this.state.commentsErrorMessage)}
                />
                <FormFeedback>{this.state.commentsErrorMessage}</FormFeedback>
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
