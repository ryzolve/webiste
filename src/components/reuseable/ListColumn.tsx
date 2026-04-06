import { FC } from "react";
// import { faCircleCheck } from "assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// ===========================================================
type ListColumnProps = {
  list: { item: string }[][];

  rowClass?: string;
  bulletColor?: string;
};
// ===========================================================

const ListColumn: FC<ListColumnProps> = ({
  list,
  rowClass = "",
  bulletColor = "primary",
}) => {
  return (
    <div className={"gy-3 " + rowClass}>
      {list.map((value, i) => (
        <div key={i}>
          <ul className={`icon-list bullet-bg bullet-soft-${bulletColor} mb-0`}>
            {value.map((item, i) => {
              const liProps = i !== 0 ? { className: "mt-3" } : {};
              return (
                <li
                  key={item.item}
                  {...liProps}
                  className="custom-card-description-text"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="#0D5992"
                    style={{
                      height: 18,
                      marginRight: 20,
                    }}
                  />
                  <span> {item.item}</span>
                  {/* </div> */}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListColumn;
