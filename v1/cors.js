/**
 * CORS Stuff from
 * https://egghead.io/courses/build-a-serverless-api-with-cloudflare-workers-d67ca551
 */
 const allowedOrigins = [
  'https://dye.li',
  'https://www.thefatquarter.com.au',
  'https://thefatquarter.com.au',
  'https://www.fatquarter.com.au',
  'https://fatquarter.com.au',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8787',
];

export const corsHeaders = origin => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': "PUT, GET, OPTIONS",
  'Access-Control-Allow-Origin': origin,
  'Vary': 'Origin'
});

export const checkOrigin = request => {
  const origin = request.headers.get('Origin');
  const foundOrigin = allowedOrigins.find(o => o.includes(origin))
  return (foundOrigin) ? foundOrigin : allowedOrigins[0];
}
