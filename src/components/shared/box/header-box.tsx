interface HeaderBoxProps {
  type?: "greeting" | "title";
  title: string;
  user?: string;
  subtext: string;
}

const HeaderBox = ({ type, title, user, subtext }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[32px] lg:text-[30px] font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className="text-black">,&nbsp;{user}</span>
        )}
      </h1>
      <p className="text-[14px] lg:text-[16px] font-normal text-gray-600">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
