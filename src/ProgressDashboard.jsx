import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

function ProgressDashboard({ user }) {
  const [trackers, setTrackers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        // Load daily tracker records for this user
        const trackerQuery = query(
          collection(db, "daily_trackers"),
          where("userId", "==", user.uid)
        );

        const trackerSnapshot = await getDocs(trackerQuery);

        const trackerData = trackerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort newest first in React
        trackerData.sort((a, b) =>
          String(b.date).localeCompare(String(a.date))
        );

        setTrackers(trackerData);

        // Load saved diet plans
        const planQuery = query(
          collection(db, "diet_plans"),
          where("userId", "==", user.uid)
        );

        const planSnapshot = await getDocs(planQuery);

        const planData = planSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlans(planData);
      } catch (error) {
        console.error("Progress dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  if (loading) {
    return <h2>Loading progress...</h2>;
  }

  // Calculate overall meal completion
  let completedMeals = 0;
  let totalMeals = 0;
  let totalWater = 0;

  trackers.forEach((tracker) => {
    const meals = tracker.meals || {};

    const mealNames = ["breakfast", "lunch", "snack", "dinner"];

    mealNames.forEach((meal) => {
      totalMeals++;

      if (meals[meal]) {
        completedMeals++;
      }
    });

    totalWater += Number(tracker.water || 0);
  });

  const mealCompletion =
    totalMeals > 0
      ? Math.round((completedMeals / totalMeals) * 100)
      : 0;

  const averageWater =
    trackers.length > 0
      ? (totalWater / trackers.length).toFixed(1)
      : 0;

  const latestTracker = trackers.length > 0 ? trackers[0] : null;

  return (
    <div className="progress-page">
      <div className="progress-container">

        <h1>📊 Progress Dashboard</h1>

        <p>
          Track your meal completion, hydration and planning activity.
        </p>

        {/* Summary Cards */}
        <div className="progress-grid">

          <div className="progress-card">
            <h2>🍽️ Meal Completion</h2>
            <p className="progress-number">
              {mealCompletion}%
            </p>
            <p>
              {completedMeals} of {totalMeals} meals completed
            </p>
          </div>

          <div className="progress-card">
            <h2>💧 Average Water</h2>
            <p className="progress-number">
              {averageWater}
            </p>
            <p>servings per tracked day</p>
          </div>

          <div className="progress-card">
            <h2>📅 Tracked Days</h2>
            <p className="progress-number">
              {trackers.length}
            </p>
            <p>days recorded</p>
          </div>

          <div className="progress-card">
            <h2>🥗 Saved Plans</h2>
            <p className="progress-number">
              {plans.length}
            </p>
            <p>diet plans generated</p>
          </div>

        </div>

        {/* Latest Progress */}
        <section className="progress-section">

          <h2>📈 Latest Progress</h2>

          {!latestTracker ? (
            <div className="progress-empty">
              <h3>No tracking data yet</h3>
              <p>
                Use the Daily Tracker to record your meals and hydration.
              </p>
            </div>
          ) : (
            <div className="latest-progress-card">

              <h3>
                Date: {latestTracker.date}
              </h3>

              <div className="meal-status">

                <p>
                  {latestTracker.meals?.breakfast
                    ? "✅"
                    : "⬜"} Breakfast
                </p>

                <p>
                  {latestTracker.meals?.lunch
                    ? "✅"
                    : "⬜"} Lunch
                </p>

                <p>
                  {latestTracker.meals?.snack
                    ? "✅"
                    : "⬜"} Snack
                </p>

                <p>
                  {latestTracker.meals?.dinner
                    ? "✅"
                    : "⬜"} Dinner
                </p>

              </div>

              <p>
                💧 Water servings:{" "}
                <strong>{latestTracker.water || 0}</strong>
              </p>

            </div>
          )}

        </section>

        {/* Recent Tracking History */}
        <section className="progress-section">

          <h2>🗓️ Tracking History</h2>

          {trackers.length === 0 ? (
            <p>No tracking history available.</p>
          ) : (
            <div className="history-list">

              {trackers.slice(0, 7).map((tracker) => {

                const meals = tracker.meals || {};

                const completed =
                  Number(meals.breakfast) +
                  Number(meals.lunch) +
                  Number(meals.snack) +
                  Number(meals.dinner);

                return (
                  <div
                    className="history-card"
                    key={tracker.id}
                  >
                    <div>
                      <strong>{tracker.date}</strong>
                    </div>

                    <div>
                      🍽️ {completed}/4 meals
                    </div>

                    <div>
                      💧 {tracker.water || 0} water servings
                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </section>

        <p className="disclaimer">
          This dashboard is for educational and general wellness
          tracking only. It does not provide medical advice.
        </p>

      </div>
    </div>
  );
}

export default ProgressDashboard;