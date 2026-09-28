import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function DailyTracker({ user }) {
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false,
  });

  const [water, setWater] = useState(0);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadTracker = async () => {
      try {
        const trackerDoc = await getDoc(
          doc(db, "daily_trackers", `${user.uid}_${today}`)
        );

        if (trackerDoc.exists()) {
          const data = trackerDoc.data();

          setMeals(data.meals || {
            breakfast: false,
            lunch: false,
            snack: false,
            dinner: false,
          });

          setWater(data.water || 0);
        }
      } catch (error) {
        console.error("Tracker loading error:", error);
      }
    };

    loadTracker();
  }, [user, today]);

  const handleMealChange = (meal) => {
    setMeals((previous) => ({
      ...previous,
      [meal]: !previous[meal],
    }));
  };

  const saveTracker = async () => {
    try {
      await setDoc(
        doc(db, "daily_trackers", `${user.uid}_${today}`),
        {
          userId: user.uid,
          date: today,
          meals,
          water,
          updatedAt: new Date(),
        }
      );

      setMessage("Daily tracker saved successfully!");
    } catch (error) {
      console.error("Tracker saving error:", error);
      setMessage("Unable to save tracker.");
    }
  };

  return (
    <div className="tracker-page">
      <div className="tracker-card">
        <h1>📅 Daily Tracker</h1>

        <p>
          Track your daily meals and hydration.
        </p>

        <div className="tracker-section">
          <h2>🍽️ Meals</h2>

          <label>
            <input
              type="checkbox"
              checked={meals.breakfast}
              onChange={() => handleMealChange("breakfast")}
            />
            🌅 Breakfast
          </label>

          <label>
            <input
              type="checkbox"
              checked={meals.lunch}
              onChange={() => handleMealChange("lunch")}
            />
            ☀️ Lunch
          </label>

          <label>
            <input
              type="checkbox"
              checked={meals.snack}
              onChange={() => handleMealChange("snack")}
            />
            🍎 Snack
          </label>

          <label>
            <input
              type="checkbox"
              checked={meals.dinner}
              onChange={() => handleMealChange("dinner")}
            />
            🌙 Dinner
          </label>
        </div>

        <div className="tracker-section">
          <h2>💧 Hydration</h2>

          <label>
            Water servings:
            <input
              type="number"
              min="0"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
            />
          </label>
        </div>

        <button onClick={saveTracker}>
          💾 Save Today's Progress
        </button>

        {message && <p className="message">{message}</p>}

        <p className="disclaimer">
          This tracker is for educational and general wellness purposes only.
        </p>
      </div>
    </div>
  );
}

export default DailyTracker;