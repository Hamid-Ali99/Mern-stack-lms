"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Protected from "@/hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";

type Props = {};
const ProfilePage: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  const { user } = useSelector((state: any) => state.auth);

  return (
    <Protected>
      <Heading
        title={`${user.name} profile`}
        description="LMS is a platform for students to learn and get help from teachers"
        keywords="Programming, Mern, Redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Profile user={user} />
    </Protected>
  );
};

export default ProfilePage;
