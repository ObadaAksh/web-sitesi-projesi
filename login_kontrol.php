<?php
$email = $_POST['user_email'] ?? '';
$sifre = $_POST['user_password'] ?? '';

// E-posta parçalama
$parcalar = explode('@', $email);
$ogrenci_no = $parcalar[0]; // b251210582 kısmı
$domain = isset($parcalar[1]) ? $parcalar[1] : '';

// PDF Kriterleri Kontrolü
$b_ile_basliyor = (strpos($ogrenci_no, 'b') === 0); 
$domain_dogru = ($domain === "sakarya.edu.tr"); 
$bos_degil = (!empty($email) && !empty($sifre)); 

if ($bos_degil && $domain_dogru && $b_ile_basliyor && $sifre === $ogrenci_no) {
    
    // BAŞARILI 
    header("Refresh: 3; url=index.html");
    
    //Bootstrap tasarımı 
    echo '<!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
        <title>Giriş Başarılı</title>
    </head>
    <body class="bg-light d-flex align-items-center justify-content-center" style="height: 100vh;">
        <div class="card shadow-lg border-0 text-center p-5 rounded-4" style="max-width: 500px;">
            <div class="card-body">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem;"></i>
                <h1 class="mt-4 text-dark fw-bold">Hoşgeldiniz!</h1>
                <h2 class="h4 text-primary mt-2">' . htmlspecialchars($ogrenci_no) . '</h2>
                <p class="text-muted mt-4">Güvenli bir şekilde giriş yaptınız. Ana sayfaya yönlendiriliyorsunuz...</p>
                <div class="spinner-border text-success mt-3" role="status">
                    <span class="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        </div>
    </body>
    </html>';

} 
elseif($bos_degil === false)
{
    echo "<script>
            alert('HATA!! Lütfen Boş Alanları Doldurunuz. ');
            window.location.href='login.html';
          </script>";
    exit();
}

elseif($domain_dogru === false || $b_ile_basliyor === false){
    // HATALI 
    echo "<script>
            alert('HATA!! Geçersiz E-posta.');
            window.location.href='login.html';
          </script>";
    exit();
}
elseif($sifre !== $ogrenci_no)
{
    echo "<script>
            alert('HATA!! E-posta ve Şifre Uyumlu Değil. ');
            window.location.href='login.html';
          </script>";
    exit();
}
?>