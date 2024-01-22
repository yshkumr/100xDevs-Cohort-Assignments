import "../components/Profile.css";

const Profile = ({ data }) => {
  const { name, age, city, imageUrl, info } = data;
  return (
    <div className="profile">
      <div className="profile-pic">
        <img src={imageUrl} alt="" />
        <p className="name">
          {name} <span>{age}</span>
        </p>
        <p className="city">{city}</p>
      </div>
      <div className="divider"></div>
      <div className="footer">
        <div>
          <h3>{info.followers}</h3>
          <p>Followers</p>
        </div>
        <div>
          <h3>{info.likes}</h3>
          <p>Likes</p>
        </div>
        <div>
          <h3>{info.photos}</h3>
          <p>Photos</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
