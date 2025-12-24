// Google Sheets integration temporarily disabled
// Reason: credentials.json is not available on Render
// This prevents backend crashes and unblocks email/contact APIs

export async function addDataInSheet(req, res) {
  try {
    console.log("ℹ️ Google Sheets temporarily disabled");

    return res.status(200).json({
      success: true,
      message: "Google Sheets integration temporarily disabled",
    });

  } catch (error) {
    console.error("❌ Sheet Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Sheet service unavailable",
    });
  }
}
