import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '3m', target: 1 }, // Tingkatkan hingga 1 pengguna dalam 3 menit
    { duration: '3m', target: 10 }, // Tingkatkan hingga 10 pengguna dalam 3 menit
    { duration: '3m', target: 20 }, // Tingkatkan hingga 20 pengguna dalam 3 menit
    { duration: '3m', target: 30 }, // Tingkatkan hingga 30 pengguna dalam 3 menit
    // Menambahkan tantangan lebih jika dibutuhkan untuk pengujian beban yang lebih tinggi
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'], // Waktu respons persentil ke-95 harus di bawah 500 ms
    'http_req_failed': ['rate<0.1'], // Tingkat kesalahan harus kurang dari 10%
  },
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
    "summary-breakpointtest.html": htmlReport(data),
  };
}