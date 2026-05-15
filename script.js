//login sayfasi
function formKontrolu() {
    
    var email = document.getElementById("emailInput").value; 
    var sifre = document.getElementById("sifrePassword").value;
    
    //e posta matematiksel tanimi
    var emailKontrolu = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Boş Alan Kontrolu
    if (email === "" || sifre === "") {
        alert("E-posta veya şifre alanları boş bırakılamaz!");
        return false; 
    }

    //E-posta Kontrolu
    if (!emailKontrolu.test(email)) {
        alert("Lütfen geçerli bir e-posta formatı giriniz!");
        return false; 
    }

    //hersey dogru ise true dondurerek girise izin verilir
    return true; 
}







//iletisim icin
function jsKontrolu() {
   
    var ad = document.getElementById("adSoyad").value;
    var email = document.getElementById("e-posta").value;
    var tel = document.getElementById("iletisimTel").value;
    var sehir = document.getElementById("sehir").value;
    var mesaj = document.getElementById("mesajTextarea").value;

    var emailkontrolu2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //bos alan kontrolu
    if (ad === "" || email === "" || tel === "" || sehir === "" || mesaj === "") {
        alert("Lütfen tüm alanları (Ad, Email, Tel, Şehir, Mesaj) doldurunuz!");
        return false; // Hata varsa burada dur, aşağıya geçme.
    }

   
    if (!emailkontrolu2.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi yazınız!");
        return false;
    }

    // Telefon İçin Sadece Rakam Kontrolu
    if (isNaN(tel)) {
        alert("Telefon numarası sadece rakamlardan oluşmalıdır!");
        return false;
    }

    if (tel.length !== 11) {
        alert("Telefon numarası 11 hane olmalıdır! (Örn: 05xxxxxxxxx)");
        return false;
    }

    if (!tel.startsWith("05")) {
        alert("Telefon numarası '05' ile başlamalıdır!");
        return false;
    }

    
    alert("Native JS Başarılı: Form verileri sunucuya gönderiliyor...");
    document.getElementById("mainForm").submit(); // Formu PHP'ye yolla.
}






document.addEventListener("DOMContentLoaded", function() {
    
    const filmAlani = document.getElementById("filmlerCanliTablo");

    if (filmAlani) {
        const apiKey = "a0103eb40e5379b09917b9c5ab550892";
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-TR&page=1`;

        // fetch ile TMDB sunucusuna istek atıyoruz
        fetch(url)
            .then(response => {
                // Eğer cevap olumlu değilse hataya düşür
                if (!response.ok) throw new Error('API isteği başarısız');
                return response.json();
            })
            .then(data => {
                // Spinner "Yükleniyor" yazısını temizliyoruz
                filmAlani.innerHTML = ""; 

                const filmler = data.results.slice(0, 9);

                filmler.forEach(film => {
                    //kart yapısını oluşturyoz
                    filmAlani.innerHTML += `
                        <div class="col">
                            <div class="card h-100 shadow-sm border-0">
                                <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="${film.title}">
                                <div class="card-body">
                                    <h6 class="card-title fw-bold">${film.title}</h6>
                                    <p class="card-text small text-muted">
                                        <i class="bi bi-star-fill text-warning"></i> ${film.vote_average}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => {
                // Bir hata olursa kullanıcıya bilgi veriyoruz
                filmAlani.innerHTML = `
                    <div class="col-12 text-center text-danger py-4">
                        <i class="bi bi-exclamation-triangle display-4"></i>
                        <p class="mt-2">Filmler şu an yüklenemedi. Lütfen daha sonra deneyiniz.</p>
                    </div>`;
                console.error("Hata:", error);
            });
    }
});







// Vue uygulamasını oluşturuyoz
const { createApp } = Vue;

createApp({
  data() {
    return {
      form: {
        ad: '',
        email: '',
        tel: '',
        sehir: '',
        mesaj: '',
        cinsiyet:''
      }
    }
  },
  methods: {
    validateVue() {
      // Boş alan kontrolu
      if (!this.form.ad || !this.form.email || !this.form.tel || !this.form.mesaj || !this.form.cinsiyet) {
        alert("Lütfen tüm alanları doldurun!");
        return;
      }

      //Email format kontrolu
      const emailKurali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailKurali.test(this.form.email)) {
        alert("Vue.js Mesajı: Geçersiz e-posta!");
        return;
      }

    if (isNaN(this.form.tel) || this.form.tel.length !== 11 || !this.form.tel.startsWith("05")) {
        alert("Telefon numarası 11 haneli olmalı ve '05' ile başlamalıdır!");
        return;
    }

      // Her şey doğruysa
      alert("Vue.js Denetimi Başarılı! Form gönderiliyor...");
      // Formu gönder
      document.getElementById("mainForm").submit();
    }
  }
}).mount('#iletisimFormu'); 





