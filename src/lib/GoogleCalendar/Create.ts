import { calendar_v3, google } from "googleapis";

export async function GoogleCalenderCreate(accessToken: string, refreshToken: string) {
    // Google OAuthへの接続
    const oauth2Client = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "http://localhost:3000/api/auth/callback/google",
    });

    // トークンを設定。
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly",
    });

    // Googleカレンダーの一覧を取得する
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const calendarResponse = await calendar.calendarList.list();

    // writeFileSync("./calendar2.json", JSON.stringify(calendarResponse));

    return calendarResponse;
}
