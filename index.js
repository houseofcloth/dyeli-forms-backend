/**
 * Worker for handling for submissions for House of Cloth.
 */

// Import Airtable functions
import { submitOrderFdbk, submitStoreFdbk, submitWebsiteFdbk, orderSamples} from "./v1/airtable"

//
export default {
  async fetch(req, env) {

    const url = new URL(req.url)

    console.log("URL: ", url)

    // Get session ID/Token
    const sessionID = req.headers.get('X-Session-ID')
    const sessionToken = req.headers.get('X-Session-Token')
    
    // If missing
    if (!sessionID || !sessionToken)
      return new Response(
        JSON.stringify({ err: "Missing session ID/Token" }),
        { status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    
    // Verify session ID/Token
    // const verifyReq = await env.SESSION.fetch(new Request(`${url.origin}/verify/${sessionID}/${sessionToken}`))
    // const verifyReq = await env.SESSION.fetch(req)
    // const verified = await verifyReq.text()
    const storedValue = await env.SESSION_STORE.get(sessionID)

    // Session token verified?
    if (storedValue !== sessionToken)
      return new Response(
        JSON.stringify({ err: "Session invalid or expired." }),
        { status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

    // Check the endpoint is valid
    if (url.pathname === "/website")
        return submitWebsiteFdbk(req, env)

    // Check the endpoint is valid
    if (url.pathname === "/onlineorder")
        return submitOrderFdbk(req, env)

    // Check the endpoint is valid
    if (url.pathname === "/instore")
        return submitStoreFdbk(req, env)

    // Check the endpoint is valid
    if (url.pathname === "/samples")
        return orderSamples(req, env)

    // Otherwise invalid endpoint
    return new Response(
      JSON.stringify({ err: "Invalid endpoint." }),
      { status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

  }
}
