import React from "react";
import UserList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Eskimo kiss",
      image:
        "https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/248294863_4592754124134575_3319527941529472690_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tWFyq7st460AX-05VwB&_nc_ht=scontent.fcai1-2.fna&oh=ab4b800f1fbf67f24cfa7ce3670c5024&oe=6199B870",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
