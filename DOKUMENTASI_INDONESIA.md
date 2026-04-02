# 📚 Dokumentasi Sistem - Bahasa Indonesia

## 🎯 Apa Itu AI Placement Test?

**AI Placement Test** adalah aplikasi ujian online yang dirancang untuk:

- ✅ Mengukur pengetahuan Anda tentang Frontend Development
- ✅ Memberikan skor dan level kemampuan
- ✅ Mengeluarkan sertifikat digital

---

## 🔄 **Alur Sistem Kerja**

### **Fase 1: Pengisian Soal**

```
Pengguna membuka aplikasi
    ↓
Melihat 5 soal pilihan ganda
    ↓
Menjawab semua soal
    ↓
Klik tombol "Submit Test"
```

**Soal yang digunakan:**

1. ❓ HTML - "Apa singkatan HTML?"
   - Jawaban benar: "Hyper Text Markup Language"

2. ❓ JavaScript - "Framework JavaScript mana?"
   - Jawaban benar: "React"

3. ❓ CSS - "Tujuan CSS?"
   - Jawaban benar: "To style and layout web pages"

4. ❓ HTTP - "Method HTTP untuk ambil data?"
   - Jawaban benar: "GET"

5. ❓ TypeScript - "Apa itu TypeScript?"
   - Jawaban benar: "A superset of JavaScript with static typing"

---

### **Fase 2: Pengiriman Jawaban**

```
Klik "Submit Test"
    ↓
Aplikasi mengirim jawaban ke server (API POST)
    ↓
Server menyimpan jawaban dengan Task ID unik
    ↓
Menampilkan layar loading "Processing..."
```

**Data yang dikirim:**

```json
{
  "answers": {
    "q1": "Hyper Text Markup Language",
    "q2": "React",
    "q3": "To style and layout web pages",
    "q4": "GET",
    "q5": "A superset of JavaScript with static typing"
  }
}
```

---

### **Fase 3: Proses Evaluasi**

```
Server menerima jawaban
    ↓
Membandingkan dengan jawaban benar
    ↓
Menghitung jumlah jawaban yang benar
    ↓
Menghitung persentase skor (0-100%)
    ↓
Menentukan level berdasarkan skor
```

**Sistem Penilaian:**
| Jumlah Benar | Skor | Level | Deskripsi |
|---|---|---|---|
| 5/5 | 100% | 🚀 Advanced | Sempurna! |
| 4/5 | 80% | 📈 Intermediate | Sangat baik |
| 3/5 | 60% | 🌱 Beginner | Cukup |
| 2/5 | 40% | 🌱 Beginner | Perlu belajar |
| 1/5 | 20% | 🌱 Beginner | Perlu belajar lebih banyak |

---

### **Fase 4: Tampilan Hasil**

```
Layar loading selesai (2-5 detik)
    ↓
Menampilkan hasil:
  - ✅ Skor (%): Berapa persen jawaban benar
  - 🎖️ Level: Beginner / Intermediate / Advanced
  - 🎓 Sertifikat: Link download
  - 📊 Detail: Berapa soal yang benar (misal: 4/5)
    ↓
User bisa click "Take Another Test" untuk ulang
```

---

## 📊 **Contoh Hasil Skor**

### **Jika Jawab Semua Benar (5/5):**

```
Skor: 100%
Level: 🚀 Advanced
Pesan: "Test completed! You scored 100% and achieved advanced level. (5/5 correct)"
```

### **Jika Jawab 4 Benar (4/5):**

```
Skor: 80%
Level: 📈 Intermediate
Pesan: "Test completed! You scored 80% and achieved intermediate level. (4/5 correct)"
```

### **Jika Jawab 3 Benar (3/5):**

```
Skor: 60%
Level: 🌱 Beginner
Pesan: "Test completed! You scored 60% and achieved beginner level. (3/5 correct)"
```

---

## 🔧 **Cara Kerja Teknis**

### **Komponen Sistem:**

```
Frontend (User Interface)
├── TestContainer
│   ├── TestSubmissionForm (Tampilan soal)
│   └── ResultDisplay (Tampilan hasil)
│
Backend (API)
├── POST /api/placement-test/submit
│   → Menerima jawaban user
│   → Menyimpan jawaban
│   → Return taskId
│
└── GET /api/placement-test/result
    → Ambil jawaban user dari storage
    → Hitung skor berdasarkan jawaban benar
    → Return hasil
```

---

## 🎓 **Jawaban Benar Setiap Soal**

Mari kita lihat jawaban benar di file `lib/questions.ts`:

| Soal            | Jawaban Benar                               |
| --------------- | ------------------------------------------- |
| Q1 - HTML       | Hyper Text Markup Language                  |
| Q2 - Framework  | React                                       |
| Q3 - CSS        | To style and layout web pages               |
| Q4 - HTTP       | GET                                         |
| Q5 - TypeScript | A superset of JavaScript with static typing |

---

## ❌ **Mengapa Skor Tidak 100%?**

Kemungkinan Anda memilih jawaban yang **tidak cocok persis** dengan jawaban benar. Misalnya:

❌ **Salah:** "React" vs "React.js"
❌ **Salah:** "get" vs "GET" (berbeda besar-kecil huruf)
❌ **Salah:** "TypeScript is a superset..." vs "A superset of JavaScript..."

✅ **Benar:** Harus **PERSIS** dengan teks yang didefinisikan

---

## 🚀 **Coba Sekarang!**

### **Untuk mendapat 100% score:**

1. Jawab semua 5 soal dengan **benar**
2. Cocokkan dengan tabel jawaban di atas
3. Klik "Submit Test"
4. Lihat hasil Anda!

### **Testing Dengan Npm:**

```bash
npm run dev
# Buka http://localhost:3000
# Coba menjawab semuanya dengan benar
```

---

## 📚 **Kemampuan Sistem**

✅ **Real-time Scoring** - Skor dihitung saat ujian selesai
✅ **Instant Feedback** - Hasil langsung terlihat
✅ **Level Classification** - Pengelompokan level otomatis
✅ **Certificate Generation** - Sertifikat digital untuk download
✅ **Responsive Design** - Bisa diakses dari mobile/desktop
✅ **Multiple Attempts** - Bisa ujian berkali-kali

---

## 📞 **Butuh Bantuan?**

Jika skor Anda tidak sesuai:

1. Buka browser Developer Tools (F12)
2. Lihat tab Console
3. Lihat hasil API: Request dan Response
4. Bandingkan jawaban Anda dengan tabel di atas

---

**Selamat mencoba dan Good Luck! 🍀**
