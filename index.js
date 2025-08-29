require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { z } = require("zod");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// ---- helpers ----
const env = {
  fullName: process.env.FULL_NAME || "john doe",
  dob: process.env.DOB_DDMMYYYY || "17091999",
  email: process.env.EMAIL || "john@xyz.com",
  roll: process.env.ROLL_NUMBER || "ABCD123",
};

const userId = `${env.fullName.trim().toLowerCase().replace(/\s+/g, "_")}_${env.dob}`;

const isIntegerString = (s) => /^[-+]?\d+$/.test(s.trim());
const isAlphaString = (s) => /^[A-Za-z]+$/.test(s.trim());

function concatAlternatingCapsReverse(inputArray) {
  const letters = [];
  for (const raw of inputArray) {
    const s = String(raw);
    const matches = s.match(/[A-Za-z]/g);
    if (matches) letters.push(...matches);
  }
  letters.reverse();
  return letters
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    // validate input
    const schema = z.object({
      data: z.array(z.any(), { invalid_type_error: "`data` must be an array" }),
    });
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        is_success: false,
        user_id: userId,
        email: env.email,
        roll_number: env.roll,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: parsed.error.issues.map((i) => i.message).join("; "),
      });
    }

    const input = parsed.data.data;

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0n; // BigInt for safety

    for (const raw of input) {
      const s = String(raw);

      if (isIntegerString(s)) {
        const n = BigInt(s);
        sum += n;
        if (n % 2n === 0n) {
          even_numbers.push(s);
        } else {
          odd_numbers.push(s);
        }
      } else if (isAlphaString(s)) {
        alphabets.push(s.toUpperCase());
      } else {
        special_characters.push(s);
      }
    }

    const concat_string = concatAlternatingCapsReverse(input);

    return res.status(200).json({
      is_success: true,
      user_id: userId,
      email: env.email,
      roll_number: env.roll,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(), // return as string
      concat_string,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      is_success: false,
      user_id: userId,
      email: env.email,
      roll_number: env.roll,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Internal Server Error",
    });
  }
});

// health ping (optional)
app.get("/", (_req, res) => res.send("BFHL API up. POST /bfhl"));

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1, message: "GET /bfhl is working" });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});