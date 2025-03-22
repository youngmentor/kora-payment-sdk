/**
 * Kora Payment SDK
 * A wrapper for Kora's Checkout Standard payment gateway
 */

import KoraPayment from './src/koraPayment';

export default KoraPayment;

export { KoraPayment };

export function createKoraPayment(config = {}) {
  return new KoraPayment(config);
}