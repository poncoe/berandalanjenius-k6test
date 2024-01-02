import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Tingkatkan hingga 10 pengguna dalam 1 menit
    { duration: '30m', target: 10 }, // Tetap di 10 pengguna selama 30 menit
    { duration: '1m', target: 0 }, // Turunkan hingga 0 pengguna dalam 1 menit
  ],
};

export default function () {
  let res = http.get('https://berandalanjenius.com');
  check(res, {
    'Situs Berhasil Dimuat': (r) => r.status === 200,
  });
  sleep(5);
}

export function handleSummary(data) {
  return {
    "summary-soaktest.html": htmlReport(data),
  };
}