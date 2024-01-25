import Wrapper from "../assets/wrappers/BadgeInfo";

const ProfileLogo = ({ logoPhoto  }) => {

  return (
    <Wrapper>
      <img src={`/provider/${logoPhoto}`} alt="badge photo" className="badge-photo"/>
    </Wrapper>
  );
};

export default ProfileLogo;
