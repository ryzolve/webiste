// import { FC } from 'react';
// import { Banner4 } from '../banner';
// import ListColumn from 'components/reuseable/ListColumn';
// // -------- custom hook -------- //
// import useLightBox from 'hooks/useLightBox';
// // -------- data -------- //
// import { aboutList1 } from 'data/about';
// import NextLink from 'components/reuseable/links/NextLink';
// import { slideInDownAnimate } from 'utils/animation';

// const About14: FC = () => {
//   // used for video light box
//   useLightBox();

//   return (
//     <div className='row gy-10 gy-sm-13 gx-3 align-items-center'>
//       <div className='col-lg-7 offset-lg-1'>
//         <h2 className='fs-15 text-uppercase text-muted mb-3'>Who Are We?</h2>
//         <h3 className='display-4 mb-6'>
//           Ryzolve helps healthcare providers reduce wasted time with their
//           filing & paperwork so they can improve efficiency and stay compliant.
//         </h3>

//         <p className='mb-6'>
//           We understand how frustrating paperwork, files, and hiring can be with
//           certain processes. Our personal agency struggled with manual processes
//           for years so much that we were losing money. From wasting time hiring,
//           to losing money on denials, we built the Ryzolve software out of this
//           frustration. We believe that your agency shouldn’t have to lose money
//           or suffer from denials and audits.
//         </p>
//         <NextLink
//           title='Book a Demo'
//           href='#'
//           className='btn btn-lg btn-primary rounded-pill me-2'
//         />
//         <div className='pt-4'>
//           <ListColumn rowClass='gx-xl-8' list={aboutList1} />
//         </div>
//       </div>

//       <div className='col-md-8 col-lg-6 position-relative'>
//         <figure className='rounded shadow-lg'>
//           <img
//             src='/img/photos/about7.jpg'
//             srcSet='/img/photos/about7@2x.jpg 2x'
//             alt=''
//           />
//         </figure>
//       </div>
//     </div>
//   );
// };

// export default About14;

import { FC } from "react";
import AccordionList from "components/common/AccordionList";
import { slideInDownAnimate } from "utils/animation";
import NextLink from "components/reuseable/links/NextLink";
import { list } from "data/demo-11";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

type About14Props = {
  title: string;
  description1: string;
  description2?: string;
  list?: string[];
  image: string;
};

const About14: FC<About14Props> = ({
  image,
  title,
  description1,
  description2,
  list,
}) => {
  return (
    <div className="row align-items-center">
      <div className="col-lg-6 order-lg-2 pb-4 pb-lg-0">
        <figure
          style={{
            maxHeight: "45vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "end",
            // height: "30%",
            alignItems: "center",
          }}
          className="rounded"
        >
          <Image
            height={300}
            width={500}
            alt="our solutions"
            src={image}
            // srcSet='/img/illustrations/i8@2x.png 2x'
          />
        </figure>
      </div>

      <div className="col-lg-6">
        <h3 className="display-4 mb-7 mt-lg-10 custom-description-text">
          {title}
        </h3>
        <div className="mb-10">
          <p className="custom-card-description-text">{description1}</p>
        </div>
        {/* <span style={slideInDownAnimate("1200ms")}>
          <NextLink
            title="Book a Demo"
            href="/calendly"
            className="btn btn-lg btn-primary rounded-pill me-2 mb-8"
          />
        </span> */}
        <List title={description2} color="orange" description={list} />
        <span style={slideInDownAnimate("1200ms")}>
          <NextLink
            title="Book a Demo"
            href="/calendly"
            className="btn btn-lg btn-secondary rounded-pill"
          />
        </span>
      </div>
    </div>
  );
};

type ListProps = {
  color: "fuchsia" | "violet" | "green" | "orange";
  title: any;
  description?: string[];
};

const List = ({ color, title, description }: ListProps) => {
  return (
    <div className="col-lg-12">
      <h2 className="mb-3">{title}</h2>
      <ul
        className={`icon-list bullet-bg bullet-soft-${color} custom-card-description-text`}
      >
        {description?.map((el) => (
          <li className="custom-card-description-text">
            <FontAwesomeIcon
              icon={faCircleCheck}
              color="#0D5992"
              style={{
                height: 18,
                marginRight: 10,
              }}
            />
            <span> {el}</span>
            {/* </div> */}
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

export default About14;
