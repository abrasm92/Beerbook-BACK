const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");

const uploadFirebase = async (req, res, next) => {
  const firebaseConfig = {
    apiKey: "AIzaSyCnj9bhjZlQJRRMz0Hjns4V2jEKKpNbqkg",
    authDomain: "beerbook-3942c.firebaseapp.com",
    projectId: "beerbook-3942c",
    storageBucket: "beerbook-3942c.appspot.com",
    messagingSenderId: "455410584141",
    appId: "1:455410584141:web:ec3af5d7d1d43d745aaa04",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const { file } = req;
  const prefixImage = Date.now();
  const newImage = file ? `${prefixImage}-${file.originalname}` : "";

  try {
    if (!file) {
      req.image = "";
      req.imageBackup = "";
      next();
    } else {
      await fs.rename(
        path.join("uploads", "images", "beers", file.filename),
        path.join(
          "uploads",
          "images",
          "beers",
          `${prefixImage}-${file.originalname}`
        ),
        async (error) => {
          if (error) {
            next(error);
          }

          await fs.readFile(
            path.join("uploads", "images", "beers", newImage),
            async (readError, readFile) => {
              if (readError) {
                next(readError);
                return;
              }

              const storage = getStorage(firebaseApp);
              const storageRef = ref(storage, newImage);

              await uploadBytes(storageRef, readFile);

              const firebaseImageURL = await getDownloadURL(storageRef);

              req.imageBackup = firebaseImageURL;
              req.image = path.join("images", "beers", newImage);

              next();
            }
          );
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = uploadFirebase;
