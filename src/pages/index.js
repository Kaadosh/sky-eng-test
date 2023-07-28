import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import SearchForm from '../../components/SearchForm'
import UserList from '../../components/UserList'
import UserDetails from '../../components/UserDetails'



export default function Home() {

const [users, setUsers] = useState([]);
const [page, setPage] = useState(1);
const [sortByRepos, setSortByRepos] = useState(null);

const handleSearch = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();
    setUsers(data.items);
  } catch (error) {
    console.error(error);
  }
};

const handleSortChange = (sortOrder) => {
  setSortByRepos(sortOrder);
};

const handlePageChange = async (direction) => {
  try {
    let nextPage = page;

    if (direction === "prev") {
      nextPage = page - 1;
    } else if (direction === "next") {
      nextPage = page + 1;
    }

    if(nextPage >= 1) {
      const response = await fetch(`https://api.github.com/search/users?q=type:user&page=${nextPage}`);
      const data = await response.json();
      setUsers(data.items);
      setPage(nextPage);
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>GitHub User Search</h1>
      <SearchForm onSearch={handleSearch} />
      <UserList users={users} handleSortChange={handleSortChange} handlePageChange={handlePageChange} />
      <div>
        {users.map((user) => {
          <UserDetails key={user.id} user={user} />
        })}
      </div>

    </div>
  )
}
