import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthRoute = express.Router();

googleAuthRoute.post("/google", googleLogin);

async function googleLogin(req, res) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
        role: "user",
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
}

export default googleAuthRoute;
