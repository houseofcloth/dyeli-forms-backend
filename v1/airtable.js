import { corsHeaders, checkOrigin } from "./cors"

//
// Send to Airtable
//
/**
 * 
 * @param {Object} opts 
 * @param {Object} body 
 * @returns 
 */
const createAirtableRecord = async (body, opts) => {
  const allowedOrigin = checkOrigin(opts.origin)
  try {
    const areq = await fetch(`https://api.airtable.com/v0/${opts.baseID}/${encodeURIComponent(opts.table)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        'Content-Type': `application/json`
      }
    })
    const res = await areq.json()
    return new Response(
      JSON.stringify({ res }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(allowedOrigin)
        }
      }
    )
  } catch(err) {
    return new Response(
      JSON.stringify({ err: "Error submitting data" }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(allowedOrigin)
        }
      }
    )
  }
}

/**
 * Samples order form
 * @param {Request} req 
 * @param {Object} opts 
 * @returns 
 */
 export async function orderSamples(req, opts) {
  try {
    const body = await req.formData()
    const obj = Object.fromEntries(body)
    // Map fields
    const reqBody = {
      fields: {
        "Name": obj.first_name.concat(' ', obj.last_name),
        "Date": new Date().toISOString(),
        "Email": obj.email,
        "Phone": obj.phone,
        "Notes": obj.notes,
        "Street": obj.street,
        "Suburb": obj.suburb,
        "State": obj.state,
        "Postcode": Number(obj.postcode),
        "Fabric 1": obj.fabric1,
        "Fabric 2": obj.fabric2,
        "Fabric 3": obj.fabric3,
        "Fabric 4": obj.fabric4,
        "Fabric 5": obj.fabric5,
        // Default Status
        "Status": "New",
      }
    }
    return await createAirtableRecord(reqBody, opts)
  } catch(e) {
    
    // If this happens, the wrong data was sent, hence the 400 status.
    return new Response(
      JSON.stringify( { err: e.message || e.toString() } ),
      { status: 400 }
    )
  }
}

/**
 * Website feedback form
 * @param {Request} req 
 * @param {Object} opts 
 * @returns 
 */
 export async function submitWebsiteFdbk(req, opts) {
  try {
    const body = await req.formData()
    const obj = Object.fromEntries(body)
    // Map fields
    const reqBody = {
      fields: {
        "Name": obj.first_name.concat(' ', obj.last_name),
        "Date": new Date().toISOString(),
        "Email": obj.email,
        "Phone": obj.phone,
        "Image Quality": Number(obj.imgqlty),
        "Navigation": Number(obj.sitenav),
        "Design": Number(obj.sitedsgn),
        "Speed": Number(obj.sitespd),
        "Feedback": obj.feedback,
        "Status": "New",
      }
    }
    return await createAirtableRecord(reqBody, opts)
  } catch(e) {
    
    // If this happens, the wrong data was sent, hence the 400 status.
    return new Response(
      JSON.stringify( { err: e.message || e.toString() } ),
      { status: 400 }
    )
  }
}

/**
 * Online order feedback form
 * @param {Request} req 
 * @param {Object} opts 
 * @returns 
 */
export async function submitOrderFdbk(req, opts) {
  try {
    const body = await req.formData()
    const obj = Object.fromEntries(body)
    // Map fields
    const reqBody = {
      fields: {
        "Name": obj.first_name.concat(' ',obj.last_name),
        "Date": new Date().toISOString(),
        "Email": obj.email,
        "Phone": obj.phone,
        "Checkout Experience": Number(obj.chkexp),
        "Website Usability": Number(obj.eofu),
        "Image Quality": Number(obj.imgqlty),
        "Pricing": Number(obj.prices),
        "Payment Options": Number(obj.payopts),
        "Delivery Options": Number(obj.delopt),
        "Delivery Time": Number(obj.deltime),
        "Notifications": Number(obj.notifs),
        "Notes": obj.feedback,
        "Status": "New"
      }
    }
    return await createAirtableRecord(reqBody, opts)
  } catch(e) {
    
    // If this happens, the wrong data was sent, hence the 400 status.
    return new Response(
      JSON.stringify( { err: e.message || e.toString() } ),
      { status: 400 }
    )
  }
}

/**
 * In-store feedback form
 * @param {Request} req 
 * @param {Object} opts 
 * @returns 
 */
export async function submitStoreFdbk(req, opts) {
  try {
    const body = await req.formData()
    const obj = Object.fromEntries(body)
    // Map fields
    const reqBody = {
      fields: {
        "Name": obj.first_name.concat(' ',obj.last_name),
        "Date": new Date().toISOString(),
        "Email": obj.email,
        "Phone": obj.phone,
        "Customer Service": Number(obj.custsrv),
        "Atmosphere": Number(obj.atmos),
        "Shop Layout": Number(obj.shopdsgn),
        "Product Knowledge": Number(obj.prodknow),
        "Product Range": Number(obj.prodrng),
        "Prices": Number(obj.prices),
        "Feedback": obj.feedback,
        "Status": "New",
      }
    }
    return await createAirtableRecord(reqBody, opts)
  } catch(e) {
    
    // If this happens, the wrong data was sent, hence the 400 status.
    return new Response(
      JSON.stringify( { err: e.message || e.toString() } ),
      { status: 400 }
    )
  }
}
