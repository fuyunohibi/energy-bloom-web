import RightSidebar from "@/src/components/navigations/right-sidebar";
import HeaderBox from "@/src/components/shared/box/header-box";
import { HoverEffect } from "@/src/components/shared/cards/card-hover-effect";


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


const HomePage = () => {
  const loggedIn = {
    $id: "1",
    userId: "1",
    email: "john.d@gmail.com",
    firstName: "John",
    lastName: "Doe",
    username: "JohnDoe",
    avatar: "https://randomuser.me/api/portraits",
    houseNumber: "123/456",
  };

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
            user={loggedIn?.username || "Guest"}
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

