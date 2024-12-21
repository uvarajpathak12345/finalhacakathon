"use strict";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../components/useOutsideClick";
import HealthTips from "../components/HealthTips";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <div className="flex justify-center mb-14">
        <HealthTips></HealthTips>
      </div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}`}>
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layout
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}`}>
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Healthy Tips",
    title: "Eat a Balanced Diet",
    src: "../../images/diet.jpg",
    content: () => (
      <p>
        A well-rounded diet is crucial for overall health. Aim to eat a variety
        of whole, unprocessed foods that provide essential nutrients. Include
        plenty of fruits and vegetables (rich in vitamins, minerals, and fiber),
        lean proteins (such as fish, poultry, beans, and tofu), whole grains
        (like brown rice, quinoa, and oats), and healthy fats (found in foods
        like avocados, nuts, seeds, and olive oil). Reducing processed foods,
        sugary snacks, and excess salt can help lower the risk of chronic
        conditions such as heart disease, diabetes, and obesity.
      </p>
    ),
  },
  {
    description: "Healthy Tips",
    title: "Stay Physically Active",
    src: "../../images/exercise.webp",
    content: () => (
      <p>
        Description: Regular exercise is one of the most effective ways to stay
        healthy. Physical activity strengthens the heart, muscles, and bones,
        improves flexibility, and helps regulate body weight. Aim for at least
        30 minutes of moderate exercise (such as brisk walking, cycling, or
        swimming) most days of the week. You can also include strength training
        exercises a few times a week to build muscle mass and improve metabolic
        health.
      </p>
    ),
  },
  {
    description: "Health Tips",
    title: "Get Enough Sleep",
    src: "../../images/sleep.jpg",
    content: () => (
      <p>
        Sleep is essential for physical and mental restoration. Adults generally
        need 7-9 hours of quality sleep each night. During sleep, the body
        repairs itself, consolidates memories, and strengthens the immune
        system. Poor sleep habits, such as insufficient sleep or irregular sleep
        schedules, can lead to increased stress, weakened immunity, poor
        cognitive function, and a higher risk of conditions like heart disease
        and obesity.
      </p>
    ),
  },
  {
    description: "Health Tips",
    title: "Stay Hydrated",
    src: "../../images/water.webp",
    content: () => (
      <p>
        Proper hydration is essential for nearly every bodily function,
        including digestion, circulation, temperature regulation, and joint
        lubrication. Aim to drink water throughout the day to stay properly
        hydrated, with the general recommendation being 8 cups (64 ounces) of
        water daily, though individual needs can vary based on activity levels,
        climate, and body size. Water supports skin health, helps with
        detoxification by flushing out waste, and aids in the absorption of
        nutrients. 
      </p>
    ),
  },
  {
    description: "Health Tips",
    title: "Manage Stress",
    src: "../../images/stress.avif",
    content: () => (
      <p>
        Chronic stress can negatively impact both physical and mental health. It
        can lead to increased risk of heart disease, digestive problems, and
        mental health disorders like anxiety and depression. Managing stress
        effectively is vital for overall well-being. Techniques such as
        mindfulness meditation, deep breathing exercises, yoga, journaling, or
        spending time outdoors can help lower stress levels.
      </p>
    ),
  },
  // Add other cards similarly
];
