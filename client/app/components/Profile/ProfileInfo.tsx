import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";

import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/app/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [
    editProfile,
    { isSuccess: isSuccessEditProfile, error: errorEditProfile },
  ] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || isSuccessEditProfile) {
      setLoadUser(true);
    }
    if (error || errorEditProfile) {
      console.log(error);
    }
    if (isSuccessEditProfile) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, isSuccessEditProfile, errorEditProfile]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({ name });
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar
                ? user.avatar.url || avatar
                : "/assets/avatar.png"
            }
            alt="avatar"
            height={0}
            width={0}
            className="h-[120px] w-[120px] border-[3px] border-[#37a39a] rounded-full cursor-pointer"
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg"
            className="hidden"
          />
          <label htmlFor="avatar">
            <div className="h-[30px] w-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-10" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] block pb-4 m-auto">
            <div className="w-[100%]">
              <label className="block pb-2"> Full Name </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2"> Email Address </label>
              <input
                type="text"
                readOnly
                value={user?.email}
                onChange={(e) => setName(e.target.value)}
                required={true}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <input
              type="submit"
              required={true}
              value="Update"
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center text-black dark:text-white rounded-[3px] mt-8 cursor-pointer`}
              onChange={() => {}}
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
