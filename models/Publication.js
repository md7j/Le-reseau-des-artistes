const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

var PublicationSchema = new mongoose.Schema({
  type: String,
  content: String,
  description: String,
  owner: String,
  likes: [String],
  views: Number
}, {timestamps: true});

mongoose.model('Publication', PublicationSchema);