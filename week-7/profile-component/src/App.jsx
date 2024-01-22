import "./App.css";
import Profile from "./components/Profile";
import profilepic from "../src/assets/5856.jpg";

function App() {
  const profiles = [
    {
      name: "Mystic Mac",
      age: 20,
      city: "London",
      imageUrl: { profilepic },
      info: {
        followers: "80K",
        likes: "803K",
        photos: "1.4K",
      },
    },
    {
      name: "Mystic Mac",
      age: 20,
      city: "London",
      imageUrl: { profilepic },
      info: {
        followers: "80K",
        likes: "803K",
        photos: "1.4K",
      },
    },

    {
      name: "Mystic Mac",
      age: 20,
      city: "London",
      imageUrl: { profilepic },
      info: {
        followers: "80K",
        likes: "803K",
        photos: "1.4K",
      },
    },
    {
      name: "Mystic Mac",
      age: 20,
      city: "London",
      imageUrl: { profilepic },
      info: {
        followers: "80K",
        likes: "803K",
        photos: "1.4K",
      },
    },
    {
      name: "Mystic Mac",
      age: 20,
      city: "London",
      imageUrl: { profilepic },
      info: {
        followers: "80K",
        likes: "803K",
        photos: "1.4K",
      },
    },
  ];

  return (
    <div className="profile-cards">
      {profiles.map((profile, index) => (
        <Profile key={index} data={profile} />
      ))}
    </div>
  );
}

export default App;
