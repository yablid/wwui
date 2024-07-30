// src/api/interceptors/debouncer.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

const DEBOUNCE_TIME = 200;

interface PendingRequest {
  config: string,
  timerId: NodeJS.Timeout
}

let pendingRequest: PendingRequest | null = null;

const debouncer = async (config: InternalAxiosRequestConfig) => {
  console.log("Using debounce interceptor...");

  if (pendingRequest && pendingRequest.config === JSON.stringify(config)) {
    console.log("Debouncing request");
    throw new axios.Cancel('Debounced');
  }

  const requestPromise = new Promise<InternalAxiosRequestConfig>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(config);
      pendingRequest = null;
    }, DEBOUNCE_TIME);

    pendingRequest = { config: JSON.stringify(config), timerId };
    console.log("Debounce interceptor request: ", pendingRequest);
  });

  console.log("Debounce interceptor returning request promise...");
  return requestPromise;
};

export default debouncer;
