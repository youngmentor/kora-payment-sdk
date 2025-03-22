# Kora Payment SDK

A JavaScript SDK for integrating with Kora's Checkout Standard payment gateway.

## Installation

```bash
npm install kora-payment-sdk
# or
yarn add kora-payment-sdk
```

## Usage

### ES Modules

```javascript
import KoraPayment from 'kora-payment-sdk';

// Create a new instance
const koraPayment = new KoraPayment();

// Initialize payment
koraPayment.initialize({
  key: "pk_test_xxxxxxxxxxxxxxxxx",  // Replace with your public key
  reference: "your-unique-reference", // Unique for each transaction
  amount: 22000, 
  currency: "NGN",
  customer: {
    name: "John Doe",
    email: "john@example.com"
  },
  onClose: function() {
    console.log("Payment modal closed");
  },
  onSuccess: function(data) {
    console.log("Payment successful", data);
  },
  onFailed: function(data) {
    console.log("Payment failed", data);
  }
});
```

### CommonJS

```javascript
const { KoraPayment } = require('kora-payment-sdk');

// Create a new instance
const koraPayment = new KoraPayment();

// Initialize payment
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

### Browser (UMD)

```html
<script src="https://unpkg.com/kora-payment-sdk/dist/index.js"></script>
<script>
  // Global variable KoraPayment is available
  const payment = new KoraPayment();
  
  function payWithKora() {
    payment.initialize({
      key: "pk_test_xxxxxxxxxxxxxxxxx",  // Replace with your public key
      reference: "your-unique-reference", // Unique for each transaction
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

## API Reference

### Constructor

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
  key: "pk_test_xxxxxxxxxxxxxxxxx",
  reference: "your-unique-reference",
  amount: 22000,
  currency: "NGN",
  customer: {
    name: "John Doe",
    email: "john@example.com"
  },
  notification_url: "https://example.com/webhook",
  onSuccess: function(data) {
    console.log("Payment successful", data);
  }
});
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