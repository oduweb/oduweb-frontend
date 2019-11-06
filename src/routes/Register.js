import React from "react";
import {
  Form,
  Container,
  Header,
  Input,
  Button,
  Message,
  FormField
} from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Register extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    userNameError: "",
    password: "",
    passwordError: "",
    email: "",
    emailError: ""
  };

  onSubmit = async () => {
    this.setState({
      userNameError: "",
      emailError: "",
      passwordError: ""
    });

    const { firstname, lastname, username, password, email } = this.state;
    const response = await this.props.mutate({
      variables: {
        firstname,
        lastname,
        username,
        password,
        email
      }
    });

    const { ok, errors } = response.data.registerUser;

    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        // err['passwordError'] = 'too long..';
        err[`${path}Error`] = message;
      });
      console.log(err);
      this.setState(err);
    }

    console.log(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      firstname,
      lastname,
      username,
      password,
      email,
      userNameError,
      passwordError,
      emailError
    } = this.state;

    const errorList = [];

    if (userNameError) {
      errorList.push(userNameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container>
        <Header as="h2">Register</Header>
        <Form>
          <FormField>
            <Input
              name="firstname"
              onChange={this.onChange}
              value={firstname}
              placeholder="firstname"
              fluid
            />
          </FormField>
          <FormField>
            <Input
              name="lastname"
              onChange={this.onChange}
              value={lastname}
              placeholder="lastname"
              fluid
            />
          </FormField>
          <FormField error={!!userNameError}>
            <Input
              name="username"
              onChange={this.onChange}
              value={username}
              placeholder="username"
              fluid
            />
          </FormField>
          <FormField error={!!passwordError}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="password"
              fluid
            />
          </FormField>
          <FormField error={!!emailError}>
            <Input
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="email"
              fluid
            />
          </FormField>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    registerUser(
      firstName: $firstname
      lastName: $lastname
      userName: $username
      password: $password
      email: $email
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
