const Folder = require("../models/Folder");

exports.getTree = async (req, res) => {
  const buildTree = (items, parent = null) =>
    items
      .filter((item) => String(item.parent) === String(parent))
      .map((item) => ({
        ...item._doc,
        children: buildTree(items, item._id),
      }));

  const all = await Folder.find();
  res.json(buildTree(all));
};

exports.create = async (req, res) => {
  const { name, type, content, parent } = req.body;
  const newItem = new Folder({ name, type, content, parent });
  const saved = await newItem.save();
  res.json(saved);
};

exports.rename = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updated = await Folder.findByIdAndUpdate(id, { name }, { new: true });
  res.json(updated);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  const deleteRecursive = async (folderId) => {
    const children = await Folder.find({ parent: folderId });
    for (const child of children) {
      await deleteRecursive(child._id);
    }
    await Folder.findByIdAndDelete(folderId);
  };

  await deleteRecursive(id);
  res.json({ message: "Deleted" });
};
