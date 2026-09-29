import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function DietPlan({ user }) {
  const [profile, setProfile] = useState(null);
  const [dietaryPreference, setDietaryPreference] = useState("General");
  const [plan, setPlan] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileDoc = await getDoc(doc(db, "users", user.uid));

        if (profileDoc.exists()) {
          const data = profileDoc.data();
          setProfile(data);
          setDietaryPreference(data.dietaryPreference || "General");
        } else {
          setMessage("Profile not found.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const generatePlan = async () => {
    if (!profile) return;

    setMessage("Generating diet plan...");
    setPlan(null);

    try {
      const response = await fetch(
          "https://ai-powered-diet-planner-5pne.onrender.com/api/generate-plan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dietaryPreference: dietaryPreference,
              goal: profile.goal,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Backend API request failed");
        }

      const generatedPlan = await response.json();
      const planData = generatedPlan.plan;

      const newPlan = {
        dietaryPreference: dietaryPreference,
        goal: profile.goal,
        breakfast: planData.breakfast,
        lunch: planData.lunch,
        snack: planData.snack,
        dinner: planData.dinner,
        hydration: planData.hydration,
        nutritionSummary: planData.nutritionSummary,
      };

      await setDoc(doc(db, "diet_plans", `${user.uid}_${Date.now()}`), {
        userId: user.uid,
        ...newPlan,
        createdAt: new Date()
        });

      setPlan(newPlan);
      setMessage(
        "Diet plan generated through the Python API and saved successfully!"
      );
    } catch (error) {
      console.error("Diet plan generation error:", error);
      setMessage(
        "Unable to generate diet plan. Make sure the Python backend is running."
      );
    }
  };

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div className="diet-page">
      <div className="diet-card">
        <h1>🥗 Your Diet Plan</h1>

        {profile && (
          <>
            <p>
              Your current goal:{" "}
              <strong>{profile.goal}</strong>
            </p>

            <label>
              <strong>Choose Dietary Preference:</strong>
            </label>

            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
            >
              <option value="General">General / Non-Vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>

            <p>
              Selected preference:{" "}
              <strong>{dietaryPreference}</strong>
            </p>
          </>
        )}

        <button onClick={generatePlan}>
          Generate Diet Plan
        </button>

        {message && <p className="message">{message}</p>}

        {plan && (
          <div className="plan-result">
            <div>
              <h2>🌅 Breakfast</h2>
              <p>{plan.breakfast}</p>
            </div>

            <div>
              <h2>☀️ Lunch</h2>
              <p>{plan.lunch}</p>
            </div>

            <div>
              <h2>🍎 Snack</h2>
              <p>{plan.snack}</p>
            </div>

            <div>
              <h2>🌙 Dinner</h2>
              <p>{plan.dinner}</p>
            </div>

            <div>
              <h2>💧 Hydration</h2>
              <p>{plan.hydration}</p>
            </div>

            <div>
              <h2>📋 Nutrition Summary</h2>
              <p>{plan.nutritionSummary}</p>
            </div>
          </div>
        )}

        <p className="disclaimer">
          This plan is for educational and general wellness purposes only,
          not medical advice.
        </p>
      </div>
    </div>
  );
}

export default DietPlan;