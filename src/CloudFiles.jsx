import { useState } from "react";

function CloudFiles() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const fileData = selectedFiles.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1),
      type: file.type || "Unknown",
    }));

    setFiles((previous) => [...previous, ...fileData]);
  };

  return (
    <div className="diet-page">
      <div className="diet-card">
        <h1>📁 Cloud Files</h1>

        <p>
          Upload and manage files related to your diet planning project.
        </p>

        <input
          type="file"
          multiple
          onChange={handleFileUpload}
        />

        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <div>
            <h2>Uploaded Files</h2>

            {files.map((file, index) => (
              <div key={index} className="dashboard-card">
                <h3>📄 {file.name}</h3>
                <p>Size: {file.size} KB</p>
                <p>Type: {file.type}</p>
              </div>
            ))}
          </div>
        )}

        <p className="disclaimer">
          Demo cloud-storage interface. Firebase Cloud Storage is not enabled
          because it requires a paid billing plan.
        </p>
      </div>
    </div>
  );
}

export default CloudFiles;