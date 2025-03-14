import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../context/auth";
import AppDrawer from "../components/layouts/sidebar";
import PreAppBar from "../components/layouts/appbar";
import { useRouter } from "next/router";
import Modal from "../components/common/modal/modal";


export interface layoutInterface {
  children?: ReactNode | undefined;
  title: string;
  description?: string;
  userId: string;
}

export default function UserLayout(props: layoutInterface) {
  const { title, userId, description } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { islLoggedIn, loaded, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) return;
    if (!islLoggedIn) {
      router.push("/login");
    }
  }, [islLoggedIn, loaded]);

  const toggleLogoutModal = () => {
    setLogoutModal((val) => !val);
  };

  const handleLogout = () => {
    logout(toggleLogoutModal);
  };
  const toggleDrawer = () => {
    setShowDrawer((val) => !val);
  };

  const toggleLogOutModal = () => {
    console.log("heloo")
  };

  return (
    <>
      {islLoggedIn ? (
        <div className="h-screen bg-[#f1f1f1]">

          <div className="md:max-w-[1440px] 2xl:max-w-[2440px]  mx-auto w-full flex ">
            <div className="">
              <AppDrawer onLogout={toggleLogOutModal} display={showDrawer} onToggle={toggleDrawer} />
            </div>
            <div className=" bg-[#f1f1f1] text-gray-900 flex flex-col gap-y-1 w-full   ">
              <PreAppBar userId={userId} onToggle={toggleDrawer} display={false} title={title} description={description} />
              <div className="flex-col  lg:pl-[16rem] 2xl:pl-[22rem]  bg-[#f1f1f1] flex gap-y-1 w-full p-5 md:p-7">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
        <div className="py-5 bg-white">
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="flex flex-row gap-5  ">
            <div className=" text-secondary-default font-medium text-[14px] sm:text-[20px] font-manrope
         border border-secondary-default px-5 py-1 rounded">
              <button className="cursor-pointer" onClick={handleLogout}>Yes</button>
            </div>
            <div className=" text-white font-medium text-[14px] sm:text-[20px] font-manrope
         bg-secondary-default px-3 py-1 rounded">
              <button className="cursor-pointer" onClick={toggleLogoutModal}>No</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
