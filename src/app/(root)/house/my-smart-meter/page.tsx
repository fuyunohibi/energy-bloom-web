import HeaderBox from "@/src/components/shared/box/header-box";
import DoughnutChart from "@/src/components/shared/charts/doughnut-chart";
import dayjs from "dayjs";

const MySmartMeterPage = async () => {
  const currentDateTime = dayjs().format("MMMM D, YYYY h:mm A");

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll ">
      <div
        className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 py-7  bg-white rounded-3xl m-4
        sm:px-8 
        lg:py-12 
        xl:max-h-screen xl:overflow-y-scroll"
      >
        <header>
          <HeaderBox title={`${currentDateTime}`} />
        </header>
        <div className="relative flex flex-row justify-center items-end h-72">
          <DoughnutChart />
          <div className="flex justify-center items-center">
            <p className="text-[20px] lg:text-[64px] font-normal text-gray-600">
              $60
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-[20px] lg:text-[32px] font-normal text-gray-600">
            Used so far today: 53.34 kWh
          </p>
        </div>
      </div>
    </section>
  );
};

export default MySmartMeterPage;
