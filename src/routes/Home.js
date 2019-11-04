import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const Home = ({ data: { allPosts = [] } }) =>
  allPosts.map(u => (
    <h1 key={u.Id}>
      ID: {u.Id} Title: {u.title} Yazar Adı ve Soyadı: {u.users.firstName}{" "}
      {u.users.lastName}
    </h1>
  ));

const AllPostsQuery = gql`
  {
    allPosts {
      Id
      title
      users {
        firstName
        lastName
      }
    }
  }
`;

export default graphql(AllPostsQuery)(Home);
