const UserDetails = ({ users }) => {
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username}) - {user.email} - {user.phone}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserDetails;
