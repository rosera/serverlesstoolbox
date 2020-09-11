const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();

const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

const trackedAnimals = ['raccoon', 'alpaca', 'squirrel', 'red panda'];

/**
 * Triggered from a change to a Cloud Storage bucket.
 */
exports.analyzeImage = async (event, context) => {
  const file = event;

  // Run the Cloud Vision API against this file.
  const [result] = await visionClient.labelDetection(
    `gs://${file.bucket}/${file.name}`
  );
  const descriptions = Array.from(result.labelAnnotations, la => la.description);
  for (let i = 0; i < descriptions.length; ++i) {
    const animal = descriptions[i].toLocaleLowerCase();

    if (trackedAnimals.includes(animal)) {
      const photoUrl = `http://${file.bucket}.storage.googleapis.com/${file.name}`
      const data = {
        animal,
        timestamp: new Date(),
        photoUrl,
      };
      await firestore.collection(animal).doc().set(data);
      break;
    }
  }
};