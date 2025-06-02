const functions = require('firebase-functions');
const admin = require('firebase-admin');
const next = require('next');

admin.initializeApp();

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './',
});

const handle = nextApp.getRequestHandler();

// Correct usage for 1st Gen functions (no CPU configuration)
exports.nextjs = functions
  .runWith({ memory: '256MB', timeoutSeconds: 60 })  // Memory and timeout only for Gen 1
  .https.onRequest((req, res) => {
    return nextApp.prepare().then(() => {
      handle(req, res);
    });
  });
