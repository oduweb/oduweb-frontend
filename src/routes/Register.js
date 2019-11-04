import React from "react";
import { Container, Header, Input, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Register extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state
    });

    console.log(response);
  };

  render() {
    const { firstname, lastname, username, password, email } = this.state;

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
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="username"
          fluid
        ></Input>
        <br />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="password"
          fluid
        ></Input>
        <br />
        <Input
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="email"
          fluid
        ></Input>
        <br />
        <Button onClick={this.onSubmit}>Submit</Button>
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
    )
  }
`;

export default graphql(registerMutation)(Register);
