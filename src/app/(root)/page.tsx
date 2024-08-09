import RightSidebar from "@/src/components/navigations/right-sidebar";
import HeaderBox from "@/src/components/shared/box/header-box";
import { HoverEffect } from "@/src/components/shared/cards/card-hover-effect";
import { getDevices } from "@/src/libs/actions/device.actions";
import { getLoggedInUser, getUserInfo } from "@/src/libs/actions/user.actions";


const HomePage = async () => {
  const user = await getLoggedInUser();
  const loggedIn = await getUserInfo({ user_id: user.id });
  const devices = await getDevices({ user_id: user.id });

  console.log("LOGGED IN USER:", loggedIn);
  console.log("USER'S DEVICES:", devices);

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div
        className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 py-7 
        sm:px-8 
        lg:py-12 
        xl:max-h-screen xl:overflow-y-scroll"
      >
        <header>
          <HeaderBox
            type="greeting"
            title="Welcome Home"
            user={loggedIn?.first_name || "Guest"}
            subtext={`${loggedIn.address1}, ${loggedIn.city}, ${loggedIn.postal_code}`}
          />
        </header>
        <HoverEffect items={devices} />
      </div>
      <RightSidebar 
        user={loggedIn}
        devices={devices}
       />
    </section>
  );
};

export default HomePage;

