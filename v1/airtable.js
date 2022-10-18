import { corsHeaders, checkOrigin } from "./cors"

//
// Send to Airtable
//
const createAirtableRecord = async (req, env, table, body) => {
  const allowedOrigin = checkOrigin(req)
  try {
    const areq = await fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
        'Content-type': `application/json`
      }
    })
    console.log(areq)
    const res = await areq.json()
    return new Response(
      JSON.stringify([true, { res }]), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(allowedOrigin)
        }
      }
    );
  } catch(err) {
    return new Response(
      JSON.stringify([false, { err: {msg: "Error submitting data"} }]), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(allowedOrigin)
        }
      }
    );
  }
}

// Samples order form
export async function orderSamples(req, env) {
  const body = await req.formData();
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
  };
  return await createAirtableRecord(req, env, "Samples Orders", reqBody);
}

// Website feedback form
export async function submitWebsiteFdbk(req, env) {
  const body = await req.formData();
  const obj = Object.fromEntries(body);
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
  };
  return await createAirtableRecord(req, env, 'Website Feedback', reqBody);
}

// Online order feedback form
export async function submitOrderFdbk(req, env) {
  const body = await req.formData();
  const obj = Object.fromEntries(body);
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
  };
  return await createAirtableRecord(req, env, 'Online Order Feedback', reqBody);
}

// In-store feedback form
export async function submitStoreFdbk(req, env) {
  const body = await req.formData();
  const obj = Object.fromEntries(body);
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
  };
  return await createAirtableRecord(req, env, "In-store Feedback", reqBody);
}

// TFQ Contact Form
export async function submitTFQContact(req, env) {
  const body = await req.formData()
  const formData = Object.fromEntries(body)
  const reqBody = {
    fields: {
      "Name": formData.name,
      "Date": new Date().toISOString(),
      "Email": formData.email,
      "Message": formData.msg,
    }
  }
  return await createAirtableRecord(req, env, "TFQ Contact", reqBody)
}
