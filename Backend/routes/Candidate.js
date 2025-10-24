const express = require('express');
const multer=require('multer')
const router = express.Router();
const Candidate = require('../models/Candidateschema.js');
const User = require('../models/Users.js');
const { jwtAuthMiddleware, generateToken } = require('./../jwt.js');

// 🟢 Multer memory storage for image buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ----------------- Candidate Signup ----------------- */
router.post('/sighnup', async (req, res) => {
  try {
    const data = req.body;
    const newCandidate = new Candidate(data);
    const response = await newCandidate.save();

    console.log('Candidate added');

    const payloade = {
      id: response._id,
      name: response.name
    };

    const token = generateToken(payloade);
    res.status(200).json({ Candidate: response, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ----------------- Delete Candidate ----------------- */
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const loggedId = req.user.id;
    const candidateId = req.params.id;

    const currentUser = await User.findById(loggedId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const response = await Candidate.findByIdAndDelete(candidateId);
    if (!response) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({ response, message: 'Candidate deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ----------------- Update Candidate ----------------- */
router.put('/update/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const adminid = req.user.id;
    const id = req.params.id;
    const data = req.body;
    const currentUser = await User.findById(adminid);

    if (!currentUser || currentUser.role !== 'admin') {
      res.status(401).json({ Message: "Access denied, only admin can update" });
      console.log("Access denied, not admin");
      return;
    }

    const response = await Candidate.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!response) {
      res.status(404).json({ error: 'Candidate not found' });
      return;
    }

    res.status(200).json({ Candidate: response, message: 'Candidate updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ----------------- Get All Candidates ----------------- */
router.get('/Candidate', async (req, res) => {
  try {
    const response = await Candidate.find();

    // Convert image buffer to Base64
    const formatted = response.map((c) => ({
      _id: c._id,
      name: c.name,
      party: c.party,
      age: c.age,
      voteCount: c.voteCount || 0,
      image: c.image?.data
        ? `data:${c.image.contentType || 'image/jpeg'};base64,${c.image.data.toString('base64')}`
        : null,
    }));

    console.log('Candidates fetched');
    res.status(200).json({ response: formatted, message: 'Candidate data fetched successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ----------------- Vote Candidate ----------------- */
router.post('/Candidatevote/:candidateId', jwtAuthMiddleware, async (req, res) => {
  const candidateId = req.params.candidateId;
  const userId = req.user.id;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== 'user') return res.status(403).json({ message: "Only users can vote" });
    if (user.isvoted) return res.status(403).json({ message: "You have already voted" });

    if (!Array.isArray(candidate.votes)) candidate.votes = [];
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    user.isvoted = true;
    await user.save();

    res.status(200).json({ message: "Voted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ----------------- Vote Results ----------------- */
router.get('/voteresult', async (req, res) => {
  try {
    const Candidatesvote = await Candidate.find().sort({ voteCount: 'desc' });
    const winner = Candidatesvote.reduce((maxCandidate, candidate) =>
      candidate.voteCount > maxCandidate.voteCount ? candidate : maxCandidate
    , Candidatesvote[0]);

    res.status(200).json({ Response: Candidatesvote, Win: winner, message: "Vote results fetched successfully" });
    console.log(Candidatesvote, winner, "voteresult fetched successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error at voteresult" });
  }
});

/* ----------------- Upload Candidate Image ----------------- */
router.post('/upload/:id', upload.single('image'), async (req, res) => {
  try {
    const candidateId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    candidate.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    await candidate.save();

    res.status(200).json({ message: 'Image uploaded successfully', candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
