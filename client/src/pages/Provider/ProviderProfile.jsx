import Wrapper from "../../assets/wrappers/ProviderProfileWrapper";
import companylogo from "../../assets/images/companylogo.jpeg";
import BadgeInfo from "../../components/BadgeInfo";

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const ProviderProfile = () => {

  return (
    
    <Wrapper>
      <header>
        <div className="main-icon">{"Khalda".charAt(0)}</div>
        <div className="info">
          <h5>Khalda Petroluem Company</h5>
          <p>OGS</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <BadgeInfo badgePhoto={companylogo} />
        </div>
        <div className="">
          <div className="section">
            <p>
              CEO: <span>John Doe</span>
            </p>
            <p>
              Contact Person: Jane Smith <span> Manaaging Director</span>{" "}
            </p>
            <ul className="nav-link">
              <FaFacebookF /> <FaTwitter /> <FaLinkedinIn />
            </ul>


            <p>Bio of the company and its activities Lorem ipsum dolor sit amet
             consectetur adipisicing elit. Maiores adipisci iusto enim dolorum
             perferendis assumenda reprehenderit qui, praesentium fugit laborum
            aperiam laudantium quasi molestias culpa doloremque voluptates ullam
            animi nemo? Aspernatur, harum atque. Officiis eaque quia
             accusantium, libero esse laboriosam praesentium eligendi fugit
            quaerat. Libero cupiditate minima sapiente ullam magni.. ...</p>

            <div className="contactUs">
              <ul className="">
                <li>Tele : <span>0245713534</span></li>
                <li>Email : <span>ahmed@gmail.com</span></li>
                <li>Address : <span>Cairo - Egypt 5th settlment</span></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProviderProfile;
