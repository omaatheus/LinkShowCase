import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import { trackServerEvent } from "@/app/lib/mixpanel";
import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {metadata, typeSubscription} = await req.json();

    if (typeSubscription === "monthly"){
      var price = process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
    //} if (typeSubscription === "quarterly"){
     // var price = process.env.STRIPE_QUARTERLY_SUBSCRIPTION_PRICE_ID
    } if (typeSubscription === "annually"){
      var price = process.env.STRIPE_ANNUALLY_SUBSCRIPTION_PRICE_ID
    }
    

    const userSession = await auth();

    if (!userSession || !userSession.user?.id || !userSession.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const userId = userSession.user?.id;
    const userEmail = userSession.user?.email;
    const userName = userSession.user?.name;
  
    const userRef = db.collection("users").doc(userId || "");
    const userDoc = await userRef.get();
  
    let customerId;
  
    if (userDoc.exists) {
      customerId = userDoc.data()?.customerId;
    }
  
    if (!customerId) {
      const newCustomer = await stripe.customers.create({
        email: userEmail,
        name: userName || "Sem nome",
        metadata: {
          userId: userId,
        },
      });
  
      customerId = newCustomer.id;
  
      await userRef.update({
        customerId,
      });
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [{
            price: price,
            quantity: 1,
        }],
        payment_method_types: typeSubscription ? ["card"] : ["card"],
        mode: "subscription",
        success_url: `${req.headers.get("origin")}/${metadata.profileId}`,
        cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`,
        client_reference_id: userId,
        metadata,
    })


    trackServerEvent("checkout_created", {
      userId,
      price,
      typeSubscription
    })

    return NextResponse.json({
        sessionId: session.id
    })
}