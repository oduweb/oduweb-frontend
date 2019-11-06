import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import {
  Message,
  Form,
  Button,
  Input,
  Container,
  FormField,
  Header
} from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Createpost extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      userId: "",
      title: "",
      content: "",
      errors: {}
    });
  }

  onSubmit = async () => {
    /* eslint-disable-next-line */
    const { userId, title, content } = this;

    const response = await this.props.mutate({
      /* eslint-disable-next-line */
      variables: { userId: parseInt(this.userId), title, content }
    });

    console.log(response);

    const { ok, errors } = response.data.createPost;

    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      userId,
      title,
      content,
      errors: { userIdError, titleError, contentError }
    } = this;

    const errorList = [];

    if (userIdError) {
      errorList.push(userIdError);
    }

    if (titleError) {
      errorList.push(titleError);
    }

    if (contentError) {
      errorList.push(contentError);
    }

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        <Form>
          <FormField error={!!userIdError}>
            <Input
              name="userId"
              onChange={this.onChange}
              value={userId}
              placeholder="userId"
              fluid
            />
          </FormField>
          <FormField error={!!titleError}>
            <Input
              name="title"
              onChange={this.onChange}
              value={title}
              placeholder="title"
              fluid
            />
          </FormField>
          <FormField error={!!contentError}>
            <Input
              name="content"
              onChange={this.onChange}
              value={content}
              placeholder="content"
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

const createPostMutation = gql`
  mutation($userId: Int!, $title: String!, $content: String!) {
    createPost(userId: $userId, title: $title, content: $content) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createPostMutation)(observer(Createpost));
