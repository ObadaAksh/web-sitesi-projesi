<?php
if ($_POST) {
    // Verileri güvenli bir şekilde alalım
    $ad = $_POST['ad'] ?? 'Belirtilmedi';
    $email = $_POST['email'] ?? 'Belirtilmedi';
    $tel = $_POST['iletisim'] ?? 'Belirtilmedi';
    $cinsiyet = $_POST['cinsiyet'] ?? 'Belirtilmedi';
    $sehir = $_POST['Sehir'] ?? 'Belirtilmedi';
    $mesaj = $_POST['mesaj'] ?? 'Belirtilmedi';

    // Checkboxlar (Dizi olarak gelebilir)
    $ilgiler = [];
    if(isset($_POST['spor'])) $ilgiler[] = "Spor";
    if(isset($_POST['yazilim'])) $ilgiler[] = "Yazılım";
    if(isset($_POST['kitapOkumak'])) $ilgiler[] = "Kitap Okumak";

    echo "<h1>Gönderilen Form Bilgileri</h1>";
    echo "<hr>";
    echo "<b>Ad Soyad:</b> " . htmlspecialchars($ad) . "<br>";
    echo "<b>E-posta:</b> " . htmlspecialchars($email) . "<br>";
    echo "<b>Telefon:</b> " . htmlspecialchars($tel) . "<br>";
    echo "<b>Cinsiyet:</b> " . $cinsiyet . "<br>";
    echo "<b>Şehir:</b> " . $sehir . "<br>";
    echo "<b>İlgi Alanları:</b> " . (empty($ilgiler) ? "Seçilmedi" : implode(", ", $ilgiler)) . "<br>";
    echo "<b>Mesaj:</b> " . nl2br(htmlspecialchars($mesaj)) . "<br>";
    
    echo "<br><a href='iletisim.html'>Geri Dön</a>";
} else {
    echo "Bu sayfaya doğrudan erişim yok.";
}
?>