// One-off maintenance script: back up every user/lead document to a local
// JSON file, then delete them all (registered "leads" table on /admin/users).
// Usage: node backend/utils/clearAllUsers.js
const path = require("path");
const fs = require("fs");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: path.join(__dirname, "../config/config.env") });
connectDatabase();

const run = async () => {
  try {
    const users = await User.find({});
    const backupPath = path.join(
      __dirname,
      `../users-backup-${Date.now()}.json`
    );
    fs.writeFileSync(backupPath, JSON.stringify(users, null, 2));
    console.log(`Backed up ${users.length} users to ${backupPath}`);

    // Never delete admin accounts — that would lock the site owner out.
    const result = await User.deleteMany({ role: { $ne: "admin" } });
    console.log(`Deleted ${result.deletedCount} users (admin accounts preserved)`);
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

run();
