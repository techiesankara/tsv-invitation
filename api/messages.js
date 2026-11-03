
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwCmWn78ahJHy_Z8XSGww_H57U0hcG4xZAQObSdK1OPxG9Yepx-H2sXzg_MG-5w7ixX/exec';

module.exports = async (req, res) => {
    try {
        // Mengambil daftar ucapan
        if (req.method === 'GET') {
            const response = await fetch(GOOGLE_SCRIPT_URL);

            if (!response.ok) {
                throw new Error(`Google Apps Script error: ${response.status}`);
            }

            const result = await response.json();

            return res.status(200).json(result);
        }

        // Mengirim RSVP
        if (req.method === 'POST') {
            const data = req.body;

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify({
                    nama: data.nama || '',
                    kehadiran: data.kehadiran || '',
                    ucapan: data.ucapan || ''
                })
            });

            if (!response.ok) {
                throw new Error(`Google Apps Script error: ${response.status}`);
            }

            const result = await response.json();

            return res.status(200).json(result);
        }

        return res.status(405).json({
            success: false,
            error: 'Method Not Allowed'
        });

    } catch (error) {
        console.error('API Error:', error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
