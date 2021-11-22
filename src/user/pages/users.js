import React from "react";
import UserList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "SAD Eskimo",
      image:
        "https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/248294863_4592754124134575_3319527941529472690_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tWFyq7st460AX-05VwB&_nc_ht=scontent.fcai1-2.fna&oh=ab4b800f1fbf67f24cfa7ce3670c5024&oe=6199B870",
      places: 3,
    },
    {
      id: "u2",
      name: "SAD Qadry",
      image:
        "https://scontent.fcai1-2.fna.fbcdn.net/v/t39.30808-6/230617962_3104153066479215_290210563030465952_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEOCreFLEF-8fFvXa5Y6B7JCMUYLbSYBoYIxRgttJgGhkMuqMBk60OyW6kO74pMHsYmw6sEs9uAwYzGp5tlOJvH&_nc_ohc=fEffvGEiiKEAX_4E02_&_nc_ht=scontent.fcai1-2.fna&oh=a3525af37b630ab17c10cba40bf67aaa&oe=61A10DD3",
      places: 1,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
