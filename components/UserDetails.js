import { useEffect, useState } from "react"

const UserDetails = ({ user }) => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${user.login}/repos`);
                const data = await response.json();
                setRepos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRepos();
    }, [user.login])

    return (
        <>
        <h3>{user.login}</h3>
        <p>Username: {user.login}</p>
        <p>Number of Repositories: {user.public_repos}</p>
        {repos.length > 0 ? (
            <>
            <h4>Public repositories:</h4>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
            </>
        ) : (
            <p>No public repositories found.</p>
        )
        }
        </>
    );
};

export default UserDetails;