import HeaderBox from "@/src/components/shared/box/header-box";
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
    const monthFormatted = new Date(bill.created_at).toLocaleString('en-US', { month: 'long' });

    return {
      month_year: `${monthFormatted} ${bill.year}`,
      price: bill.price,
      usage: bill.usage,
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
          <HeaderBox
            title="Your billing information"
            subtext={getCurrentMonthYear()}
            iconUrl="/assets/icons/shared/calendar-icon.svg"
          />
        </header>
        <HoverEffectBilling items={formatedBillings} />
      </div>
    </section>
  );
};

export default BillingPage;
