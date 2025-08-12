import React, { useEffect, useState } from "react";
import axios from "axios";
import FolderTree from "./components/FolderTree";

const API = "http://localhost:5000/api/folders";

function App() {
  const [tree, setTree] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      console.log("Fetched tree:", res.data); // 🔍 LOG HERE
      setTree(res.data);
    } catch (err) {
      console.error("Error fetching tree:", err); // ⚠️ LOG ERRORS
    }
  };

 useEffect(() => {
  const bootstrap = async () => {
    const res = await axios.get(API);
    if (res.data.length === 0) {
      // Create a root folder if nothing exists
      await axios.post(API, {
        name: "Root Folder",
        type: "folder",
        parent: null
      });
    }
    fetchData();
  };
  bootstrap();
}, []);


  return (
    <div className="App">
      <h2>📁 Folder & File Manager</h2>
      <FolderTree tree={tree} refresh={fetchData} />
    </div>
  );
}

export default App;
