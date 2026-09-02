export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { title, message } = req.body;

        const response = await fetch("https://onesignal.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Basic ${process.env.ONESIGNAL_API_KEY}`
            },
            body: JSON.stringify({
                app_id: "734c0117-829f-4b2d-92b7-12cd13c353a7",
                included_segments: ["All"],
                headings: { "en": title },
                contents: { "en": message }
            })
        });

        const data = await response.json();
        return res.status(200).json({ success: true, data });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
