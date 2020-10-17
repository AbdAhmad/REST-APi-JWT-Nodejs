const router = require('express').Router();
const Meeting = require('../model/Meeting');
const verify = require('./verifyToken');

router.post('/meeting/post', verify, (req, res) => {
    const meeting = new Meeting({
        meeting_id: req.body.meeting_id,
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        organiser: req.body.organiser,
        attendees: req.body.attendees
    })
    meeting.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send('Error occurred while creating a meeting.');
        });
});

router.get('/meeting/fetch', verify, (req, res) => {
    Meeting.find()
        .then(meetings => {
            res.send(meetings);
        })
        .catch(err => {
            res.status(500).send("Error occurred while fetching the meetings informations.")
        });
});

router.get('/meeting/fetch/:meetingId', verify, (req, res) => {
    Meeting.findById(req.params.meetingId)
        .then(meeting => {
            res.send(meeting);
        })
        .catch(err => {
            res.status(404).send("No meeting found with this id.")
        })
})

router.put('/meeting/update/:meetingId', verify, (req, res) => {
    Meeting.findByIdAndUpdate(req.params.meetingId, {
        meeting_id: req.body.meeting_id,
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        organiser: req.body.organiser,
        attendees: req.body.attendees
    }, { new: true})
        .then(meeting => {
            res.send(meeting);
        })
        .catch(err => {
            return res.status(500).send("Error occurred.")
        })
})

module.exports = router;