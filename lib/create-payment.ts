import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: Props) {
    const { data } = await axios.post<PaymentData>(
        'https://api.yookassa.ru/v3/payments',
        {
            amount: {
                value: String(details.amount),
                currency: 'RUB',
            },
            capture: true,
            metadata: {
                order_id: details.orderId,
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.HOME_PAGE,
            },
            description: details.description,
        },
        {
            auth: {
                username: process.env.YOOKASSA_SHOP_ID as string,
                password: process.env.YOOKASSA_API_KEY as string,
            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7),
            },
        },
    );

    return data;
}
