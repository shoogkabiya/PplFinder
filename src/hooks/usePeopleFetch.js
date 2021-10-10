import React, { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("fetch with checkboxvalues:", checkboxvalues);

  // let filternat = "";

  // for (const [key, value] of Object.entries(checkboxvalues)) {
  //   if (value === true) {
  //     filternat = filternat + key;
  //     console.log("filternat,", filternat);
  //   }
  // }

  // if (filternat) {
  //   filternat = "nat=" + filternat;
  //   filternat = filternat.slice(0);
  // }

  // console.log("filternat:", filternat);
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
