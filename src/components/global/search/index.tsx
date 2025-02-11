import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/useSearch";
import { User } from "lucide-react";
import React from "react";
import Loader from "../loader";
import { useMutationData } from "@/hooks/useMutationData";
import { inviteMembers } from "@/actions/user";

type Props = {
  workspaceId: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Search = ({ workspaceId }: Props) => {
  const {
    query,
    onSearchQuery,
    isFetching,
    users = [],
  } = useSearch("get-users", "USERS");
  // console.log("onUsers:", users);

  const { mutate, isPending } = useMutationData(
    ["invite-member"],
    (data: { recieverId: string; email: string }) =>
      inviteMembers(workspaceId, data.recieverId, data.email)
  );

  return (
    <div className="flex flex-col gap-y-5">
      <Input
        onChange={onSearchQuery}
        value={query}
        className="bg-transparent border-2 outline-none"
        placeholder="search for your use..."
        type="text"
      />
      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : !users ? (
        <p className="text-center text-sm text-[#a4a4a4]">No Users Found</p>
      ) : (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
            >
              <Avatar>
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex-col  items-start">
                <h3 className="text-bold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="uppercase text-xs bg-white px-1 w-1/4 text-center rounded-lg text-[#1e1e1e]">
                  {user.subscription?.plan}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <Button
                  onClick={() =>
                    mutate({ recieverId: user.id, email: user.email })
                  }
                  variant={"default"}
                  className="w-5/12 font-bold"
                >
                  <Loader state={isPending} color="#000">
                    Invite
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

{
  /* {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl"
          >
            <Avatar>
              <AvatarImage src={user.image || ""} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <h3 className="text-bold text-lg capitalize">
                {user.firstname || "Unknown"} {user.lastname || ""}
              </h3>
              <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
                {user.subscription?.plan || "FREE"}
              </p>
            </div>
            <div className="flex-1 flex justify-end items-center">
              <Button
                onClick={() =>
                  mutate({ recieverId: user.id, email: user.email })
                }
                variant={"default"}
                className="w-5/12 font-bold"
              >
                <Loader state={isPending} color="#000">
                  Invite
                </Loader>
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm text-[#a4a4a4]">No Users Found</p>
      )} */
}
