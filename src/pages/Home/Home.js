import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [checkboxvalues, setCheckValues] = useState({
    BR: false,
    AU: false,
    CA: false,
    DE: false,
    TR: false,
  });
  const { users, isLoading } = usePeopleFetch(checkboxvalues);

  const changeCountry = (value, isChecked) => {
    setCheckValues({ ...checkboxvalues, [value]: !isChecked });
    console.log("home after filter:", checkboxvalues[value]);
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          changeCountry={changeCountry}
          checkboxvalues={checkboxvalues}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
