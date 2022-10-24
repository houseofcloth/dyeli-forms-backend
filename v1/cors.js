/**
 * CORS Stuff from
 * https://egghead.io/courses/build-a-serverless-api-with-cloudflare-workers-d67ca551
 */
const allowedOrigins = [
  'https://dye.li',
  'http://localhost:8787',    // Possibly open to abuse if left in production.
]

export const corsHeaders = origin => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': "PUT, GET, OPTIONS",
  'Access-Control-Allow-Origin': origin,
  'Vary': 'Origin'
})

export const checkOrigin = origin => {
  const foundOrigin = allowedOrigins.find(o => o.includes(origin))
  return (foundOrigin) ? foundOrigin : allowedOrigins[0]
}
