import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '2m', target: 20 }, // Tingkatkan hingga 20 pengguna dalam 2 menit
    { duration: '5m', target: 20 }, // Tetap di 20 pengguna selama 5 menit
    { duration: '2m', target: 0 }, // Turunkan hingga 0 pengguna dalam 2 menit
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'], // Waktu respons persentil ke-95 harus di bawah 500 ms
    'http_req_failed': ['rate<0.1'], // Tingkat kesalahan harus kurang dari 10%
  },
};

export default function () {
  let res = http.get('https://berandalanjenius.com');
  check(res, {
    'Situs Berhasil Dimuat': (r) => r.status === 200,
  });
  sleep(3);
}

export function handleSummary(data) {
  return {
    "summary-stresstest.html": htmlReport(data),
  };
}
