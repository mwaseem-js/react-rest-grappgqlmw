import React from 'react';
import { useQuery } from '@apollo/client';
import UserDetails from './UserDetails';
import { GET_USERS } from './utilities/query';

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <UserDetails users={data.users}/>  
    </div>
  );
};


export default Users;