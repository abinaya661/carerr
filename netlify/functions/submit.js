const { neon } = require("@neondatabase/serverless");

exports.handler = async (event) => {
  // Handle preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO quiz_responses (
        name, age, color_palette, music_vibe,
        fashion_style, fave_food, dream_destination,
        life_era, superpower, career_type, personal_vibe,
        score_r, score_i, score_a, score_s, score_e, score_c
      ) VALUES (
        ${data.name}, ${data.age}, ${data.color_palette},
        ${data.music_vibe}, ${data.fashion_style}, ${data.fave_food},
        ${data.dream_destination}, ${data.life_era}, ${data.superpower},
        ${data.career_type}, ${data.personal_vibe},
        ${data.score_r}, ${data.score_i}, ${data.score_a},
        ${data.score_s}, ${data.score_e}, ${data.score_c}
      )
    `;

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
