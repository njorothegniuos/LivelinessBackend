import express from "express";
import { RekognitionClient, CreateFaceLivenessSessionCommand } from "@aws-sdk/client-rekognition";
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/rekognition/command/CreateFaceLivenessSessionCommand/
const app = express();

// Configuration for AWS Rekognition client
const credentials = {
  region: "region",
  credentials: {
    accessKeyId: "your-access-key",
    secretAccessKey: "your-secret-key"
  }
};

const client = new RekognitionClient(credentials);

// Define a route to handle POST requests
app.post('/createFaceLivenessSession', async (req, res) => {
  try {
    // Input parameters for CreateFaceLivenessSessionCommand
    const input = {
      KmsKeyId: "your-key",
      Settings: {
        AuditImagesLimit: 1,
      },
      ClientRequestToken: "random-unique-string",
    };

    // Create and send the command
    const command = new CreateFaceLivenessSessionCommand(input);
    const response = await client.send(command);

    // Send the response back to the client
    res.json({ sessionId: response.SessionId});
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
