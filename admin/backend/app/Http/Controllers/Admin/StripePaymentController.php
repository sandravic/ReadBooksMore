<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StripePaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $amount = $request->input('amount');
        $currency = $request->input('currency', 'gbp'); // Default to USD, change as needed

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $amount,
                'currency' => $currency,
            ]);

            return response()->json(['clientSecret' => $paymentIntent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
