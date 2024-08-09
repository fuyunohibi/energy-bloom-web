import Image from "next/image";
import Link from "next/link";

interface RightSidebarProps {
  user: User;
}

const RightSidebar = ({ user }: RightSidebarProps) => {

  return (
    <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll">
      <section className="flex flex-col pb-8">
        {/* BACKGROUND IMAGE */}
        <div className="h-[160px] w-full bg-primary bg-cover bg-no-repeat" />
        {/* PROFILE */}
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-12 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
          </div>

          <div className="flex flex-col pt-[4.5rem]">
            <h1 className="text-[24px] font-semibold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-[16px] font-normal text-gray-600">
              {user.email}
            </p>
          </div>
          <div className="pt-3 ml-auto">
            <Link href="/sign-in" className="flex gap-2">
              <Image
                src="/assets/icons/shared/logout-icon.svg"
                width={30}
                height={30}
                alt="logout icon"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between gap-8 px-6 py-8">
        <div className="flex w-full justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900">
            My Furniture
          </h2>
          <Link href="/" className="flex gap-2">
            <Image
              src="/assets/icons/shared/plus-icon.svg"
              width={20}
              height={20}
              alt="plus icon"
            />
            <h2 className="text-[14px] font-semibold text-gray-600 mt-[0.15rem]">
              Add Furniture
            </h2>
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
