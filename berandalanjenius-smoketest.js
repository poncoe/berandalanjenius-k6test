import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 5, // 5 pengguna virtual
  duration: '1m', // Durasi pengujian
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
  // Tambahkan lebih banyak pemeriksaan penting atau tindakan pengguna sesuai kebutuhan
  sleep(3);
}

export function handleSummary(data) {
  return {
    "summary-smoketest.html": htmlReport(data),
  };
}
