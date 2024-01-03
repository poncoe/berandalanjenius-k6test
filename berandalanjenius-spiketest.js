import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Tingkatkan hingga 10 pengguna dalam 1 menit
    { duration: '3m', target: 10 }, // Pertahankan pada 10 pengguna selama 3 menit
    { duration: '1m', target: 0 }, // Turunkan hingga 0 pengguna dalam 1 menit
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
    "summary-spiketest.html": htmlReport(data),
  };
}