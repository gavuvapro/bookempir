import { auth } from "@/auth"
import { CheckoutClient } from "./checkout-client"
export default async function CheckoutPage(){
  const session = await auth()
  return (
    <div className="container py-16">
      <h1 className="font-display text-4xl mb-8">Checkout</h1>
      <CheckoutClient email={session?.user?.email || ""} />
    </div>
  )
}
