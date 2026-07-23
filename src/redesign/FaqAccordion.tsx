import { useState } from 'react';

type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  items: FaqItem[];
  idPrefix: string;
  listClassName: string;
  itemClassName: string;
  buttonClassName: string;
  answerClassName: string;
  iconClassName?: string;
};

export function FaqAccordion({
  items,
  idPrefix,
  listClassName,
  itemClassName,
  buttonClassName,
  answerClassName,
  iconClassName,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={listClassName}>
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const buttonId = `${idPrefix}-question-${index + 1}`;
        const panelId = `${idPrefix}-answer-${index + 1}`;

        return (
          <div className={itemClassName} key={item.q}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={buttonClassName}
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                type="button"
              >
                <span>{item.q}</span>
                <span className={iconClassName} aria-hidden="true">{isOpen ? '×' : '+'}</span>
              </button>
            </h3>
            <div aria-labelledby={buttonId} id={panelId} role="region" hidden={!isOpen}>
              <p className={answerClassName}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
