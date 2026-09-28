import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase";

function Dashboard({
  user,
  onGenerate,
  onSavedPlans,
  onDailyTracker,
  onProgress,
  onProfile,
  onCloudFiles
}){
  const [profile, setProfile] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Load profile
        const profileQuery = query(
          collection(db, "users"),
          where("__name__", "==", user.uid)
        );

        const profileSnapshot = await getDocs(profileQuery);

        if (!profileSnapshot.empty) {
          setProfile(profileSnapshot.docs[0].data());
        }

        // Load saved diet plans
        const plansQuery = query(
          collection(db, "diet_plans"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const plansSnapshot = await getDocs(plansQuery);

        const savedPlans = plansSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlans(savedPlans);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  const latestPlan = plans.length > 0 ? plans[0] : null;

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h2>🥗 AI Diet Planner</h2>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">

        <section className="welcome-section">
          <h1>
            Welcome{profile?.name ? `, ${profile.name}` : ""}! 👋
          </h1>

          <p>
            Your personalized wellness planning dashboard
          </p>
        </section>

        <div className="dashboard-grid">
            <div className="dashboard-card">
                <h3>👤 Profile</h3>
                <p>Update your personal and dietary preferences.</p>
                <button onClick={onProfile}>Open Profile</button>
            </div>

          <div className="dashboard-card">
            <h3>🎯 Current Goal</h3>
            <p>
              {profile?.goal || "Not set"}
            </p>
          </div>
          <div className="dashboard-card">
                <h3>📊 Progress</h3>
                <p>View your meal and hydration progress.</p>

                <button onClick={onProgress}>
                    View Progress
                </button>
            </div>

          <div
            className="dashboard-card"
            onClick={onDailyTracker}
            style={{ cursor: "pointer" }}
            >
            <h3>📅 Daily Tracker</h3>
            <p>Track today's meals and hydration.</p>
            <button onClick={onDailyTracker}>
                Open Daily Tracker
            </button>
            </div>

          <div className="dashboard-card">
            <h3>📋 Previous Plans</h3>

            <p>
                {plans.length} saved plan{plans.length !== 1 ? "s" : ""}
            </p>

            <button onClick={onSavedPlans}>
                View Saved Plans
            </button>
            </div>

          <div className="dashboard-card">
            <h3>📁 Cloud Files</h3>
            <p>Upload and manage your diet-related files.</p>
            <button onClick={onCloudFiles}>
              Open Cloud Files
            </button>
          </div>

        </div>

        <section className="dashboard-actions">

          <button onClick={onGenerate}>
            ➕ Generate New Diet Plan
          </button>

        </section>

        {latestPlan && (
          <section className="latest-plan">

            <h2>Latest Diet Plan</h2>

            <div className="plan-grid">

              <div>
                <h3>🌅 Breakfast</h3>
                <p>{latestPlan.breakfast}</p>
              </div>

              <div>
                <h3>☀️ Lunch</h3>
                <p>{latestPlan.lunch}</p>
              </div>

              <div>
                <h3>🍎 Snack</h3>
                <p>{latestPlan.snack}</p>
              </div>

              <div>
                <h3>🌙 Dinner</h3>
                <p>{latestPlan.dinner}</p>
              </div>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default Dashboard;