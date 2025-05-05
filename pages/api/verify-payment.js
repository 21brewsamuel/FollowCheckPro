import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ paid: false, message: 'Missing session ID' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    // Check if payment was successful
    const paid = session.payment_status === 'paid';
    
    return res.status(200).json({ paid });
  } catch (error) {
    console.error('Stripe verification error:', error);
    return res.status(500).json({ paid: false, message: 'Error verifying payment' });
  }
}
