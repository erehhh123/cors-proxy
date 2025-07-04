import axios from 'axios';

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing ?url=' });
  }

  try {
    const proxyResponse = await axios.get(targetUrl, {
      proxy: {
        host: '128.199.90.208', // Example Singapore proxy (HTTP)
        port: 3128
      },
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 10000
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.status(200).send(proxyResponse.data);

  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: error.toString() });
  }
}
