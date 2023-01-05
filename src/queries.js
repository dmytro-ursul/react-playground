import { gql } from "@apollo/client";

export const GET_STATE = gql`
  query GetState($token: String!) {
    projects {
      id
      name
      tasks {
        id
        name
        completed
      }
    }
  }
`;


export const SAVE_STATE = gql`
  mutation SaveState($name: String!) {
    save_state(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!) {
    createProject(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
