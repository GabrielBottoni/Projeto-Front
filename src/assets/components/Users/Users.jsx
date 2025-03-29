import React, {useState, useEffect} from "react";
import { fetchUsers } from "../../services/apiService";


const Users = () => {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, [])

    if (loading) return <p>Carregando</p>;
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <div className="card" key={user.id}>{user.email}</div>
                ))}
            </ul>
        </div>
    )

}

export default Users;