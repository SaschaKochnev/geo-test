export async function handler(event) {
  try {
    const ip =
      event.headers["x-forwarded-for"]?.split(",")[0] || "unknown";

    const { latitude, longitude, accuracy } = JSON.parse(event.body);

    const SUPABASE_URL = "https://bcejklrgflhaidxbvykz.supabase.co";
    const SUPABASE_KEY = "sb_publishable_81YR6phB8bHBOFBiudVj-w_qyZR7C_f";

    const res = await fetch(`${SUPABASE_URL}/rest/v1/locations`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        ip,
        latitude,
        longitude,
        accuracy
      })
    });

    if (!res.ok) {
      throw new Error("Supabase insert failed");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}