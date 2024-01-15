import express from "express";
import {
  addStudents,
  deleteStudentsbyId,
  editStudentsbyId,
  getAllStudents,
  getStudentsbyId,
} from "../Controller/students.js";

//initializing router

const router = express.Router();

// Get all students data
router.get("/all", async (req, res) => {
  try {
    const students = await getAllStudents(req);
    if (students.length <= 0) {
      return res.status(404).send({ message: "No data available" });
    }
    res.status(200).send(students);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get sapecific id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentsbyId(id);
    if (!student) {
      return res.status(404).send({ message: "No data available" });
    }
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Add a student data
router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(404).send({ message: "Data fields cannot be empty" });
    }
    const newStudent = await addStudents(req.body);
    if (!newStudent.acknowledged) {
      return res.status(404).send({ message: "Cannot add data" });
    }
    res.status(201).send(newStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Edit the specific student data
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || Object.keys(req.body).length <= 0) {
      return res.status(404).send({ message: "Data fields cannot be empty" });
    }
    const editStudent = await editStudentsbyId(id, req.body);
    res.status(201).send(editStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete a student data
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStudent = await deleteStudentsbyId(id);
    if (!deleteStudent) {
      return res.status(404).send({ message: "No data available" });
    }
    res.status(201).send(deleteStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export const studentsRouter = router;
