import { Component, FC, Fragment } from "react";
// -------- icons -------- //
import Bulb from "icons/solid-mono/Bulb";
import Compare from "icons/solid-mono/Compare";
import DeliveryBox from "icons/solid-mono/DeliveryBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// -------- custom component -------- //
import NextLink from "components/reuseable/links/NextLink";
import Image from "next/image";

type OurStrategyProps = {
  title: string;
  stepsData: {
    id: string;
    title: string;
    strategy_step_list: { id: string; item: string }[];
  }[];
};

const Services22: FC<OurStrategyProps> = ({ title, stepsData }) => {
  const assetsArray = [
    {
      color: "orange",
      image: "/img/photos/digital-management.svg",
      checkColor: "#FF774C",
    },
    {
      color: "violet",
      image: "/img/photos/compliance-regulation.svg",
      checkColor: "#a07cc5",
    },
    {
      color: "green",
      image: "/img/photos/claims-billing.svg",
      checkColor: "#45c4a0",
    },
  ];
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mx-auto text-center">
          <h2 className="fs-16 text-uppercase mb-3 text-primary ">
            Our Strategy
          </h2>
          <h3 className="display-3 mb-10 px-xl-10 px-xxl-15 custom-description-text">
            {title}
            {/* <span className='underline-3 style-2 yellow'>reasons</span> */}
          </h3>
        </div>
      </div>

      {/* Ladder Component */}
      <div>
        {stepsData?.map((step, index) => {
          return (
            <div
              className={`row gx-lg-8 gx-xl-12 gy-10 align-items-center justify-content-center ${
                index % 2 === 0 && "flex-row-reverse"
              }`}
              key={step.id}
            >
              <div className="col-md-6">
                <figure className="rounded">
                  <Image
                    width={600}
                    height={400}
                    src={assetsArray[index].image}
                    alt="digital-management.svg"
                    className="w-100"
                  />
                </figure>
              </div>

              <List
                title={step.title}
                color={assetsArray[index].color}
                checkColor={assetsArray[index].checkColor}
                // description={[
                //   "Run PAS Position Background Checks For You",
                //   "Reduces Paperwork",
                //   "Minimizes Errors",
                //   "Saves Time",
                // ]}
                description={step.strategy_step_list}
              />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

type ListProps = {
  color: string;
  title: string;
  checkColor: string;
  description?: { id: string; item: string }[];
};
const List = ({ color, title, description, checkColor }: ListProps) => {
  return (
    <div className="col-lg-6 px-md-20 p-lg-8 pb-8">
      <h2 className="mb-3 custom-description-text ml-20 ml-md-20 px-4">
        {title === "Digital document management" ? (
          <Bulb className={`icon-svg-sm solid-mono text-${color} me-4`} />
        ) : title === "Compliance regulation" ? (
          <Compare className={`icon-svg-sm solid-mono text-${color} me-4`} />
        ) : title === "Claims & Billing" ? (
          <DeliveryBox
            className={`icon-svg-sm solid-mono text-${color} me-4`}
          />
        ) : null}
        {title}
      </h2>
      <ul className={`icon-list bullet-bg bullet-soft-${color}`}>
        {description?.map((el) => (
          <li key={el.id} className="custom-card-description-text">
            {/* <i className="uil uil-check" /> */}
            {/* <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }} */}
            {/* > */}
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={checkColor}
              style={{
                height: 18,
                marginRight: 20,
              }}
            />
            <span> {el.item}</span>
            {/* </div> */}
            {/* {el.item} */}
          </li>
        ))}
      </ul>

      {/* <NextLink
        title='Learn More'
        href='#'
        className={`btn btn-${color} mt-2`}
      /> */}
    </div>
  );
};

export default Services22;
