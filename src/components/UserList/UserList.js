import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { SetItem as SetLS, GetItem as GetLS } from "shared/localStorage-theassistant";

const UserList = ({ users, isLoading, getListFavorite, lastPersonRef }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [usersToShow, setUsersToShow] = useState(users);
  const [listfavorites, setListFavorites] = useState([]);
  const [listfilters, setListFilters] = useState([]);

  useEffect(() => {
    if (users && users.length)
      if (listfilters.length) {
        console.log("filters:", listfilters);
        let arraylistFilter = [];
        users.map((user) => {
          if (listfilters.includes(user.nat)) arraylistFilter.push(user);
        });
        setUsersToShow(arraylistFilter);
      } else {
        setUsersToShow(users);
      }
  }, [users, listfilters]);

  useEffect(() => {
    let arraylistFavorite = GetLS("listfavoriteUsers");
    setListFavorites(arraylistFavorite);
  }, []);

  useEffect(() => {
    if (listfavorites) {
      SetLS("listfavoriteUsers", listfavorites);
      if (getListFavorite) {
        getListFavorite(listfavorites);
        setUsersToShow(listfavorites);
      }
    }
  }, [listfavorites, getListFavorite]);

  const handleFilterList = (userFilter) => {
    listfilters.includes(userFilter)
      ? setListFilters(
          listfilters.filter((userFiltervalue) => userFiltervalue !== userFilter)
        )
      : setListFilters([...listfilters, userFilter]);
  };

  const handleFavoriteList = (user) => {
    listfavorites.includes(user)
      ? setListFavorites(listfavorites.filter((favorite) => favorite !== user))
      : setListFavorites([...listfavorites, user]);
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleFilterList} />

        <CheckBox value="AU" label="Australia" onChange={handleFilterList} />

        <CheckBox value="CA" label="Canada" onChange={handleFilterList} />

        <CheckBox value="DE" label="Germany" onChange={handleFilterList} />

        <CheckBox value="TR" label="Turkey" onChange={handleFilterList} />
      </S.Filters>
      <S.List>
        {usersToShow && usersToShow.length ? (
          usersToShow.map((user, index) => {
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                ref={index === usersToShow.length - 1 ? lastPersonRef : null}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper
                  isVisible={index === hoveredUserId || listfavorites.includes(user)}
                >
                  <IconButton onClick={() => handleFavoriteList(user)}>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })
        ) : getListFavorite && !listfilters.length ? (
          <div>
            <span>{"To add a favorite click on the icon heart in the page Home"}</span>
            <FavoriteIcon style={{ marginBottom: "-5px" }} color="error" />
          </div>
        ) : (
          !isLoading && <span>No person </span>
        )}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
