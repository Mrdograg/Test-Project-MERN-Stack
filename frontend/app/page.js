"use client";

import { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const limit = 5;

  const fetchUsers = async () => {
    const offset = (currentPage - 1) * limit;
    const queryParams = new URLSearchParams({ limit, offset, search, filter });

    try {
      const response = await fetch(`http://localhost:5000?${queryParams}`);
      const data = await response.json();
      setUsers(data.rows);
      setTotalPages(Math.ceil(data.count / limit));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, filter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-center mb-6 hover:text-gray-800 hover:cursor-pointer">User Management</h1>
      <SearchFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <UserTable users={users} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default HomePage;
