/**
 * Worker for handling for submissions for House of Cloth.
 */

// Import Airtable functions
import {
  submitOrderFdbk,
  submitStoreFdbk,
  submitWebsiteFdbk,
  orderSamples
} from "./v1/airtable"
import { parse } from 'cookie'

//
export default {
  async fetch(req, env) {

    const url = new URL(req.url)

    // Get session ID/Token
    const cookie = parse(req.headers.get('Cookie') || '')
    const sessionID = cookie['ssID']
    const sessionToken = cookie['ssTkn']
    
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

    const airtableSecrets = {
      baseID: env.AIRTABLE_BASE_ID,
      apiKey: env.AIRTABLE_API_KEY,
      origin: req.headers.get('origin'),
    }

    // Website feedback
    if (url.pathname === "/website")
      return submitWebsiteFdbk(req, {
        ...airtableSecrets,
        table: env.WEB_FEEDB_TABLE,
      })

    // Online order feedback
    if (url.pathname === "/onlineorder")
      return submitOrderFdbk(req, {
        ...airtableSecrets,
        table: env.ONLINE_FEEDB_TABLE,
      })

    // Instore Feedback
    if (url.pathname === "/instore")
      return submitStoreFdbk(req, {
        ...airtableSecrets,
        table: env.STORE_FEEDB_TABLE
      })

    // Order Samples
    if (url.pathname === "/samples")
      return orderSamples(req, {
        ...airtableSecrets,
        table: env.SAMPLES_TABLE
      })

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
