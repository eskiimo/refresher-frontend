import React from "react";
import UserList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "SAD Eskimo",
      image:
        "https://scontent.fcai1-2.fna.fbcdn.net/v/t1.6435-9/72204059_2587847334625274_8755928279057170432_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_eui2=AeFtA7mpjrDHNQ0SLkNMtWG5kdY_awScuT-R1j9rBJy5P8QflkvJW8GScJYp91UcZkMB2gbLKdOyMtQBHkzjvyuh&_nc_ohc=gDbV39t8P30AX_aXUh5&_nc_ht=scontent.fcai1-2.fna&oh=f96b7faa94e98806924f623570caf8f5&oe=61CAD2FB",
      places: 3,
    },
    {
      id: "u2",
      name: "SAD Qadry",
      image:
        "https://scontent.fcai1-2.fna.fbcdn.net/v/t1.6435-9/117841366_2825476494346875_7632852498606290540_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGraFTTmg5KEPNSF5Kwu2bOg3p5LiV-8uKDenkuJX7y4kUiwCuXov6AwuQG1zpinIDkPmkzdgIomNwUWdGKAOQr&_nc_ohc=hjpJxgjdn8sAX_e7bel&tn=-byC4irF1rsJOh_Q&_nc_ht=scontent.fcai1-2.fna&oh=9cdc319343cf12566e22347ae7c1d3d1&oe=61CC87DC",
      places: 1,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
