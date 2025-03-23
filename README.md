# Kora Checkout

A JavaScript SDK for integrating with Kora's Checkout Standard payment gateway.

## Installation

```bash
npm install kora-checkout
# or
yarn add kora-checkout
```

## Usage

### React + TypeScript Example

```tsx
import KoraPayment, { KoraPaymentOptions } from 'kora-checkout';

const handlePayment = () => {
    const paymentOptions: KoraPaymentOptions = {
        key: "pk_test_***********************",
        reference: `ref-${Date.now()}`,
        amount: 5000, // Example amount
        customer: {
            name: "Jane Doe",
            email: "jane@example.com"
        },
        onSuccess: () => {
            console.log('Payment successful');
        },
        onFailed: (err: { message: string }) => {
            console.error(err.message);
        }
    };

    const payment = new KoraPayment();
    payment.initialize(paymentOptions);
};

return (
    <button onClick={handlePayment} className="bg-green-500 text-white p-3 rounded">
        Pay with Kora
    </button>
);
```

### API Reference

#### Constructor

```javascript
const koraPayment = new KoraPayment(config);
```

#### Parameters:

- `config` (optional): Default configuration options that will be used for all payment initializations.

### Methods

#### initialize(options)

Initializes the payment gateway with the provided options.

```javascript
koraPayment.initialize({
  key: "pk_test_xxxxxxxxxxxxxxxxx",  // Replace with your public key
  reference: "your-unique-reference", // Unique for each transaction
  amount: 22000, 
  currency: "NGN",
  customer: {
    name: "John Doe",
    email: "john@example.com"
  }
});
```

### CommonJS

```javascript
const { KoraPayment } = require('kora-checkout');
const koraPayment = new KoraPayment();

koraPayment.initialize({
  key: "pk_test_xxxxxxxxxxxxxxxxx",  
  reference: "your-unique-reference",
  amount: 22000, 
  currency: "NGN",
  customer: {
    name: "John Doe",
    email: "john@example.com"
  }
});
```

### Browser (UMD)

```html
<script src="https://unpkg.com/kora-checkout/dist/index.js"></script>
<script>
  const payment = new KoraPayment();
  function payWithKora() {
    payment.initialize({
      key: "pk_test_xxxxxxxxxxxxxxxxx",
      reference: "your-unique-reference",
      amount: 22000, 
      currency: "NGN",
      customer: {
        name: "John Doe",
        email: "john@example.com"
      }
    });
  }
</script>

<button onclick="payWithKora()">Pay Now</button>
```


```
##### Required Options:

- `key`: Your public key from Korapay
- `reference`: Your unique transaction reference
- `amount`: Amount to be collected
- `customer`: Object containing customer details
  - `customer.name`: Customer name
  - `customer.email`: Customer email address

##### Optional Options:

- `currency`: Currency of the charge (default: "NGN")
- `notification_url`: HTTPS endpoint for webhook notifications
- `narration`: Information about the transaction
- `channels`: Methods of payment (e.g., ["bank_transfer", "card"])
- `default_channel`: Method of payment active by default
- `metadata`: Custom data to include with transaction (max 5 fields)
- `containerId`: ID of HTML element to contain the payment gateway
- `onClose`: Function called when payment gateway is closed
- `onSuccess`: Function called when payment is successful
- `onFailed`: Function called when payment fails
- `onTokenized`: Function called when card tokenization is successful
- `onPending`: Function called for pending bank transfers
- `merchant_bears_cost`: Boolean indicating who bears transaction fees

#### close()

Closes the payment modal programmatically.

```javascript
koraPayment.close();
```

## License

MIT

![Kora Checkout Logo](https://raw.githubusercontent.com/youngmentor/kora-payment-sdk/main/koralogo.svg)
