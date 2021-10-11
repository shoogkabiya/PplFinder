import React, { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(results = 25) {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=${results}&page=1`
    );
    setIsLoading(false);
    console.log("response:", response);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
