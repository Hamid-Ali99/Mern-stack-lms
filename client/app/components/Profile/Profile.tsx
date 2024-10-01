import React, { useState } from "react";

import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/app/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const Profile: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logoutHandler = async () => {
    setLogout(true);
    await signOut(); // it will automatically redirect user to "/" because we already added logic in useProtected hook
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#ffffffb4] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
    </div>
  );
};

export default Profile;
