import { BCryptAdapter } from "../index";

export function bCryptAdapterFactory(): BCryptAdapter {
  return BCryptAdapter.getInstance();
}
