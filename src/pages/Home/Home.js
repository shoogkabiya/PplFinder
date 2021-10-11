import React, { useCallback, useRef, useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();
  const [screenNumber, setScreenNumber] = useState(1);
  const controller = useRef();

  useEffect(() => {
    if (screenNumber > 1) fetchUsers(screenNumber * 25);
  }, [screenNumber]);

  const lastPersonRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (controller.current) {
        controller.current.disconnect();
        console.log(" controller.current.disconnect():", controller.current.disconnect());
        controller.current = new IntersectionObserver((values) => {
          console.log("values:", values);
          if (values[0].isIntersecting) {
            setScreenNumber((previous) => previous + 1);
          }
        });
        if (node) controller.current.observe(node);
      }
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
        <InfiniteScroll
          dataLength={users.length}
          next={fetchUsers}
          hasMore={true}
          loader={<h1>loading..</h1>}
        >
          <UserList users={users} isLoading={isLoading} lastPersonRef={lastPersonRef} />
        </InfiniteScroll>
      </S.Content>
    </S.Home>
  );
};
export default Home;
