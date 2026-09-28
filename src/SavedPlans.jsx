import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function SavedPlans({ user }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plansQuery = query(
          collection(db, "diet_plans"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(plansQuery);

        const savedPlans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlans(savedPlans);
      } catch (error) {
        console.error("Saved plans error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [user]);

  const downloadPlan = (plan, number) => {
    const planText = `
AI DIET PLANNER
==============================

Diet Plan #${number}

BREAKFAST
${plan.breakfast}

LUNCH
${plan.lunch}

SNACK
${plan.snack}

DINNER
${plan.dinner}

HYDRATION
${plan.hydration}

NUTRITION SUMMARY
${plan.nutritionSummary}

==============================

This plan is for educational and general wellness purposes only.
It is not medical advice.
`;

    const blob = new Blob([planText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `diet-plan-${number}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <h2>Loading saved plans...</h2>;
  }

  return (
    <div className="saved-plans-page">
      <div className="saved-plans-container">
        <h1>📋 Saved Diet Plans</h1>

        <p>
          View and download your previously generated diet plans.
        </p>

        {plans.length === 0 ? (
          <div className="empty-plans">
            <h2>No saved plans yet</h2>

            <p>
              Generate your first diet plan to see it here.
            </p>
          </div>
        ) : (
          <div className="saved-plans-list">

            {plans.map((plan, index) => {
              const planNumber = plans.length - index;

              return (
                <div
                  className="saved-plan-card"
                  key={plan.id}
                >
                  <h2>
                    Diet Plan #{planNumber}
                  </h2>

                  <div className="saved-plan-grid">

                    <div>
                      <h3>🌅 Breakfast</h3>
                      <p>{plan.breakfast}</p>
                    </div>

                    <div>
                      <h3>☀️ Lunch</h3>
                      <p>{plan.lunch}</p>
                    </div>

                    <div>
                      <h3>🍎 Snack</h3>
                      <p>{plan.snack}</p>
                    </div>

                    <div>
                      <h3>🌙 Dinner</h3>
                      <p>{plan.dinner}</p>
                    </div>

                    <div>
                      <h3>💧 Hydration</h3>
                      <p>{plan.hydration}</p>
                    </div>

                    <div>
                      <h3>📋 Nutrition Summary</h3>
                      <p>{plan.nutritionSummary}</p>
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      downloadPlan(plan, planNumber)
                    }
                  >
                    📥 Download Plan
                  </button>

                  <p className="disclaimer">
                    This plan is for educational and general
                    wellness purposes only, not medical advice.
                  </p>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPlans;