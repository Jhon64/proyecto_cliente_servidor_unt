import { Router, Request, Response } from "express"
import crypto from "crypto"
import squareConnect from "square-connect"
const router = Router()

router.post("/pagarServicio", async (req: Request, res: Response) => {
    const request_params = req.body;
    const { monto } = req.body
    // length of idempotency_key should be less than 45
    const idempotency_key = crypto.randomBytes(22).toString("hex");

    // Charge the customer's card
    const payments_api = new squareConnect.PaymentsApi();
    const request_body = {
        source_id: request_params.nonce,
        amount_money: {
            amount: monto * 100, // $1.00 charge
            currency: "USD",
        },
        idempotency_key: idempotency_key,
    };

    try {
        //@ts-ignore
        const response = await payments_api.createPayment(request_body);
        console.log(response);
        res.status(200).json({
            title: "Payment Successful",
            result: response,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            title: "Payment Failure",
            result: error.response.text,
        });
    }
})

export default router
