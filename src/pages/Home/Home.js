import React, { useCallback, useRef, useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();
  const [pageNumber, setPageNumber] = useState(1);
  const controller = useRef();

  useEffect(() => {
    if (pageNumber > 1) fetchUsers(pageNumber * 25);
  }, [pageNumber]);

  const lastUserRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (controller.current) controller.current.disconnect();
      controller.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((previous) => previous + 1);
        }
      });
      if (node) controller.current.observe(node);
    },
    [isLoading]
  );

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} lastUserRef={lastUserRef} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
