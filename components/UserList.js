import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";


const UserList = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [sortByRepos, setSortByRepos] = useState("asc");
    const [usersWithRepos, setUsersWithRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsersWithRepos = async () => {
            const userReposRequests = users.map(async (user) => {
                const response = await fetch(`https://api.github.com/users/${user.login}`);
                const userData = await response.json();
                return {...user, public_repos: userData.public_repos };
            });

            const usersWithRepos = await Promise.all(userReposRequests);
            setUsersWithRepos(usersWithRepos);
        };

        fetchUsersWithRepos();
    }, [users]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleSortChange = (evt) => {
        setSortByRepos(evt.target.value);
    };

    const handlePageChange = (type) => {
        if(type === "prev") {
            setCurrentPage((prevPage) => prevPage - 1);
        } else if (type === "next") {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersWithRepos.slice().sort((a, b) => {
        if (sortByRepos === "asc") {
            return a.public_repos - b.public_repos;
        } else if (sortByRepos === "desc") {
            return b.public_repos - a.public_repos;
        } else {
            return 0;
        }
    }).slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="container container__user">
            <select onChange={handleSortChange} value={sortByRepos}>
                <option value="asc">Sort by repos Asc</option>
                <option value="desc">Sort by repos Desc</option>
            </select>
            <ul>
                {currentUsers.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user)}>
                        {user.login}
                    </li>
                ))}
            </ul>
            <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>&lt; Prev</button>
            <button onClick={() => handlePageChange("next")} disabled={indexOfLastUser >= usersWithRepos.length}> Next &gt;</button>
            {selectedUser && <UserDetails user={selectedUser} />}
        </div>
    );
};

export default UserList;