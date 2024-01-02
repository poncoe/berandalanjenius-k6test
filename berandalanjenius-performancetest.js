import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 10, // Jumlah pengguna virtual
  duration: '30s', // Durasi pengujian
};

export default function () {
  // Buka situs yang ingin diuji
  let res = http.get('https://berandalanjenius.com');

  // Cek, apakah situs berhasil ditampilkan
  check(res, {
    'Situs berhasil dimuat': (r) => r.status === 200,
  });

  // Simulasi prilaku pengguna, seperti click link, isi form dll
  // contoh, Klik halaman Story So Far
  http.get('https://berandalanjenius.com/stories/');

  // Tambahkan waktu sleep untuk mengsimulasikan user tetap berada pada halaman tersebut
  sleep(5); // Sleep untuk 5 detik sebelum aksi selanjutnya
}

export function handleSummary(data) {
  return {
    "summary-perfomancetest.html": htmlReport(data),
  };
}