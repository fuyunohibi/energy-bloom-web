import RightSidebar from "@/src/components/navigations/right-sidebar";
import HeaderBox from "@/src/components/shared/box/header-box";
import { HoverEffect } from "@/src/components/shared/cards/card-hover-effect";
import { getLoggedInUser, getUserInfo } from "@/src/libs/actions/user.actions";


export const devices = [
  {
    title: "Smart Light",
    count: 3,
  },
  {
    title: "Smart Plug",
    count: 2,
  },
  {
    title: "Smart TV",
    count: 1,
  },
];


const HomePage = async () => {
  const user = await getLoggedInUser();
  const loggedIn = await getUserInfo({ user_id: user.id });

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
            subtext="Let's take a lovely tour of your smart home."
          />
        </header>
        <HoverEffect items={devices} />
      </div>
      <RightSidebar user={loggedIn} />
    </section>
  );
};

export default HomePage;

