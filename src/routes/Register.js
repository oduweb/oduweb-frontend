import React from "react";
import { Container, Header, Input, Button, Message } from "semantic-ui-react";
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
      variables: { firstname, lastname, username, password, email }
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
        <Input
          name="firstname"
          onChange={this.onChange}
          value={firstname}
          placeholder="firstname"
          fluid
        ></Input>
        <br />
        <Input
          name="lastname"
          onChange={this.onChange}
          value={lastname}
          placeholder="lastname"
          fluid
        ></Input>
        <br />
        <Input
          error={!!userNameError}
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="username"
          fluid
        ></Input>
        <br />
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="password"
          fluid
        ></Input>
        <br />
        <Input
          error={!!emailError}
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="email"
          fluid
        ></Input>
        <br />
        <Button onClick={this.onSubmit}>Submit</Button>
        {userNameError || emailError || passwordError ? (
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
