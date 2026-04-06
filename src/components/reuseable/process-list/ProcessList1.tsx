import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

// ==============================================================
type ProcessList1Props = {
  no: number;
  name: string;
  description: string;
  shadow?: boolean;
  index: number;
  className: HTMLAttributes<HTMLDivElement>["className"];
};
// ==============================================================

const ProcessList1: FC<ProcessList1Props> = (props) => {
  const { no, name, description, className, shadow, index } = props;

  const processIcons = ["Bs1CircleFill", "Bs2CircleFill", "Bs3CircleFill"];

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1450) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className={`card ${className} ${shadow && "shadow-lg"}`}>
      <div className="card-body px-4 py-4 px-md-6 py-md-4">
        <div className="d-flex flex-row">
          <div className="px-4">
            {/* <span className="icon btn btn-circle btn-lg btn-soft-primary pe-none me-4">
              <span className="number">{no}</span>
            </span> */}
            {isDesktop ? (
              <div>
                {index === 0 && <Bs1CircleFill color="#0D5992" size={50} />}
                {index === 1 && <Bs2CircleFill color="#0D5992" size={50} />}
                {index === 2 && <Bs3CircleFill color="#0D5992" size={50} />}
              </div>
            ) : null}
          </div>

          <div>
            <h4 className="mb-1 custom-card-text">{name}</h4>
            <p className="mb-0 custom-card-description-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessList1;
