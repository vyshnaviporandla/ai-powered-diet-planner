import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function Profile({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "Moderate",
    dietaryPreference: "General",
    goal: "Balanced eating",
    allergies: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", user.uid), {
        ...profile,
        email: user.email,
        updatedAt: new Date(),
      });

      setMessage("Profile saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Unable to save profile.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Your Profile</h1>

        <p>Tell us about yourself to create your diet plan.</p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
            required
          />

          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={profile.height}
            onChange={handleChange}
            required
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={profile.weight}
            onChange={handleChange}
            required
          />

          <select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>

          <select
            name="dietaryPreference"
            value={profile.dietaryPreference}
            onChange={handleChange}
          >
            <option>General</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Non-Vegetarian</option>
          </select>

          <select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
          >
            <option>Balanced eating</option>
            <option>Weight-management demo</option>
            <option>Fitness-oriented demo</option>
          </select>

          <input
            name="allergies"
            placeholder="Allergies / preferences (optional)"
            value={profile.allergies}
            onChange={handleChange}
          />

          <button type="submit">Save Profile</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Profile;