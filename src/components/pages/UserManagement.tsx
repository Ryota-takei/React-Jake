import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";

import { UserCard } from "../organisum/user/UserCard";
import { UseAllUsers } from "../../hooks/useAllUsers";
import { UserDeatailModal } from "../organisum/user/UserDeatailModal";
import { UseSelectUsers } from "../../hooks/UseSelectUsers";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loading, users } = UseAllUsers();
  const { onSlectUser, selectedUser } = UseSelectUsers();
  const { loginUser } = useLoginUser();

  useEffect(() => {
    getUsers();
  }, []);

  const onClickUser = useCallback(
    (id: number) => {
      onSlectUser({ id, users, onOpen });
    },
    [users, onSlectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center height="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} style={{ margin: "0 auto" }}>
              <UserCard
                id={user.id}
                userName={user.username}
                fullName={user.name}
                imageUrl="https://source.unsplash.com/random"
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDeatailModal
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
        isAdmin={loginUser?.isAdmin}
      />
    </>
  );
});
