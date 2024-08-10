import RightSidebar from "@/src/components/navigations/right-sidebar";
import HeaderBoxBilling from "@/src/components/shared/box/header-box-billing";
import { HoverEffectBilling } from "@/src/components/shared/cards/card-billing";
import { getBillings } from "@/src/libs/actions/billing.actions";
import { getLoggedInUser, getUserInfo } from "@/src/libs/actions/user.actions";

const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();
  return `${month} ${year}`;
};

export const BillingPage = async () => {
  const user = await getLoggedInUser();
  let loggedIn = null;
  let billings: Billing[] = [];

  if (user) {
    loggedIn = await getUserInfo({ user_id: user.id });
    billings = await getBillings({ user_id: user.id });
  }

  let formatedBillings = billings.map((bill) => {
    return {
      month_year: `${bill.month} ${bill.year}`,
      price: bill.price,
      tax: bill.tax,
      total: bill.total,
    };
  });

  console.log("LOGGED IN USER:", loggedIn);
  console.log("USER'S FORMATED BILLING:", formatedBillings);

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div
        className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 py-7 
        sm:px-8 
        lg:py-12 
        xl:max-h-screen xl:overflow-y-scroll"
      >
        <header>
          <HeaderBoxBilling
            title="Your billing information"
            subtext={getCurrentMonthYear()}
          />
        </header>
        <HoverEffectBilling items={formatedBillings} />
      </div>
    </section>
  );
};

export default BillingPage;
