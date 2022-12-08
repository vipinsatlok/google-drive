const { google } = require("googleapis");
const fs = require("fs");

// Authenticate your app
const auth = new google.auth.GoogleAuth({
  keyFile: "secret.json",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

// Create a client for Google Drive API
const drive = google.drive({ version: "v3", auth });

// Read the image file
const imageFile = "image.jpg";

fs.readFile(imageFile, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // ID of the folder where you want to upload the image file
  const folderId = "your-folder-id";

  // Create a new file in Google Drive
  drive.files.create(
    {
      requestBody: {
        name: imageFile,
        mimeType: "image/jpeg",
        parents: [folderId], // Set the ID of the folder where you want to upload the image file
      },
      media: {
        mimeType: "image/jpeg",
        body: data,
      },
    },
    (err, file) => {
      if (err) {
        console.error("Error uploading file:", err);
        return;
      }

      console.log("File uploaded:", file.data.webViewLink);
    }
  );
});
