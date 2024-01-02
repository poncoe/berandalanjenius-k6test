import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 5, // 5 pengguna virtual
  duration: '30s', // Durasi pengujian
};

export default function () {
  let res = http.get('https://berandalanjenius.com/api/sample-endpoint');
  check(res, {
    'API response status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary-apitest.html": htmlReport(data),
  };
}