import { gql } from 'graphql-request';

export const GET_PROJECTS = gql`
  query {
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

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!) {
    createProject(input: { projectInput: { name: $name } }) {
      project {
        id
        name
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: ID!) {
    projectRemove(input: { id: $id }) {
      project {
        id
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $projectId: ID!) {
    taskCreate(input: { taskInput: { name: $name, projectId: $projectId } }) {
      task {
        id
        name
        completed
      }
    }
  }
`;
