import "./settings.css";

export default function Users() {
  const users = [
    { name: "John Doe", email: "john@gmail.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@gmail.com", role: "Manager" },
    { name: "Alex", email: "alex@gmail.com", role: "Employee" },
  ];

  return (
    <div className="settings-container">
      <h2 className="settings-title">Users</h2>

      <table className="settings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}