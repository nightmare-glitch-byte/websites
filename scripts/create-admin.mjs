import { randomUUID } from "node:crypto";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline";
import { Pool } from "pg";
import { initializeDatabase } from "../lib/database-schema.mjs";
import { hashPassword } from "../lib/passwords.mjs";

if (!process.env.DATABASE_URL) {
  throw new Error("Set DATABASE_URL to your PostgreSQL connection string before creating the administrator.");
}

const database = new Pool({ connectionString: process.env.DATABASE_URL });

function ask(question) {
  const readline = createInterface({ input: stdin, output: stdout });
  return new Promise((resolve) => readline.question(question, (answer) => {
    readline.close();
    resolve(answer.trim());
  }));
}

function askHidden(question) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    return Promise.reject(new Error("Run npm run admin:create in an interactive terminal to enter the administrator password safely."));
  }

  stdout.write(question);
  stdin.setRawMode(true);
  stdin.resume();

  return new Promise((resolve, reject) => {
    let answer = "";
    const finish = (error) => {
      stdin.removeListener("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
      if (error) reject(error);
      else resolve(answer);
    };
    const onData = (chunk) => {
      for (const character of chunk.toString("utf8")) {
        if (character === "\u0003") return finish(new Error("Admin setup cancelled."));
        if (character === "\r" || character === "\n") return finish();
        if (character === "\u007f" || character === "\b") {
          answer = answer.slice(0, -1);
        } else if (character >= " ") {
          answer += character;
        }
      }
    };
    stdin.on("data", onData);
  });
}

try {
  await initializeDatabase(database);
  const existingAdmin = await database.query("SELECT 1 FROM users WHERE role = 'admin' LIMIT 1");
  if (existingAdmin.rowCount) {
    throw new Error("An administrator already exists in this PostgreSQL database. Admin setup is already complete.");
  }

  const username = await ask("Admin username (3-30 letters, numbers, ., _, or -): ");
  if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(username)) {
    throw new Error("Username must be 3-30 letters, numbers, dots, underscores, or hyphens.");
  }

  const fullName = (await ask("Admin display name [AURA Administrator]: ")) || "AURA Administrator";
  const password = await askHidden("Admin password (at least 12 characters): ");
  if (password.length < 12 || password.length > 128) {
    throw new Error("Password must be between 12 and 128 characters.");
  }
  const confirmation = await askHidden("Confirm password: ");
  if (password !== confirmation) throw new Error("Passwords do not match.");

  const passwordHash = await hashPassword(password);
  await database.query(`
    INSERT INTO users (id, full_name, username, username_normalized, email, password_hash, role, status, created_at)
    VALUES ($1, $2, $3, $4, NULL, $5, 'admin', 'approved', $6)
  `, [randomUUID(), fullName.slice(0, 100), username, username.toLowerCase(), passwordHash, Date.now()]);

  console.log(`Administrator "${username}" created in the configured PostgreSQL database.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unable to create administrator.");
  process.exitCode = 1;
} finally {
  await database.end();
}
