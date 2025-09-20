export function getAllnotes (req, res){
  res.status(200).send("20 notes");
}

export function createNote (req, res){
  res.status(201).json({ message: "Note created" });
}

export function updateNote (req, res){
  res.status(201).json({ message: "Note updated" });
}

export function deleteNote (req, res){
  res.status(201).json({ message: "Note deleted" });
}