import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const Favorite = () => {
  const [listfavorites, setListFavorites] = useState();

  const getListFavorite = (listfavorites) => {
    setListFavorites(listfavorites);
  };

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px">PplFinderFavorites</Text>
        </S.Header>
        <UserList users={listfavorites} getListFavorite={getListFavorite} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorite;
