import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/folders";

const FolderTree = ({ tree, refresh }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleAdd = async (parentId, type) => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;
    await axios.post(API, {
      name,
      type,
      content: type === "file" ? "Sample content" : null,
      parent: parentId,
    });
    refresh();
  };

  const handleRename = async (id) => {
    const name = prompt("Enter new name:");
    if (!name) return;
    await axios.put(`${API}/${id}`, { name });
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API}/${id}`);
      refresh();
    }
  };

  const renderTree = (nodes) =>
    nodes.map((node) => (
      <div key={node._id} style={{ marginLeft: 20 }}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedId(node._id)}
        >
          {node.type === "folder" ? "📁" : "📄"} {node.name}
        </span>{" "}
        <button onClick={() => handleAdd(node._id, "folder")}>+Folder</button>
        <button onClick={() => handleAdd(node._id, "file")}>+File</button>
        <button onClick={() => handleRename(node._id)}>Rename</button>
        <button onClick={() => handleDelete(node._id)}>Delete</button>

        {node.children && node.children.length > 0 && renderTree(node.children)}
      </div>
    ));

  return <div>{renderTree(tree)}</div>;
};

export default FolderTree;
