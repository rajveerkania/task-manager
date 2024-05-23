const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
  try {
    const { type, time, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({ type, time, user: existingUser });
      await list.save().then(() => {
        res.status(200).json(list);
      });
      existingUser.list.push(list);
      await existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { type, time } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { type, time });
    list
      .save()
      .then(() => res.status(200).json({ message: "Task has been updated!" }));
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: "The task has been deleted!" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({});

  if (list.length != 0) {
    res.status(200).json({ tasks: list });
  } else {
    res.status(200).json({ message: "No Tasks" });
  }
});

module.exports = router;
