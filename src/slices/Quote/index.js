import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";

const Quote = ({ slice }) => {
  return (
    <Bounded as="section">
      {prismic.isFilled.richText(slice.primary.quote) && (
        <div className="font-sans text-3xl border-s-4 ps-4 sm:ps-6 dark:border-gray-700 leading-relaxed">
          &ldquo;
          <PrismicText field={slice.primary.quote} />
          &rdquo;
          {prismic.isFilled.keyText(slice.primary.source) && (
            <> &mdash; {slice.primary.source}</>
          )}
        </div>
      )}
    </Bounded>
  );
};

export default Quote;
