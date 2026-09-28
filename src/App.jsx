import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Dashboard from "./Dashboard";
import DietPlan from "./DietPlan";
import SavedPlans from "./SavedPlans";
import DailyTracker from "./DailyTracker";
import ProgressDashboard from "./ProgressDashboard";
import Profile from "./Profile";
import CloudFiles from "./CloudFiles";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showGenerator, setShowGenerator] = useState(false);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCloudFiles, setShowCloudFiles] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // PROFILE
  if (showProfile) {
    return (
      <div>
        <button
          onClick={() => setShowProfile(false)}
          style={{
            margin: "20px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <Profile user={user} />
      </div>
    );
  }
  if (showCloudFiles) {
  return (
    <div>
      <button
        onClick={() => setShowCloudFiles(false)}
        style={{
          margin: "20px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <CloudFiles />
    </div>
  );
}

  // DIET PLAN GENERATOR
  if (showGenerator) {
    return (
      <div>
        <button
          onClick={() => setShowGenerator(false)}
          style={{
            margin: "20px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <DietPlan user={user} />
      </div>
    );
  }

  // SAVED PLANS
  if (showSavedPlans) {
    return (
      <div>
        <button
          onClick={() => setShowSavedPlans(false)}
          style={{
            margin: "20px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <SavedPlans user={user} />
      </div>
    );
  }

  // DAILY TRACKER
  if (showTracker) {
    return (
      <div>
        <button
          onClick={() => setShowTracker(false)}
          style={{
            margin: "20px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <DailyTracker user={user} />
      </div>
    );
  }

  // PROGRESS
  if (showProgress) {
    return (
      <div>
        <button
          onClick={() => setShowProgress(false)}
          style={{
            margin: "20px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        <ProgressDashboard user={user} />
      </div>
    );
  }

  // DASHBOARD
  return (
    <Dashboard
      user={user}
      onGenerate={() => setShowGenerator(true)}
      onSavedPlans={() => setShowSavedPlans(true)}
      onDailyTracker={() => setShowTracker(true)}
      onProgress={() => setShowProgress(true)}
      onProfile={() => setShowProfile(true)}
      onCloudFiles={() => setShowCloudFiles(true)}
    />
  );
}

export default App;