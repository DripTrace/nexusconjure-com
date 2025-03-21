import ContentComponent from '@/components/merchandise/ContentComponent';

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function TermsPage() {
  return (
    <ContentComponent title="Profile" description={`${title} - ${subtitle}`}>
      <div className="max-w-2xl mx-auto prose prose-blue">
        <h2>What&apos;s your return policy?</h2>
        <p>
          We don&apos;t offer returns and exchanges, but if there&apos;s
          something wrong with your order, please let us know by contacting us
          at [insert your support email here]!
        </p>

        <h2>Do you offer refunds?</h2>
        <p>
          Refunds are only offered to customers that receive the wrong items or
          damaged items. If any of these apply, please contact us at [insert
          your support email here] with photos of wrong/damaged items and
          we&apos;ll sort that out for you.
        </p>

        <h2>Can I exchange an item for a different size/color?</h2>
        <p>
          At this time, we don&apos;t offer exchanges. If you&apos;re unsure
          which size would fit better, check out our sizing charts—we have one
          for every item listed on our store, in the product description
          section. Though rare, it&apos;s possible that an item you ordered was
          mislabelled. If that&apos;s the case, please let us know at [insert
          your support email here] within a week after receiving your order.
          Include your order number and photos of the mislabeled item, and
          we&apos;ll send you a new one, or issue a refund!
        </p>
      </div>
    </ContentComponent>
  );
}
