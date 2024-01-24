import Wrapper from "../assets/wrappers/Badge";
import BadgeInfo from "./BadgeInfo";
import { Form, Link } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

const Badge = ({ documents, _id }) => {
  return (
    <Wrapper>
      <div>
          <h3 className="heading"> Year {_id} </h3>
      </div>
     
      <hr />
      <div className="content">
        {documents.map((item) => {
          return (
            <div className="badges" key={item._id}>
              <div className="badges-center">
                <BadgeInfo badgePhoto={item.badgePhoto} />
              </div>
              <div className="badges-info">
                <h5>{item.title}</h5>
                <p>{item.department}</p>
                <p>{item.createdAt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Badge;
