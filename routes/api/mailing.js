const auth = require('../../middleware/adminAuth');
const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();

const Domain = process.env.EMAIL_DOMAIN;
const apiKey = process.env.EMAIL_KEY;
const listName = 'Newsletter';
const listAddress = `${listName}@${Domain}`;

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'TranquilGorge', key: apiKey });

// Desc     Send Email to Mailing List
router.post('/new-email', auth, async (req, res) => {
  const myData = {
    from: listAddress,
    to: listAddress,
    subject: req.body.subject,
    text: req.body.text,
  };

  try {
    const message = await client.messages.create(Domain, myData);
    res.json(message);
  } catch (error) {
    console.log(error);
  }
});

// Desc     Create Mailing List
router.post('/', auth, async (req, res) => {
  try {
    const newList = await client.lists.create({
      address: listAddress,
      name: listName,
      description: 'Dev Blog Newsletter',
      access_level: 'everyone', // readonly (default), members, everyone
    });
    console.log('newList', newList);
  } catch (error) {
    console.error(error);
  }
});

// Remove member
router.post('/destroy-member', userAuth, async (req, res) => {
  try {
    const deletedMember = await client.lists.members.destroyMember(listAddress, req.body.email);
    res.json(deletedMember);
  } catch (error) {
    console.log(error);
  }
});

// Desc     Add Member to Mailing List
router.post('/member', userAuth, async (req, res) => {
  try {
    const newMember = await client.lists.members.createMember(listAddress, {
      address: req.body.email,
      name: req.body.name,
    });
    console.log('subbed');
    res.json(newMember);
  } catch (error) {
    console.log(error);
  }
});

// Check if user is subcribed
router.post('/check-subbed', userAuth, async (req, res) => {
  try {
    const member = await client.lists.members.getMember(listAddress, req.body.email);
    res.json(member);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
