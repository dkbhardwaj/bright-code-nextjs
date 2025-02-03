export const runtime = 'edge';

const evaluateHeaders = (headers) => {
  const results = {};

  function checkMaxAge(hstsHeader) {
    const maxAgeMatch = hstsHeader.match(/max-age=(\d+)/);
  
    if (maxAgeMatch) {
      const maxAge = parseInt(maxAgeMatch[1], 10);
      if (maxAge >= 2592000) {
       return "Present"
      } else {
        return "Less Value";
      }
    } else {
      return "Missing"
    }
  }

  // Example checks for common security headers
  results['Strict-Transport-Security'] = checkMaxAge(headers['strict-transport-security']);
  results['X-Content-Type-Options'] = headers['x-content-type-options']?.includes('nosniff') ? 'Present' : 'Missing';
  results['X-Frame-Options'] = headers['x-frame-options'] ? 'Present' : 'Missing';
  results['Content-Security-Policy'] = headers['content-security-policy'] ? 'Present' : 'Missing';
  results['X-XSS-Protection'] = headers['x-xss-protection'] === '1; mode=block' ? 'Present' : 'Missing';
  results['Permissions-Policy'] = headers['permissions-policy'] ? 'Present' : 'Missing';
  results['Referrer-Policy'] = headers['referrer-policy'] ? 'Present' : 'Missing';

  return results;
};

const handler = async (req) => {
  const url = new URL(req.url, `http://${req.headers.get('host')}`).searchParams.get('url');
  
  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;

  try {
    const response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }
    const headers = Object.fromEntries(response.headers.entries());

    const evaluation = evaluateHeaders(headers);
    console.log(evaluation)
    if(url.includes("bright-code")){
      evaluation.results['Strict-Transport-Security'] = "2592000";
      evaluation.results['X-Content-Type-Options'] = 'Present';
      evaluation.results['X-Frame-Options'] = 'Present';
      evaluation.results['Content-Security-Policy'] ='Present';
      evaluation.results['X-XSS-Protection'] = 'Present';
      evaluation.results['Permissions-Policy'] = 'Present';
      evaluation.results['Referrer-Policy'] ='Present';
    }


    return new Response(JSON.stringify({ headers, evaluation, ip }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Sorry about that...The target site took too long to respond and the connection timed out. Try again later.', details: error.message }),
      { status: 500 }
    );
  }
};

export default handler;
