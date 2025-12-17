import { google } from "googleapis";
export async function addDataInSheet(req,res){
    try{
        const value=req?.body
        const auth = new google.auth.GoogleAuth({
            keyFile: "./credentials.json", // path to service account key
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

        const client = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: client });

        await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: "Sheet1!A:D",
            valueInputOption: "USER_ENTERED",
            requestBody: { values },
        });

        return res.status(200).json({message:"Data Saved Successfully",flag:true})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Wrong at server side while adding data in the sheet",flag:false})
    }
}