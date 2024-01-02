import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '1m', target: 5 }, // Tingkatkan hingga 5 pengguna dalam 1 menit
    { duration: '3m', target: 5 }, // Tetap di 5 pengguna selama 3 menit
    { duration: '1m', target: 0 }, // Tingkatkan hingga 0 pengguna dalam 1 menit
  ],
};

export default function () {
  let res = http.get('https://berandalanjenius.com');
  check(res, {
    'Situs berhasil dimuat': (r) => r.status === 200,
  });
  sleep(3);
}

export function handleSummary(data) {
  return {
    "summary-loadtest.html": htmlReport(data),
  };
}