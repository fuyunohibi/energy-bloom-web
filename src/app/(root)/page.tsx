import HeaderBox from "../../components/shared/box/header-box";

const HomePage = () => {
  const loggedIn = { username: "JohnDoe" };
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
            title="Welcome"
            user={loggedIn?.username || "Guest"}
            subtext="Let's get started with your smart meter."
          />
        </header>
      </div>
    </section>
  );
};

export default HomePage;

// import prisma from "@/lib/db";
// import { register } from "@/actions/actions";
// import Image from "next/image";

// export default async function Home() {

//   const users = await prisma.user.findMany();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           SmartMeter
//         </p>
//         <p className="fixed right-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           {users.length} users
//         </p>
//       </div>

//       <div className="flex flex-col items-center justify-center w-full h-full">
//         <form action={register} className="flex flex-col items-center justify-center w-full h-full">
//           <input type="text" name="name" placeholder="Name" className="w-96 h-12 p-4 m-4 border border-gray-300 rounded-xl dark:border-neutral-800" />
//           <input type="text" name="houseNum" placeholder="House Number" className="w-96 h-12 p-4 m-4 border border-gray-300 rounded-xl dark:border-neutral-800" />
//           <input type="email" name="email" placeholder="Email" className="w-96 h-12 p-4 m-4 border border-gray-300 rounded-xl dark:border-neutral-800" />
//           <input type="password" name="password" placeholder="Password" className="w-96 h-12 p-4 m-4 border border-gray-300 rounded-xl dark:border-neutral-800" />
//           <button
//             type="submit"
//             className="w-96 h-12 p-4 m-4 bg-zinc-500 text-white rounded-xl hover:bg-zinc-600 dark:bg-zinc-700 dark:hover::bg-zinc-800"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }
