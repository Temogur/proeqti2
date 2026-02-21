const API_BASE = "https://api.everrest.educata.dev";

const token = localStorage.getItem("token");
console.log("Token found:", token ? "YES" : "NO");

if (!token) {
  console.log("No token, redirecting to login...");
  window.location.href = "login.html";
}

const LOCAL_PRODUCTS_DETAILS = [
  {
    name: "Apple iPhone 17 Pro",
    price: 4059,
    rating: 4.8,
    stock: 25,
    brand: "Apple",
    category: "Smartphones",
    image:
      "https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2F25bed6a5-27cc-435d-b4ff-579e9c3048a9_Thumb.jpeg&w=640&q=100",
    description:
      "Apple iPhone 17 Pro - ყველაზე მძლავრი iPhone რომელიც ოდესმე შეიქმნა. აღჭურვილია რევოლუციური A19 Bionic ჩიპით 3nm+ ტექნოლოგიით, რომელიც უზრუნველყოფს 40% უკეთეს მუშაობას წინა თაობასთან შედარებით.<br><br><strong>ეკრანი:</strong> 6.3 ინჩიანი ProMotion LTPO OLED, 120Hz განახლების სიხშირე, 2000 nits სიკაშკაშე, Always-On Display, HDR10+, Dolby Vision<br><br><strong>კამერა სისტემა:</strong> 48MP მთავარი (f/1.6), 48MP ულტრა-wide (f/2.2), 12MP 5x ოპტიკური zoom ტელეფოტო. ახალი Photonic Engine ტექნოლოგია საუკეთესო ღამის სურათებისთვის. 8K ვიდეო ჩაწერა 60fps, ProRes, Cinematic Mode, Action Mode სტაბილიზაციით.<br><br><strong>მეხსიერება:</strong> 256GB / 512GB / 1TB NVMe ტიპის შიდა მეხსიერება, 8GB RAM<br><br><strong>ბატარეა და დამუხტვა:</strong> 3600mAh, 30W მავთულიანი დამუხტვა (50% 30 წუთში), 25W MagSafe უკაბელო დამუხტვა, 15W Qi2 მხარდაჭერა<br><br><strong>დამატებითი:</strong> Titanium კორპუსი (აეროსივრცის ხარისხის), IP68 წყალგამძლეობა, Face ID, 5G, Wi-Fi 7, USB-C 3.2 Gen 2 (10Gbps), Ceramic Shield დაცვა, Action Button, Dynamic Island",
    release_date: "2025-01-15",
  },
  {
    name: "Apple iPhone 17 Pro Max",
    price: 4760,
    rating: 4.9,
    stock: 20,
    brand: "Apple",
    category: "Smartphones",
    image:
      "https://prod-cdn.prod.asbis.io/s3size/el:t/rt:fill/w:900/plain/s3://cms/product/2d/22/2d22e5e521d6491cf0dd8c0c8a47f2eb/250915140013863146.webp",
    description:
      'Apple iPhone 17 Pro Max - უდიდესი და ყველაზე მძლავრი iPhone ოდესმე. შექმნილია მაქსიმალური მუშაობისთვის.<br><br><strong>ეკრანი:</strong> 6.9 ინჩიანი ProMotion LTPO OLED, 120Hz, 2500 nits პიკ სიკაშკაშე, Always-On Display, HDR10+, Dolby Vision, ულტრა-თხელი ჩარჩოები<br><br><strong>კამერა სისტემა:</strong> გაუმჯობესებული 48MP მთავარი სენსორი (1/1.14"), 48MP ულტრა-wide, 12MP 5x პერისკოპ ტელეფოტო, LiDAR სკანერი. თეტრა-პრიზმა დიზაინი, 3D სენსორული ჩანაცვლება, 8K ProRes ვიდეო, Spatial Video ჩაწერა Vision Pro-სთვის.<br><br><strong>მეხსიერება:</strong> 256GB / 512GB / 1TB / 2TB NVMe, 8GB RAM LPDDR5X<br><br><strong>ბატარეა:</strong> 4685mAh (საუკეთესო iPhone ბატარეა ოდესმე) - 33 საათი ვიდეო ჩართვა, 35W სწრაფი დამუხტვა (50% 25 წუთში), 30W MagSafe, 20W Qi2<br><br><strong>მახასიათებლები:</strong> Grade 5 Titanium კორპუსი, IP68 წყლისა და მტვრის დაცვა, Crash Detection, Emergency SOS via Satellite, 5G mmWave, Wi-Fi 7, Thread, Ultra Wideband 2, Action Button, Dynamic Island, Spatial Audio ჩაწერა',
    release_date: "2025-01-15",
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    price: 4200,
    rating: 4.7,
    stock: 30,
    brand: "Samsung",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/437c5f16-0e6c-45e5-9d9c-3f0bc314425e_Thumb.jpeg",
    description:
      "Samsung Galaxy S25 Ultra - საბოლოო ფლაგმანი რომელიც აერთიანებს ყველაფერს.<br><br><strong>ეკრანი:</strong> 6.9 ინჩიანი Dynamic AMOLED 2X, QHD+ (3200x1440), 120Hz adaptive, 2600 nits, Gorilla Armor დაცვა (ანტი-რეფლექსური), Always-On Display<br><br><strong>კამერა:</strong> 200MP წამყვანი კამერა (ISOCELL HP2), 12MP ულტრა-wide, 50MP 5x პერისკოპ ტელეფოტო, 10MP 3x ტელეფოტო, Laser AF. 8K@30fps ვიდეო, Super Steady OIS, Expert RAW, Astrophoto Mode, Director's View.<br><br><strong>პროცესორი:</strong> Snapdragon 8 Gen 4 for Galaxy (4nm) - ექსკლუზიური Samsung ვერსია გაზრდილი ტაქტით, Adreno 830 GPU<br><br><strong>მეხსიერება:</strong> 12GB RAM LPDDR5X, 256GB/512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 5000mAh, 45W SuperFast დამუხტვა, 25W უკაბელო, 15W უკაბელო PowerShare<br><br><strong>S Pen:</strong> Built-in S Pen, 4096 წნევის დონე, Bluetooth Air Actions, 2.8ms latency<br><br><strong>დამატებითი:</strong> Titanium ჩარჩო, IP68, Ultrasonic Fingerprint, Samsung DeX, Knox Security, Satellite SOS, 5G, Wi-Fi 7, UWB",
    release_date: "2025-01-20",
  },
  {
    name: "Google Pixel 10 Pro",
    price: 3496,
    rating: 4.6,
    stock: 35,
    brand: "Google",
    category: "Smartphones",
    image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro-.jpg",
    description:
      'Google Pixel 10 Pro - სადაც AI ხვდება შესანიშნავ ფოტოგრაფიას.<br><br><strong>ეკრანი:</strong> 6.8 ინჩიანი LTPO OLED, QHD+ (3120x1440), 120Hz, 2400 nits, Gorilla Glass Victus 3, HDR10+<br><br><strong>კამერა:</strong> 50MP მთავარი (1/1.31", OIS, f/1.68), 48MP ულტრა-wide (125.8°), 48MP 5x ტელეფოტო (Super Res Zoom 30x), ლაზერული AF. Real Tone, Magic Eraser, Photo Unblur, Night Sight, Astrophotography, Macro Focus, Cinematic Blur.<br><br><strong>Tensor G5:</strong> Google-ის მესამე თაობის ჩიპი სრული AI ინტეგრაციით - Live Translate, Call Screen, Hold for Me, Magic Compose, Best Take, Audio Magic Eraser<br><br><strong>მეხსიერება:</strong> 12GB RAM LPDDR5X, 128GB/256GB/512GB UFS 3.1<br><br><strong>ბატარეა:</strong> 5050mAh, 30W Fast დამუხტვა, 23W უკაბელო, 12W reverse wireless, Battery Share, Adaptive Battery, Extreme Battery Saver<br><br><strong>AI ფუნქციები:</strong> Gemini AI ასისტენტი, Live Caption, Clear Calling, Direct My Call, Recorder ტრანსკრიფციით, 7 წლიანი Software განახლებები<br><br><strong>დამატებითი:</strong> Titan M2 Security, IP68, Under-display Fingerprint, eSIM, 5G, Wi-Fi 7, UWB',
    release_date: "2025-01-10",
  },
  {
    name: "OnePlus 15 Pro",
    price: 3200,
    rating: 4.5,
    stock: 28,
    brand: "OnePlus",
    category: "Smartphones",
    image: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-13.jpg",
    description:
      "OnePlus 15 Pro - ჩქარი დამუხტვა, სწრაფი მუშაობა. Never Settle.<br><br><strong>ეკრანი:</strong> 6.82 ინჩიანი LTPO 4.0 AMOLED, QHD+ (3216x1440), 1-120Hz adaptive, 4500 nits peak, Aqua Touch (სველ ხელებზე მუშაობა), Dolby Vision, HDR10+<br><br><strong>კამერა:</strong> Hasselblad თანამშრომლობით - 50MP მთავარი (Sony LYT-900, OIS), 50MP ულტრა-wide, 64MP 3x ტელეფოტო (OIS), Hasselblad Natural Color, Master Mode, 4K 120fps, LOG Format<br><br><strong>პროცესორი:</strong> Snapdragon 8 Gen 4 (3nm), Adreno 830 GPU, Cryo-velocity Cooling System<br><br><strong>მეხსიერება:</strong> 12GB/16GB RAM LPDDR5X, 256GB/512GB UFS 4.0<br><br><strong>ბატარეა:</strong> 5400mAh, 150W SUPERVOOC - 0-დან 100%-მდე 15 წუთში! 50W უკაბელო AIRVOOC, Battery Health Engine (1600 cycle ცვეთის გარეშე)<br><br><strong>შესანიშნავი ფუნქციები:</strong> Trinity Engine (RAM, ROM, CPU ოპტიმიზაცია), OxygenOS 15 (Android 15), HyperBoost Gaming Engine, Alert Slider<br><br><strong>დამატებითი:</strong> Titanium unibody, IP68, In-display Fingerprint, Dual Stereo, Dolby Atmos, 5G, Wi-Fi 7, IR Blaster",
    release_date: "2025-01-25",
  },
  {
    name: "Xiaomi 15 Ultra",
    price: 3800,
    rating: 4.7,
    stock: 22,
    brand: "Xiaomi",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/54d07ad8-6b1e-4f0f-8f67-bcbdfd408d11_Thumb.jpeg",
    description:
      'Xiaomi 15 Ultra - პროფესიონალური ფოტოგრაფიის რევოლუცია Leica-სგან.<br><br><strong>ეკრანი:</strong> 6.73 ინჩიანი LTPO AMOLED, 2K (3200x1440), 1-120Hz, 3000 nits, Dolby Vision, HDR10+, Corning Gorilla Glass Victus 2<br><br><strong>Leica კამერა სისტემა:</strong><br>• 50MP მთავარი (Sony LYT-900 1", f/1.63-f/4.0 ცვლადი დიაფრაგმა, OIS)<br>• 50MP ულტრა-wide (122°, Macro)<br>• 50MP 3.2x ტელეფოტო (floating lens, OIS)<br>• 50MP 5x პერისკოპ ტელეფოტო (OIS)<br>Leica Summilux Lenses, Leica Authentic Look, Master Photography Mode, 8K Dolby Vision HDR Video<br><br><strong>პროცესორი:</strong> Snapdragon 8 Gen 4, Adreno 830 GPU, IceLoop Cooling System<br><br><strong>მეხსიერება:</strong> 16GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 5300mAh Silicon-Carbon, 90W HyperCharge (0-100% 18 წუთში), 80W უკაბელო, 10W reverse wireless<br><br><strong>დამატებითი:</strong> Ceramic ან Eco Leather უკანა პანელი, IP68, Ultrasonic Fingerprint, Quad Speakers, Dolby Atmos, HyperOS 2.0 (Android 15), 5G, Wi-Fi 7',
    release_date: "2025-02-01",
  },
  {
    name: "Samsung Galaxy S25",
    price: 3400,
    rating: 4.5,
    stock: 40,
    brand: "Samsung",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/4f1d6d28-b884-4644-bef7-15ca7e958ed7_Thumb.jpeg",
    description:
      "Samsung Galaxy S25 - კომპაქტური ფლაგმანი სრული ძალით.<br><br><strong>ეკრანი:</strong> 6.2 ინჩიანი Dynamic AMOLED 2X, FHD+ (2340x1080), 120Hz adaptive, 2200 nits peak, Gorilla Glass Victus 3<br><br><strong>კამერა:</strong> 50MP მთავარი (OIS, Dual Pixel AF), 12MP ულტრა-wide (120°), 10MP 3x ტელეფოტო (OIS), Super HDR, Nightography, 8K@24fps video<br><br><strong>პროცესორი:</strong> Snapdragon 8 Gen 4 for Galaxy (overclocked), Vapor Chamber cooling<br><br><strong>მეხსიერება:</strong> 8GB RAM LPDDR5X, 128GB/256GB/512GB UFS 4.0<br><br><strong>ბატარეა:</strong> 4000mAh, 25W Fast დამუხტვა, 15W უკაბელო, Wireless PowerShare<br><br><strong>დამატებითი:</strong> Armor Aluminum ჩარჩო, IP68, Ultrasonic Fingerprint, One UI 7 (Android 15), Galaxy AI ფუნქციები - Live Translate, Circle to Search, Note Assist, Photo Assist, 5G, Wi-Fi 7, Samsung Knox",
    release_date: "2025-01-20",
  },
  {
    name: "Xiaomi Redmi Note 15 Pro",
    price: 950,
    rating: 4.3,
    stock: 50,
    brand: "Xiaomi",
    category: "Smartphones",
    image:
      "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-14-pro-plus-5g.jpg",
    description:
      "Xiaomi Redmi Note 15 Pro - საუკეთესო ფასი-ხარისხის თანაფარდობა საშუალო სეგმენტში.<br><br><strong>ეკრანი:</strong> 6.67 ინჩიანი AMOLED, FHD+ (2400x1080), 120Hz, 1800 nits peak, Gorilla Glass Victus<br><br><strong>კამერა:</strong> 200MP მთავარი Samsung HP3 (OIS, f/1.65), 8MP ულტრა-wide, 2MP macro, 4K@30fps, Night Mode, Pro Mode<br><br><strong>პროცესორი:</strong> MediaTek Dimensity 7300-Ultra (4nm), Mali-G615 MC2 GPU<br><br><strong>მეხსიერება:</strong> 8GB/12GB RAM LPDDR4X, 256GB/512GB UFS 2.2, microSD მხარდაჭერა<br><br><strong>ბატარეა:</strong> 5000mAh, 67W Turbo დამუხტვა (50 წუთში 100%)<br><br><strong>დამატებითი:</strong> IP54 წყლისგან დაცვა, Stereo speakers, Dolby Atmos, IR Blaster, 3.5mm audio jack, Side-mounted fingerprint, MIUI 15 (Android 14), 5G",
    release_date: "2025-01-05",
  },
  {
    name: "Google Pixel 9a",
    price: 1700,
    rating: 4.4,
    stock: 45,
    brand: "Google",
    category: "Smartphones",
    image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9a.jpg",
    description:
      "Google Pixel 9a - საუკეთესო ბიუჯეტური Pixel Google-ის სრული AI ძალით.<br><br><strong>ეკრანი:</strong> 6.3 ინჩიანი OLED, FHD+ (2400x1080), 120Hz, 1400 nits peak, Gorilla Glass 3<br><br><strong>კამერა:</strong> 64MP მთავარი (OIS, f/1.89), 13MP ულტრა-wide (120°), Night Sight, Magic Eraser, Photo Unblur, Real Tone, Super Res Zoom 8x<br><br><strong>Tensor G4:</strong> Google-ის AI ჩიპი - Live Translate, Call Screen, Now Playing, Recorder with transcription, Magic Compose<br><br><strong>მეხსიერება:</strong> 8GB RAM LPDDR5X, 128GB/256GB UFS 3.1<br><br><strong>ბატარეა:</strong> 4500mAh, 18W Fast დამუხტვა, 7.5W უკაბელო, Battery Saver, Adaptive Battery<br><br><strong>დამატებითი:</strong> IP67 წყლისგან დაცვა, Titan M2 Security Chip, Under-display Fingerprint, Stereo speakers, 7 წლიანი Software განახლებები, Stock Android 14, 5G",
    release_date: "2024-12-01",
  },
  {
    name: "Samsung Galaxy A56 5G",
    price: 1600,
    rating: 4.2,
    stock: 40,
    brand: "Samsung",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/b4347edb-128d-4e84-b412-83e5af65f02e_Thumb.jpeg",
    description:
      "Samsung Galaxy A56 5G - საშუალო კლასის ფლაგმანი პრემიუმ ფუნქციებით.<br><br><strong>ეკრანი:</strong> 6.6 ინჩიანი Super AMOLED, FHD+ (2400x1080), 120Hz adaptive refresh rate, 1000 nits peak brightness, Gorilla Glass Victus+<br><br><strong>კამერა:</strong> 50MP მთავარი (OIS, f/1.8), 12MP ულტრა-wide (123°), 5MP macro, Nightography, Single Take, Photo Remaster, 4K@30fps video<br><br><strong>პროცესორი:</strong> Samsung Exynos 1480 (5nm), Mali-G68 MP5 GPU<br><br><strong>მეხსიერება:</strong> 8GB RAM LPDDR4X, 128GB/256GB UFS 3.1, microSD support up to 1TB<br><br><strong>ბატარეა:</strong> 5000mAh, 25W Fast Charging, USB-C Power Delivery<br><br><strong>დამატებითი:</strong> IP67 წყლისგან დაცვა, Gorilla Glass Victus+ ორივე მხარეს, Under-display Fingerprint, Stereo speakers, Dolby Atmos, Knox Security, One UI 6.1, 5G SA/NSA, Wi-Fi 6, Dual SIM",
    release_date: "2024-11-20",
  },
  {
    name: "OnePlus Nord 5",
    price: 1400,
    rating: 4.3,
    stock: 38,
    brand: "OnePlus",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/510977e6-c908-4984-a6b9-969ec481ce2a_Thumb.jpeg",
    description:
      "OnePlus Nord 5 - ულტრა-სწრაფი დამუხტვა ხელმისაწვდომ ფასში.<br><br><strong>ეკრანი:</strong> 6.7 ინჩიანი Fluid AMOLED, FHD+ (2412x1080), 120Hz refresh rate, HDR10+, 1100 nits peak brightness<br><br><strong>კამერა:</strong> 50MP მთავარი Sony LYT-600 (OIS, f/1.8), 8MP ულტრა-wide (112°), 4K@60fps video, EIS, Nightscape, Portrait Mode<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 7+ Gen 3 (4nm), Adreno 732 GPU - გაუმჯობესებული gaming performance<br><br><strong>მეხსიერება:</strong> 8GB/12GB RAM LPDDR5, 128GB/256GB UFS 3.1, RAM Extension<br><br><strong>ბატარეა:</strong> 5500mAh, 80W SUPERVOOC Flash Charge (1-100% 30 წუთში!), Battery Health Engine<br><br><strong>დამატებითი:</strong> In-display Fingerprint, Stereo speakers, OxygenOS 14 (Android 14), Alert Slider, 5G dual SIM, Wi-Fi 6, Aqua Touch (works with wet hands)",
    release_date: "2024-11-25",
  },
  {
    name: "Realme GT 7 Pro",
    price: 2100,
    rating: 4.4,
    stock: 30,
    brand: "Realme",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/d65d2814-9574-4c4d-803c-4c288f241b7e_Thumb.jpeg",
    description:
      "Realme GT 7 Pro - შესანიშნავი მუშაობა პრემიუმ დიზაინში.<br><br><strong>ეკრანი:</strong> 6.78 ინჩიანი LTPO AMOLED, 1.5K (2780x1264), 1-120Hz adaptive, 6000 nits peak brightness!, Dolby Vision, HDR10+, Corning Gorilla Glass Victus 2<br><br><strong>კამერა:</strong> 50MP Sony IMX906 (OIS, f/1.69), 8MP ულტრა-wide, 50MP 3x periscope telephoto (OIS), ProLight imaging, 4K Dolby Vision video, Street Photography Mode<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 (3nm), Adreno 830 GPU, Vapor Chamber cooling<br><br><strong>მეხსიერება:</strong> 12GB/16GB RAM LPDDR5X, 256GB/512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 6500mAh Silicon-Carbon, 120W SuperVOOC (0-50% 10 წუთში), 50W wireless charging<br><br><strong>დამატებითი:</strong> IP68/IP69 წყლისა და მტვრის დაცვა, Ultrasonic Fingerprint, GT Mode gaming optimizer, Dual Stereo speakers, Dolby Atmos, Realme UI 5.0, 5G, Wi-Fi 7",
    release_date: "2024-12-15",
  },
  {
    name: "Poco F7 Pro",
    price: 1850,
    rating: 4.3,
    stock: 35,
    brand: "Poco",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/acbd5b75-4e55-459a-a28a-9a16e16c3428_Thumb.jpeg",
    description:
      "Poco F7 Pro - ფლაგმანური შესაძლებლობები ხელმისაწვდომ ფასში.<br><br><strong>ეკრანი:</strong> 6.67 ინჩიანი AMOLED DotDisplay, QHD+ (3200x1440), 120Hz refresh rate, 1400 nits peak brightness, HDR10+, Dolby Vision, Gorilla Glass Victus<br><br><strong>კამერა:</strong> 50MP OmniVision OV50E (OIS, f/1.6), 8MP ულტრა-wide (119°), 2MP macro, 8K video recording, Night Mode, Film Filters, Pro Mode<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8s Gen 4 (4nm), Adreno 735 GPU, LiquidCool Technology 3.0<br><br><strong>მეხსიერება:</strong> 12GB/16GB RAM LPDDR5X, 256GB/512GB UFS 4.0<br><br><strong>ბატარეა:</strong> 5000mAh, 120W HyperCharge (0-100% 19 წუთში), 50W wireless charging, USB-C PD<br><br><strong>დამატებითი:</strong> In-display Fingerprint, Dual stereo speakers (Dolby Atmos, Hi-Res Audio), IR Blaster, WildBoost gaming optimization, MIUI 15 for POCO, 5G, Wi-Fi 6E, IP54 splash resistant",
    release_date: "2024-12-10",
  },
  {
    name: "Motorola Edge 60 Ultra",
    price: 2800,
    rating: 4.5,
    stock: 25,
    brand: "Motorola",
    category: "Smartphones",
    image: "https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-ultra.jpg",
    description:
      "Motorola Edge 60 Ultra - ულტრა-პრემიუმ ხარისხი Motorola-სგან.<br><br><strong>ეკრანი:</strong> 6.7 ინჩიანი Endless Edge pOLED, FHD+ (2400x1080), 144Hz refresh rate, 2500 nits peak brightness, HDR10+, 100% DCI-P3, Gorilla Glass Victus<br><br><strong>კამერა:</strong> 50MP OmniVision OV50H (OIS, f/1.4), 50MP ულტრა-wide with macro (122°), 64MP 3x telephoto (OIS), Moto AI Camera features, 8K video@30fps, Night Vision<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 (3nm), Adreno 830 GPU<br><br><strong>მეხსიერება:</strong> 12GB/16GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 4500mAh, 125W TurboPower (0-50% 7 წუთში!), 50W wireless charging, 10W reverse wireless<br><br><strong>დამატებითი:</strong> IP68 წყლისგან დაცვა, Aramid Fiber უკანა panel, In-display Fingerprint, Spatial Audio recording, Ready For desktop mode, Hello UI (Android 14), 5G, Wi-Fi 7, UWB",
    release_date: "2024-11-30",
  },
  {
    name: "Asus ROG Phone 9 Pro",
    price: 3900,
    rating: 4.8,
    stock: 18,
    brand: "Asus",
    category: "Smartphones",
    image: "https://imgstore.alta.ge/images/400/161/161868_396_5.webp",
    description:
      "Asus ROG Phone 9 Pro - საბოლოო გეიმერული ტელეფონი ულტრა-მუშაობით.<br><br><strong>ეკრანი:</strong> 6.78 ინჩიანი Samsung AMOLED, FHD+ (2448x1080), 165Hz refresh rate, 1ms response time, 2500 nits peak, HDR10+, Always-On Display, Gorilla Glass Victus 2<br><br><strong>კამერა:</strong> 50MP Sony IMX890 (OIS, f/1.9, Gimbal Stabilization 2.0), 13MP ულტრა-wide (125°), 32MP telephoto 3x, 8K@24fps video, HyperSteady Pro<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 for ROG (overclocked to 3.5GHz!), Adreno 830 GPU (highest clocked)<br><br><strong>გეიმინგ ფუნქციები:</strong> AeroActive Cooler 9 (bundled), GameCool 9 vapor chamber, 360Hz touch sampling, AirTrigger 9 ultrasonic buttons, X Mode+, Armoury Crate app<br><br><strong>მეხსიერება:</strong> 16GB/24GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 5800mAh (dual cell), 65W HyperCharge, 15W wireless, Bypass Charging mode<br><br><strong>დამატებითი:</strong> RGB Aura Lighting, Dual front-facing speakers (12-magnet, Dirac Virtuo), 4 mics with AI noise cancellation, In-display Fingerprint, Side-mounted USB-C, 3.5mm jack, ROG UI (Android 14), 5G, Wi-Fi 7",
    release_date: "2024-12-01",
  },
  {
    name: "Vivo X200 Pro",
    price: 3300,
    rating: 4.6,
    stock: 22,
    brand: "Vivo",
    category: "Smartphones",
    image:
      "https://www.etotalk.com/media/catalog/product/cache/f1f585d0b4e2610e7dbeee535ee5cea0/v/i/vivo_x200_pro_white.webp",
    description:
      'Vivo X200 Pro - პროფესიონალური ფოტოგრაფია ZEISS-ის თანამშრომლობით.<br><br><strong>ეკრანი:</strong> 6.78 ინჩიანი LTPO AMOLED, 2K (3200x1440), 1-120Hz adaptive, 3000 nits peak brightness, ZEISS T* Coating (anti-reflection), HDR10+, Dolby Vision<br><br><strong>ZEISS კამერა სისტემა:</strong><br>• 50MP Sony LYT-818 (1/1.28", OIS, f/1.57, ZEISS T* Lens)<br>• 50MP ულტრა-wide Samsung JN1 (116°)<br>• 200MP Samsung HP9 Periscope 3.7x (OIS)<br>ZEISS Natural Color, Cinematic Mode, Astro Mode, Super Moon Mode, 8K@30fps video<br><br><strong>პროცესორი:</strong> MediaTek Dimensity 9400 (3nm), Mali-G925 MC12 GPU, HyperEngine gaming tech<br><br><strong>მეხსიერება:</strong> 16GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 6000mAh Silicon-Carbon, 90W FlashCharge, 50W wireless charging, reverse wireless<br><br><strong>დამატებითი:</strong> IP68/IP69 წყლისა და მტვრის დაცვა, Ultrasonic In-display Fingerprint (dual sensor), V3 imaging chip, Stereo speakers with Hi-Res audio, OriginOS 5 (Android 15), 5G, Wi-Fi 7, IR Blaster',
    release_date: "2024-12-20",
  },
  {
    name: "Oppo Find X8 Pro",
    price: 3500,
    rating: 4.7,
    stock: 20,
    brand: "Oppo",
    category: "Smartphones",
    image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x8-pro.jpg",
    description:
      'Oppo Find X8 Pro - Hasselblad მასტერული ფოტოგრაფია.<br><br><strong>ეკრანი:</strong> 6.82 ინჩიანი LTPO AMOLED, 2K (3168x1440), ProXDR display, 1-120Hz, 4500 nits peak brightness, 2160Hz PWM dimming, Dolby Vision, HDR10+, Gorilla Glass Victus 2<br><br><strong>Hasselblad კამერა სისტემა:</strong><br>• 50MP Sony LYT-808 (1", f/1.6, OIS, multi-directional PDAF)<br>• 50MP ულტრა-wide (150° FOV, free-form lens)<br>• 50MP 3x telephoto (OIS)<br>• 50MP 6x periscope telephoto (OIS)<br>Hasselblad Natural Color Calibration, Master Mode, RAW+, Hasselblad Portraits, 4K Dolby Vision HDR<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 (3nm), Adreno 830, Ice Skin cooling system<br><br><strong>მეხსიერება:</strong> 16GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 5910mAh, 100W SuperVOOC, 50W AirVOOC wireless, Battery Health Engine (1600 cycles)<br><br><strong>დამატებითი:</strong> IP68/IP69 rating, Ceramic guard, Alert Slider, In-display Fingerprint, Stereo speakers, Dolby Atmos, ColorOS 15 (Android 15), 5G, Wi-Fi 7, Satellite communication',
    release_date: "2024-12-15",
  },
  {
    name: "Nothing Phone (3)",
    price: 2200,
    rating: 4.4,
    stock: 35,
    brand: "Nothing",
    category: "Smartphones",
    image:
      "https://s3.zoommer.ge/site/d7708c12-cd0a-46c6-a71c-895a00da3f9c_Thumb.jpeg",
    description:
      "Nothing Phone (3) - უნიკალური დიზაინი Glyph Interface განათებით.<br><br><strong>ეკრანი:</strong> 6.7 ინჩიანი LTPO AMOLED, FHD+ (2412x1080), 1-120Hz adaptive refresh, 1600 nits peak brightness, HDR10+<br><br><strong>Glyph Interface:</strong> მორგებული LED განათება - 900+ Glyph patterns, Notification light strips, Essential notifications, Flip to Glyph, Volume glyph, Glyph Timer, Glyph Composer<br><br><strong>კამერა:</strong> 50MP Sony IMX890 dual camera system (main + telephoto), 50MP Samsung JN1 ულტრა-wide (114°), Night Mode 2.0, 4K@60fps video, Nothing exclusive filters<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8+ Gen 3 (4nm), Adreno 740 GPU<br><br><strong>მეხსიერება:</strong> 12GB RAM LPDDR5X, 256GB/512GB UFS 4.0<br><br><strong>ბატარეა:</strong> 5000mAh, 45W fast charging, 15W wireless charging (Qi2), 5W reverse wireless<br><br><strong>დიზაინი:</strong> Transparent back design, Recycled aluminum frame, Monochrome UI aesthetic<br><br><strong>დამატებითი:</strong> IP55 splash resistant, In-display Fingerprint, Nothing OS 3.0 (Stock Android 15), No bloatware philosophy, 5G, Wi-Fi 6E",
    release_date: "2025-01-08",
  },
  {
    name: "Honor Magic 7 Pro",
    price: 2900,
    rating: 4.5,
    stock: 28,
    brand: "Honor",
    category: "Smartphones",
    image: "https://imgstore.alta.ge/images/400/164/164074_5778_1.webp",
    description:
      'Honor Magic 7 Pro - ჯადოსნური ტექნოლოგია AI-ის ძალით.<br><br><strong>ეკრანი:</strong> 6.81 ინჩიანი LTPO AMOLED, 2K (3200x1440), 1-120Hz adaptive, Honor Ultra-Bounce Anti-Drop display, 5000 nits peak brightness, 4320Hz PWM dimming, HDR Vivid, Dolby Vision<br><br><strong>კამერა:</strong> 50MP OmniVision OVH9000 (1/1.3", f/1.4-f/2.0 ცვლადი დიაფრაგმა, OIS), 50MP ულტრა-wide (122°), 200MP telephoto 3x (OIS), Honor AI Motion Sensing, HONOR Image Engine, 4K@60fps Dolby Vision<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 (3nm), Adreno 830, Honor Turbo Engine<br><br><strong>AI ფუნქციები:</strong> Magic Portal, AI Privacy Call, AI Eraser, AI Motion Sensing Capture, Magic Text, Parallel Space, Honor AI Agent<br><br><strong>მეხსიერება:</strong> 12GB/16GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 5850mAh Silicon-Carbon (second-gen), 100W SuperCharge, 80W wireless, 5W reverse wireless<br><br><strong>დამატებითი:</strong> IP68/IP69 rating, Ultrasonic In-display Fingerprint (3D), Quad speakers, NFC, IR Blaster, MagicOS 9.0 (Android 15), 5G, Wi-Fi 7, Satellite SOS',
    release_date: "2024-12-25",
  },
  {
    name: "Sony Xperia 1 VII",
    price: 4100,
    rating: 4.6,
    stock: 15,
    brand: "Sony",
    category: "Smartphones",
    image: "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-vii-violet.jpg",
    description:
      'Sony Xperia 1 VII - კინემატოგრაფიული ხარისხი თქვენს ხელში, შექმნილი Sony Alpha გუნდის მიერ.<br><br><strong>ეკრანი:</strong> 6.5 ინჩიანი 4K HDR OLED, 21:9 CinemaWide (3840x1644), 120Hz refresh rate, 240Hz motion blur reduction, 100% DCI-P3, 10-bit color depth, Gorilla Glass Victus 2, Director mode<br><br><strong>კამერა სისტემა (Alpha technology):</strong><br>• 48MP main (1/1.35", Exmor T sensor, f/1.4-f/4.0 ცვლადი დიაფრაგმა, OIS, Dual PDAF)<br>• 48MP ულტრა-wide (124°, Macro)<br>• 48MP telephoto 3.5x (OIS)<br>• 48MP telephoto 5.2x (OIS)<br>ZEISS T* Coating, Real-time Eye AF (Human/Animal), 20fps burst, 4K HDR 120fps video, S-Cinetone color, 21:9 native recording, Cinema Pro app, Photo Pro app<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 (3nm), Adreno 830, Game Enhancer optimization<br><br><strong>მეხსიერება:</strong> 16GB RAM LPDDR5X, 512GB/1TB UFS 4.0, microSD support<br><br><strong>ბატარეა:</strong> 5000mAh, 30W PD fast charging, Xperia Adaptive Charging (battery care), Battery Share<br><br><strong>Audio:</strong> 3.5mm headphone jack, Hi-Res Audio, 360 Reality Audio, LDAC, Stereo front-facing speakers, Dolby Atmos<br><br><strong>დამატებითი:</strong> IP68, Gorilla Glass Victus 2 front/back, Dedicated shutter button, Fingerprint sensor, 5G, Wi-Fi 7, USB 3.2 Gen 2',
    release_date: "2025-01-05",
  },
  {
    name: "Nubia Red Magic 10 Pro",
    price: 2600,
    rating: 4.5,
    stock: 20,
    brand: "Nubia",
    category: "Smartphones",
    image: "https://i.ebayimg.com/images/g/ib4AAOSw-A9nWuJJ/s-l1200.png",
    description:
      "Nubia Red Magic 10 Pro - ექსტრემალური გეიმინგის ახალი სტანდარტი.<br><br><strong>ეკრანი:</strong> 6.85 ინჩიანი AMOLED, FHD+ (2688x1216), 144Hz refresh rate, 960Hz touch sampling rate, 1600 nits peak, 100% DCI-P3, Under-display camera (16MP)<br><br><strong>კამერა:</strong> 50MP main (OIS, f/1.6), 50MP ულტრა-wide (116°), 2MP macro, 8K@30fps video<br><br><strong>პროცესორი:</strong> Qualcomm Snapdragon 8 Gen 4 (overclocked to 3.5GHz), Adreno 830 GPU (highest performance mode)<br><br><strong>გეიმინგ ფუნქციები:</strong><br>• Built-in Cooling Fan (25,000 RPM)<br>• Ice 14 Cooling System with vapor chamber<br>• RGB LED light strip (16.8 million colors)<br>• Dual 520Hz shoulder triggers<br>• Game Space 10.0 software<br>• 4D Vibration<br>• Bypass charging (zero battery degradation during gaming)<br><br><strong>მეხსიერება:</strong> 16GB/24GB RAM LPDDR5X, 512GB/1TB UFS 4.0<br><br><strong>ბატარეა:</strong> 7050mAh (dual-cell), 80W fast charging, 20W magnetic charging<br><br><strong>Audio:</strong> Dual front-firing speakers with DTS:X Ultra 3D surround, 3.5mm jack<br><br><strong>დამატებითი:</strong> Transparent back design option, In-display Fingerprint, RedMagic OS 10 (Android 15), 5G, Wi-Fi 7, USB-C 3.2",
    release_date: "2024-12-10",
  },

  {
    name: "Apple MacBook Pro 16 M4 Max",
    price: 8999,
    rating: 4.9,
    stock: 15,
    brand: "Apple",
    category: "Laptops",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1728916206661",
    description:
      "Apple MacBook Pro 16 M4 Max - პროფესიონალთა საბოლოო არჩევანი უდიდესი მუშაობითა და შესრულებით.<br><br><strong>ეკრანი:</strong> 16.2 ინჩიანი Liquid Retina XDR, Mini-LED, 3456x2234 რეზოლუცია, ProMotion 120Hz, 1000 nits sustained brightness (1600 nits HDR peak), P3 Wide Color, True Tone<br><br><strong>M4 Max ჩიპი:</strong><br>• 16-core CPU (12 performance + 4 efficiency)<br>• 40-core GPU<br>• 16-core Neural Engine (38 trillion operations/sec)<br>• 400GB/s unified memory bandwidth<br>• 3nm ტექნოლოგია<br><br><strong>მეხსიერება:</strong> 48GB Unified Memory, 2TB SSD (7.4GB/s read speed)<br><br><strong>ბატარეა:</strong> 100Wh (მაქსიმალური), 22 საათი ვიდეო ჩართვა, 140W USB-C Fast Charging<br><br><strong>პორტები:</strong> 3x Thunderbolt 5 (120Gbps), HDMI 2.1, SDXC card slot, MagSafe 3, 3.5mm headphone jack (high impedance)<br><br><strong>დამატებითი:</strong> Six-speaker system, Studio-quality mics, 1080p FaceTime HD camera, Magic Keyboard with Touch ID, Force Touch trackpad, Wi-Fi 7, Bluetooth 5.3, Space Black ან Silver ფერები, macOS Sequoia",
    release_date: "2025-02-01",
  },
  {
    name: "Dell XPS 15 Plus",
    price: 6500,
    rating: 4.6,
    stock: 20,
    brand: "Dell",
    category: "Laptops",
    image:
      "https://s3.zoommer.ge/zoommer-images/thumbs/0166977_dell-xps-15-9520-210-bdvf_544224_i7_ge-black_550.jpeg",
    description:
      "Dell XPS 15 Plus - პრემიუმ დიზაინი მაქსიმალური შესრულებით.<br><br><strong>ეკრანი:</strong> 15.6 ინჩიანი OLED Touch, 3.5K (3456x2160), 400 nits, 100% DCI-P3, HDR 500, Dolby Vision, Gorilla Glass 7, InfinityEdge<br><br><strong>პროცესორი:</strong> Intel Core i9-14900H (14th Gen, 14 Cores, up to 5.8GHz), Intel Iris Xe Graphics + NVIDIA GeForce RTX 4070 8GB GDDR6<br><br><strong>მეხსიერება:</strong> 32GB DDR5-5600MHz, 1TB PCIe 4.0 NVMe SSD<br><br><strong>ბატარეა:</strong> 86Wh, 130W USB-C Fast Charging, ExpressCharge (80% 1 საათში)<br><br><strong>დიზაინი:</strong> CNC machined aluminum unibody, ულტრა-თხელი ჩარჩოები, capacitive touch function row, zero-lattice keyboard, glass touchpad<br><br><strong>დამატებითი:</strong> 2x Thunderbolt 4, 1x USB-C 3.2, Quad speakers, Waves MaxxAudio Pro, 720p webcam, Fingerprint reader, Killer Wi-Fi 6E, Backlit keyboard, Windows 11 Pro",
    release_date: "2024-12-15",
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    price: 5800,
    rating: 4.7,
    stock: 18,
    brand: "Lenovo",
    category: "Laptops",
    image:
      "https://www.shoppingexpress.com.au/assets/thumb/21RB0018AU.jpg?20251126123642",
    description:
      "Lenovo ThinkPad X1 Carbon Gen 12 - ბიზნეს ლეპტოპების ოქროს სტანდარტი.<br><br><strong>ეკრანი:</strong> 14 ინჩიანი WUXGA (1920x1200) IPS, 400 nits, Low Blue Light, ან OLED 2.8K (2880x1800) option, Dolby Vision, HDR True Black 500<br><br><strong>პროცესორი:</strong> Intel Core Ultra 7 155U (Series 1, up to 4.8GHz, 12 cores), Intel Arc Graphics, AI Boost NPU (up to 34 TOPS)<br><br><strong>მეხსიერება:</strong> 32GB LPDDR5X-7467MHz (soldered), 1TB PCIe 4.0 NVMe SSD<br><br><strong>ბატარეა:</strong> 57Wh, Rapid Charge (80% 1 საათში), up to 16 hours battery life<br><br><strong>დიზაინი:</strong> Carbon fiber + magnesium alloy (1.09kg - ultra-lightweight!), MIL-STD-810H durability tested, 12 tests passed<br><br><strong>Security:</strong> Match-on-Chip fingerprint reader, IR camera with Windows Hello, Privacy shutter, dPPM chip, TPM 2.0<br><br><strong>კლავიატურა:</strong> ThinkPad legendary keyboard - 1.5mm key travel, spill-resistant, backlit, TrackPoint + Glass-like TrackPad<br><br><strong>პორტები:</strong> 2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, 3.5mm combo jack, Nano SIM slot option<br><br><strong>დამატებითი:</strong> Dolby Atmos speakers, Quad microphone array with AI noise suppression, Wi-Fi 7, 5G option, Windows 11 Pro",
    release_date: "2025-01-05",
  },
  {
    name: "ASUS ROG Zephyrus G16",
    price: 7200,
    rating: 4.8,
    stock: 12,
    brand: "Asus",
    category: "Laptops",
    image:
      "https://s3.zoommer.ge/site/a93abbef-c4d4-4a16-974e-dde22d9c8bd6_Thumb.jpeg",
    description:
      "ASUS ROG Zephyrus G16 - გეიმერების ოცნება - უძლიერესი მუშაობა თხელ კორპუსში.<br><br><strong>ეკრანი:</strong> 16 ინჩიანი ROG Nebula Display, 2.5K (2560x1600), 240Hz refresh rate, 3ms response time, 100% DCI-P3, 500 nits, G-SYNC, Dolby Vision, Pantone Validated<br><br><strong>პროცესორი:</strong> AMD Ryzen 9 8945HS (8 Cores, 16 Threads, up to 5.2GHz, Zen 4 architecture)<br><br><strong>გრაფიკა:</strong> NVIDIA GeForce RTX 4090 Laptop GPU 16GB GDDR6, 175W TGP, Ray Tracing, DLSS 3.5, AI-powered frame generation<br><br><strong>მეხსიერება:</strong> 32GB DDR5-5600MHz (dual channel, expandable to 64GB), 2TB PCIe 4.0 NVMe SSD (RAID 0 support)<br><br><strong>კულინგი:</strong> ROG Intelligent Cooling - Tri-Fan design, Liquid Metal thermal compound, 0dB Ambient Cooling (silent mode)<br><br><strong>ბატარეა:</strong> 90Wh, 240W fast charging, USB-C 100W PD charging<br><br><strong>დამატებითი:</strong> Per-key RGB keyboard (Aura Sync), 6-speaker Dolby Atmos, AI Noise Cancellation, 1080p IR camera, Thunderbolt 4, USB 3.2 Gen 2, HDMI 2.1, MUX Switch, ROG Armoury Crate, Windows 11 Pro, CNC aluminum chassis (1.95kg)",
    release_date: "2024-12-20",
  },
  {
    name: "HP Spectre x360 16",
    price: 5500,
    rating: 4.5,
    stock: 22,
    brand: "HP",
    category: "Laptops",
    image:
      "https://s3.zoommer.ge/site/94f3becd-acc9-4a41-87e1-b734e0532021_Thumb.jpeg",
    description:
      "HP Spectre x360 16 - პრემიუმ 2-in-1 ლეპტოპი შემოქმედებითი პროფესიონალებისთვის.<br><br><strong>ეკრანი:</strong> 16 ინჩიანი 3K+ (3072x1920) OLED Touch, 120Hz, 400 nits, 100% DCI-P3, VESA DisplayHDR True Black 500, Corning Gorilla Glass NBT, HP Eye Ease (Low Blue Light)<br><br><strong>პროცესორი:</strong> Intel Core Ultra 7 155H (14 cores, up to 4.8GHz), Intel Arc Graphics, AI-powered NPU<br><br><strong>მეხსიერება:</strong> 16GB LPDDR5X-7467MHz, 1TB PCIe 4.0 NVMe SSD<br><br><strong>ბატარეა:</strong> 68Wh, HP Fast Charge (50% 30 წუთში), up to 13 hours<br><br><strong>360° Convertible Design:</strong> CNC aluminum chassis, gem-cut design, ultra-thin bezels, 2.15kg<br><br><strong>Pen Support:</strong> HP Rechargeable MPP 2.0 Tilt Pen (4096 pressure levels, tilt support) - included<br><br><strong>Audio:</strong> Quad Bang & Olufsen speakers (2W x 4), HP Audio Boost, AI Noise Reduction<br><br><strong>Security:</strong> IR camera with Windows Hello, Fingerprint reader, HP Sure View Reflect (privacy screen), HP Wolf Security<br><br><strong>პორტები:</strong> 2x Thunderbolt 4, 1x USB-A 3.2, HDMI 2.1, 3.5mm combo jack, microSD card reader<br><br><strong>დამატებითი:</strong> 5MP Webcam with privacy shutter, Backlit keyboard, Wi-Fi 7, Bluetooth 5.3, Windows 11 Pro",
    release_date: "2025-01-10",
  },
  {
    name: "Microsoft Surface Laptop 6",
    price: 4800,
    rating: 4.6,
    stock: 25,
    brand: "Microsoft",
    category: "Laptops",
    image:
      "https://cdn.ballicom.co.uk/?r=peyJpbWciOiJcL1wvaW1hZ2VzXC9jZG5cLzE3XC9jMVwvMTdjMTQ4MDUtMTBiYy00YWYwLWJiOTMtNGIyMjI2YWVlYzNkLmpwZyIsInNpemUiOjg1MCwiZXh0ZW5zaW9uIjoianBnIn0=b",
    description:
      "Microsoft Surface Laptop 6 - ელეგანტური დიზაინი Microsoft-ის ხელმოწერით.<br><br><strong>ეკრანი:</strong> 15 ინჩიანი PixelSense Touch Display, 2496x1664 resolution (201 PPI), 3:2 aspect ratio, Dolby Vision IQ, 400 nits, Gorilla Glass 5<br><br><strong>პროცესორი:</strong> Intel Core Ultra 7 165H (16 cores, up to 5.0GHz), Intel Arc Graphics, AI-powered Windows Studio Effects<br><br><strong>მეხსიერება:</strong> 16GB LPDDR5X RAM, 512GB removable SSD (user-replaceable!)<br><br><strong>ბატარეა:</strong> Up to 18 hours video playback, Fast Charging (50% 1 საათში)<br><br><strong>დიზაინი:</strong> Alcantara fabric keyboard deck (Platinum color) or metal (other colors), aluminum chassis, ultra-slim profile (1.66kg)<br><br><strong>Copilot+ PC:</strong> Dedicated Copilot key, Windows Studio Effects, Live Captions, Windows Hello face authentication<br><br><strong>Audio:</strong> Omnisonic speakers with Dolby Atmos, Dual Studio Mics<br><br><strong>კამერა:</strong> Windows Hello face authentication IR camera, 1080p front-facing webcam<br><br><strong>პორტები:</strong> 1x USB-C (USB 4.0 / Thunderbolt 4), 1x USB-A 3.1, 1x Surface Connect port, 3.5mm headphone jack<br><br><strong>დამატებითი:</strong> Surface Pen support, Precision trackpad, Wi-Fi 7, Bluetooth 5.3, Windows 11 Pro",
    release_date: "2024-11-30",
  },
  {
    name: "Acer Swift 14 AI",
    price: 3200,
    rating: 4.4,
    stock: 30,
    brand: "Acer",
    category: "Laptops",
    image:
      "https://hnau.imgix.net/media/catalog/product/a/c/acer-swift-14-ai-1.jpg?auto=compress&auto=format&fill-color=FFFFFF&fit=fill&fill=solid&w=496&h=279",
    description:
      "Acer Swift 14 AI - თანამედროვე AI-ით აღჭურვილი ულტრაბუკი.<br><br><strong>ეკრანი:</strong> 14 ინჩიანი WUXGA (1920x1200) IPS, 300 nits, 100% sRGB, Acer BluelightShield, ultra-slim bezels<br><br><strong>პროცესორი:</strong> Intel Core Ultra 5 125H (14 cores, up to 4.5GHz), Intel Arc Graphics, AI Boost NPU for Copilot+<br><br><strong>AI ფუნქციები:</strong> Acer PurifiedVoice 2.0, Acer PurifiedView (AI webcam enhancement), Windows Studio Effects, AI noise cancellation<br><br><strong>მეხსიერება:</strong> 16GB LPDDR5X-6400MHz, 512GB PCIe 4.0 NVMe SSD<br><br><strong>ბატარეა:</strong> 65Wh, up to 12 hours, Fast Charging (50% 30 წუთში)<br><br><strong>დიზაინი:</strong> Aluminum chassis, ultra-portable (1.32kg), Copperfield Blue color option<br><br><strong>პორტები:</strong> 2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, 3.5mm combo jack<br><br><strong>დამატებითი:</strong> 1440p QHD Webcam with privacy shutter, Backlit keyboard, Precision trackpad, DTS Audio, Wi-Fi 6E, Windows 11 Home",
    release_date: "2025-01-12",
  },
  {
    name: "LG Gram 17",
    price: 4500,
    rating: 4.5,
    stock: 20,
    brand: "LG",
    category: "Laptops",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvED9wnkEWNCOglxvEmoJpxm_WE-AzncOMw&s",
    description:
      'LG Gram 17 - უმსუბუქესი 17 ინჩიანი ლეპტოპი მსოფლიოში.<br><br><strong>ეკრანი:</strong> 17 ინჩიანი IPS, WQXGA (2560x1600), 16:10 aspect ratio, 99% DCI-P3, 350 nits, Anti-glare coating<br><br><strong>პროცესორი:</strong> Intel Core i7-1360P (13th Gen, 12 cores, up to 5.0GHz), Intel Iris Xe Graphics<br><br><strong>მეხსიერება:</strong> 16GB LPDDR5-5200MHz (dual channel), 1TB NVMe SSD (Gen 4)<br><br><strong>ბატარეა:</strong> 80Wh - up to 19 hours! Express Charging (50% 1 საათში)<br><br><strong>წონა:</strong> მხოლოდ 1.35kg! - უმსუბუქესი 17" ლეპტოპი (MIL-STD-810G durability tested)<br><br><strong>დიზაინი:</strong> Magnesium alloy body, Diamond-cut design, ultra-thin profile<br><br><strong>პორტები:</strong> 2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.0, microSD card reader, 3.5mm combo jack<br><br><strong>Audio:</strong> Dual stereo speakers (2W x 2), DTS:X Ultra, Smart Amp<br><br><strong>დამატებითი:</strong> 1080p HD Webcam with dual mics, Backlit keyboard, Precision trackpad, Fingerprint reader, Wi-Fi 6E, Windows 11 Home',
    release_date: "2024-12-10",
  },

  {
    name: "Apple iPad Pro 13 M4",
    price: 4500,
    rating: 4.9,
    stock: 20,
    brand: "Apple",
    category: "Tablets",
    image:
      "https://s3.zoommer.ge/site/25c76c22-d83f-4956-bb76-0cfa02e7e087_Thumb.jpeg",
    description:
      "Apple iPad Pro 13 M4 - ყველაზე მძლავრი ტაბლეტი რაც ოდესმე შეიქმნა.<br><br><strong>ეკრანი:</strong> 13 ინჩიანი Ultra Retina XDR, Tandem OLED technology (dual-layer OLED), 2752x2064 resolution, ProMotion 120Hz, 1000 nits sustained (1600 nits HDR peak), P3 Wide Color, True Tone, Nano-texture glass option<br><br><strong>M4 ჩიპი:</strong> 10-core CPU (4 performance + 6 efficiency), 10-core GPU, 16-core Neural Engine (38 TOPS), Hardware-accelerated ray tracing, Dynamic Caching, AV1 decode<br><br><strong>მეხსიერება:</strong> 16GB Unified Memory, 512GB/1TB/2TB storage options<br><br><strong>კამერა:</strong> 12MP Wide back camera (f/1.8, Smart HDR 4, 4K video), 12MP Ultra Wide front camera with Center Stage (122°)<br><br><strong>Apple Pencil Pro Support:</strong> Squeeze gesture, barrel roll, haptic feedback, hover preview, double-tap tool switching<br><br><strong>ბატარეა:</strong> Up to 10 hours web browsing, USB-C Fast Charging<br><br><strong>პორტები:</strong> Thunderbolt 4 / USB 4 (40Gbps data transfer)<br><br><strong>დამატებითი:</strong> Magic Keyboard compatibility, Face ID, Quad speakers, Wi-Fi 6E, 5G option (nano-SIM + eSIM), iPadOS 18",
    release_date: "2024-11-01",
  },
  {
    name: "Samsung Galaxy Tab S10 Ultra",
    price: 3800,
    rating: 4.7,
    stock: 25,
    brand: "Samsung",
    category: "Tablets",
    image:
      "https://s3.zoommer.ge/site/a9231234-111b-4035-8387-2077bc66f9fc_Thumb.jpeg",
    description:
      "Samsung Galaxy Tab S10 Ultra - გიგანტური ეკრანი უმაღლესი შესრულებით.<br><br><strong>ეკრანი:</strong> 14.6 ინჩიანი Dynamic AMOLED 2X, WQXGA+ (2960x1848), 120Hz refresh rate, Anti-reflective coating, 930 nits peak brightness, HDR10+, Vision Booster<br><br><strong>პროცესორი:</strong> MediaTek Dimensity 9300+ (4nm), Mali-G720 MC12 GPU<br><br><strong>მეხსიერება:</strong> 12GB/16GB RAM LPDDR5X, 256GB/512GB/1TB UFS 4.0, microSD support up to 1.5TB<br><br><strong>S Pen:</strong> Included in box, 4096 pressure levels, 2.8ms latency, Air Actions, IP68 water resistant<br><br><strong>კამერები:</strong> Dual rear - 13MP main + 8MP ultra-wide, Dual front - 12MP ultra-wide + 12MP wide (4K video recording)<br><br><strong>ბატარეა:</strong> 11,200mAh, 45W Super Fast Charging<br><br><strong>Audio:</strong> Quad speakers tuned by AKG, Dolby Atmos, 3 mics with noise cancellation<br><br><strong>პორტები:</strong> USB-C 3.2 Gen 1, POGO pins for keyboard<br><br><strong>დამატებითი:</strong> IP68 water & dust resistant, Under-display fingerprint, Book Cover Keyboard compatible, Samsung DeX mode, One UI 6.1 (Android 14), Knox Security, 5G option, Wi-Fi 7",
    release_date: "2024-10-15",
  },
  {
    name: "Microsoft Surface Pro 11",
    price: 3200,
    rating: 4.6,
    stock: 30,
    brand: "Microsoft",
    category: "Tablets",
    image:
      "https://lapvip.vn/upload/products/original/surface-pro-11-snapdragon-x-elite-16gb512gboled-seo-1719540466.jpg",
    description:
      "Microsoft Surface Pro 11 - Copilot+ PC - ლეპტოპის მუშაობა, ტაბლეტის მობილურობა.<br><br><strong>ეკრანი:</strong> 13 ინჩიანი PixelSense Flow Display, 2880x1920 resolution (267 PPI), 120Hz dynamic refresh rate, 10-point multi-touch, Dolby Vision IQ, Gorilla Glass 5<br><br><strong>პროცესორი:</strong> Intel Core Ultra 7 165U (up to 4.9GHz, 12 cores), Intel Arc Graphics, AI Boost NPU (up to 47 TOPS)<br><br><strong>Copilot+ Features:</strong> Dedicated Copilot key, Windows Studio Effects, Live Captions with real-time translation, Cocreator in Paint, Recall (timeline search)<br><br><strong>მეხსიერება:</strong> 16GB LPDDR5X RAM, 512GB removable SSD (user serviceable)<br><br><strong>კამერები:</strong> Windows Studio Camera - 10MP front with Windows Hello IR, 10MP rear with autofocus, 4K video recording<br><br><strong>ბატარეა:</strong> Up to 14 hours typical usage, Fast Charging (50% 1 საათში)<br><br><strong>Kickstand:</strong> Built-in adjustable kickstand (0-165° range)<br><br><strong>Audio:</strong> Dual 2W Dolby Atmos speakers, Dual Studio Mics with AI noise suppression<br><br><strong>პორტები:</strong> 2x USB-C (USB 4.0 / Thunderbolt 4), Surface Connect port, nano SIM tray<br><br><strong>დამატებითი:</strong> Surface Pro Keyboard and Slim Pen 3 sold separately, Wi-Fi 7, Bluetooth 5.4, 5G option, Windows 11 Pro",
    release_date: "2024-11-20",
  },
  {
    name: "Apple iPad Air 13 M2",
    price: 2800,
    rating: 4.7,
    stock: 35,
    brand: "Apple",
    category: "Tablets",
    image:
      "https://s3.zoommer.ge/site/8aa03bf8-6178-4b8a-bddd-1d7ea6d98ff4_Thumb.jpeg",
    description:
      "Apple iPad Air 13 M2 - იდეალური ბალანსი მუშაობასა და ფასს შორის.<br><br><strong>ეკრანი:</strong> 13 ინჩიანი Liquid Retina IPS, 2732x2048 resolution, 264 PPI, True Tone, P3 Wide Color, Anti-reflective coating, 600 nits brightness<br><br><strong>M2 ჩიპი:</strong> 8-core CPU (4 performance + 4 efficiency), 10-core GPU, 16-core Neural Engine, ProRes encode/decode, 15.8 TOPS<br><br><strong>მეხსიერება:</strong> 8GB Unified Memory, 128GB/256GB/512GB/1TB storage options<br><br><strong>კამერები:</strong> 12MP Wide back camera (f/1.8, Smart HDR 3), 12MP Ultra Wide front camera (122°) with Center Stage<br><br><strong>Apple Pencil Support:</strong> Apple Pencil Pro & Apple Pencil (USB-C) compatibility, Hover support, Pressure sensitivity<br><br><strong>ბატარეა:</strong> Up to 10 hours web browsing, USB-C Fast Charging (20W adapter)<br><br><strong>პორტები:</strong> USB-C with USB 3.2 Gen 2 (10Gbps), supports DisplayPort<br><br><strong>Audio:</strong> Landscape stereo speakers, Wide stereo sound<br><br><strong>დამატებითი:</strong> Magic Keyboard & Smart Keyboard Folio compatible, Touch ID, Wi-Fi 6E, 5G option (nano-SIM + eSIM), iPadOS 18",
    release_date: "2024-10-01",
  },

  {
    name: "Sony WH-1000XM6",
    price: 1400,
    rating: 4.9,
    stock: 30,
    brand: "Sony",
    category: "Audio",
    image:
      "https://s3.zoommer.ge/site/aafe046e-efde-4b21-a61a-81500df5ec0a_Thumb.jpeg",
    description:
      "Sony WH-1000XM6 - ინდუსტრიის ლიდერი Noise Cancellation ტექნოლოგიაში.<br><br><strong>Noise Cancellation:</strong> HD Noise Cancelling Processor QN2e, 8 მიკროფონი (2x ყოველ cup-ზე + 4 feedforward), Auto NC Optimizer, Atmospheric Pressure Optimization<br><br><strong>Audio Quality:</strong> 40mm carbon fibre composite drivers, Hi-Res Audio & Hi-Res Audio Wireless (LDAC), 360 Reality Audio, DSEE Extreme (AI upscaling)<br><br><strong>Smart Features:</strong> Adaptive Sound Control, Speak-to-Chat (auto pause), Quick Attention Mode, Multipoint connection (2 devices simultaneously), Auto-pause when removed<br><br><strong>ბატარეა:</strong> 40 საათი ANC-ით! (50 საათი ANC-ის გარეშე), Quick Charge (3 წუთი = 5 საათი)<br><br><strong>დიზაინი:</strong> Ultra-lightweight (220g), Soft-fit leather earpads, 30° swivel flat for travel, Premium carrying case included<br><br><strong>Call Quality:</strong> AI-based noise reduction for calls, Precise Voice Pickup Technology, Wind Noise Reduction<br><br><strong>კონტროლი:</strong> Touch sensor controls (tap, swipe), Voice Assistant (Alexa, Google Assistant), Sony Headphones Connect app (10-band EQ)<br><br><strong>დამატებითი:</strong> 3.5mm wired option, USB-C charging, Bluetooth 5.3, Google Fast Pair, Microsoft Swift Pair",
    release_date: "2024-11-01",
  },
  {
    name: "Apple AirPods Max 2",
    price: 2200,
    rating: 4.8,
    stock: 22,
    brand: "Apple",
    category: "Audio",
    image:
      "https://s3.zoommer.ge/site/57b9e569-9474-459b-a21f-f70763bf8dea_Thumb.jpeg",
    description:
      "Apple AirPods Max 2 - პრემიუმ Over-Ear ყურსასმენები Apple-ის ხარისხით.<br><br><strong>Apple H2 ჩიპი:</strong> Enhanced computational audio, Personalized Spatial Audio with dynamic head tracking, Adaptive EQ, Lossless Audio with USB-C cable<br><br><strong>Active Noise Cancellation:</strong> Advanced ANC powered by H2 chip, 9 microphones, Adaptive Audio (blends ANC and Transparency), Conversation Awareness<br><br><strong>Audio Quality:</strong> 40mm custom Apple driver, High-fidelity audio, Computational audio, Dynamic head tracking for immersive sound<br><br><strong>Spatial Audio:</strong> Personalized Spatial Audio with dynamic head tracking, Dolby Atmos, works with Apple Music, Apple TV+, Netflix, Disney+<br><br><strong>ბატარეა:</strong> 20 საათი ANC-ით, USB-C Fast Charging, Smart Case (Ultra-low power mode)<br><br><strong>დიზაინი:</strong> Stainless steel frame, Aluminum cups, Breathable knit mesh canopy and ear cushions, Memory foam, 385g<br><br><strong>კონტროლი:</strong> Digital Crown (volume, play/pause, skip, Siri), Noise Control button (ANC/Transparency toggle)<br><br><strong>დამატებითი:</strong> Find My support, Automatic switching between Apple devices, Audio Sharing with another AirPods, Hey Siri, USB-C to Lightning cable included, 5 color options",
    release_date: "2024-12-01",
  },

  {
    name: "Apple Watch Ultra 3",
    price: 2800,
    rating: 4.9,
    stock: 20,
    brand: "Apple",
    category: "Wearables",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-ultra2-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1724948964536",
    description:
      "Apple Watch Ultra 3 - ყველაზე გამძლე Apple Watch ექსტრემალური პირობებისთვის.<br><br><strong>ეკრანი:</strong> 49mm Retina Display, Always-On (3000 nits peak brightness!), Night Mode (1 nit red light), Sapphire crystal front<br><br><strong>კორპუსი:</strong> Aerospace-grade Titanium, Customizable Action Button, Rotating Digital Crown with haptic feedback, 100m water resistance, EN13319 dive certified<br><br><strong>S10 SiP Chip:</strong> Faster, more efficient, Always-On altimeter, High-g accelerometer, High dynamic range gyroscope, Compass with waypoints<br><br><strong>ჯანმრთელობა & Fitness:</strong> Blood Oxygen sensor, ECG, Heart Rate (high/low/irregular alerts), Temperature sensing, Sleep tracking, VO2 max, Crash Detection, Fall Detection<br><br><strong>Workout Tracking:</strong> 100+ workout types, Precision dual-frequency GPS, Route tracking, Swim tracking, Diving computer (depth gauge up to 40m), Oceanic+ app<br><br><strong>ბატარეა:</strong> 36 საათი normal use, 72 საათი Low Power Mode, 15 საათი workout GPS tracking, Fast Charging (80% 1 საათში)<br><br><strong>Bands:</strong> Trail Loop, Alpine Loop, Ocean Band - all designed for extreme conditions<br><br><strong>დამატებითი:</strong> Siren (86 decibel emergency sound), Cellular (5G, LTE), Wi-Fi 6E, Bluetooth 5.3, Ultra Wideband, watchOS 11, Compass Waypoints, Dual speakers, ECG app",
    release_date: "2024-11-01",
  },
  {
    name: "Samsung Galaxy Watch 7 Ultra",
    price: 2200,
    rating: 4.7,
    stock: 25,
    brand: "Samsung",
    category: "Wearables",
    image:
      "https://s3.zoommer.ge/site/438974f4-face-411e-8912-5808c50ea6be_Thumb.jpeg",
    description:
      "Samsung Galaxy Watch 7 Ultra - პროფესიონალური სმარტ საათი გამძლე დიზაინით.<br><br><strong>ეკრანი:</strong> 1.5 ინჩიანი (47mm) Super AMOLED, 480x480 resolution, Always-On Display, Sapphire Crystal glass, 3000 nits peak brightness<br><br><strong>კორპუსი:</strong> Titanium Grade 4, Cushion design with protective bezel, 10ATM + IP68 water resistance, MIL-STD-810H certified<br><br><strong>პროცესორი:</strong> Exynos W1000 (5-core, 3nm), 2GB RAM, 32GB storage<br><br><strong>Galaxy AI ფუნქციები:</strong> Energy Score, Sleep coaching with AI analysis, Personalized heart rate zones, Advanced running metrics, Race tracking<br><br><strong>ჯანმრთელობა:</strong> BioActive Sensor - Heart rate, ECG, Blood pressure, SpO2, Body composition (BMI, fat %), Sleep tracking with snore detection, Stress monitoring, Cycle tracking<br><br><strong>Fitness:</strong> 100+ workout modes, Multi-sports tracking, Advanced running metrics, Swimming tracking, GPS + GLONASS + Beidou + Galileo<br><br><strong>ბატარეა:</strong> 590mAh, up to 100 hours Power Saving mode, 48 hours typical use, Fast Wireless Charging<br><br><strong>Quick Button:</strong> Customizable Action Button for instant workout start, flashlight, stopwatch, etc.<br><br><strong>დამატებითი:</strong> Wear OS 5 powered by Samsung, One UI Watch 6, Google Assistant & Bixby, NFC payments, LTE option, Wi-Fi 6E, Bluetooth 5.3, Marine Band (ocean-ready strap)",
    release_date: "2024-12-01",
  },

  {
    name: "LG UltraGear 27GR95QE",
    price: 3500,
    rating: 4.8,
    stock: 12,
    brand: "LG",
    category: "Monitors",
    image:
      "https://www.lg.com/content/dam/channel/wcms/hk_en/images/monitors/gaming/27gs95qe-b/gallery/04-thumbnail/ultragear-27gs95qe-thumbnail-01.jpg",
    description:
      "LG UltraGear 27GR95QE - კონკურენტული გეიმინგი OLED ტექნოლოგიით.<br><br><strong>ეკრანი:</strong> 27 ინჩიანი OLED, QHD (2560x1440), 16:9 aspect ratio, 0.03ms (GTG) response time, 98.5% DCI-P3, 1.07 billion colors<br><br><strong>Refresh Rate:</strong> 240Hz native, 1ms GtG response time, AMD FreeSync Premium Pro, NVIDIA G-SYNC Compatible<br><br><strong>HDR:</strong> DisplayHDR True Black 400, 1,000,000:1 contrast ratio, Per-pixel dimming, Peak brightness 200 nits (full screen), 400 nits (HDR peak)<br><br><strong>Gaming Features:</strong><br>• Black Stabilizer (better visibility in dark scenes)<br>• Dynamic Action Sync (reduced input lag)<br>• Crosshair overlay<br>• FPS counter<br>• Dashboard (real-time system monitoring)<br><br><strong>Anti-Burn-in:</strong> Screen Shift, Logo Detection, Pixel Cleaning, Static Element Detection<br><br><strong>დიზაინი:</strong> 3-side virtually borderless, Tilt/Height/Pivot adjustable stand, VESA 100x100mm, Cable management<br><br><strong>პორტები:</strong> 2x HDMI 2.1, 1x DisplayPort 1.4, 2x USB 3.0 downstream, 1x USB 3.0 upstream, 3.5mm headphone out<br><br><strong>დამატებითი:</strong> Built-in speakers (5W x 2), DTS Headphone:X, On-Screen Control software, Flicker-Safe, Reader Mode",
    release_date: "2024-12-01",
  },
  {
    name: "Samsung Odyssey OLED G9",
    price: 5500,
    rating: 4.9,
    stock: 8,
    brand: "Samsung",
    category: "Monitors",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/ca/ls49cg954snxza/gallery/ca-odyssey-oled-g9-g95sc-ls49cg954snxza-thumb-539084990",
    description:
      "Samsung Odyssey OLED G9 - ულტრა-wide გეიმინგის საბოლოო განცდა.<br><br><strong>ეკრანი:</strong> 49 ინჩიანი Quantum Dot OLED, Dual QHD (5120x1440), 32:9 SuperUltraWide, 1800R curvature, 0.03ms (GTG) response time<br><br><strong>Refresh Rate:</strong> 240Hz, AMD FreeSync Premium Pro, NVIDIA G-SYNC Compatible, HDR10+<br><br><strong>QD-OLED Technology:</strong> Samsung's Quantum Dot OLED - infinite contrast ratio, 1,000,000:1, True RGB subpixels, 99.3% DCI-P3, 1.07 billion colors, DisplayHDR True Black 400<br><br><strong>Neo Quantum Processor:</strong> AI upscaling, Auto HDR tone mapping, Multi-view (PBP/PIP), Game Bar 3.0<br><br><strong>Gaming Hub:</strong> Cloud gaming built-in (Xbox, GeForce NOW, Amazon Luna, Utomik) - no PC needed!<br><br><strong>Smart Features:</strong> Tizen OS, Samsung TV Plus, Netflix, YouTube, Apple AirPlay 2, SmartThings Hub, Bixby voice assistant<br><br><strong>Audio:</strong> 2.2.2ch Neural Tracking Sound+ (60W total), Dolby Atmos, Object Tracking Sound<br><br><strong>CoreSync:</strong> Dynamic LED backlighting that syncs with on-screen content (ambient bias lighting)<br><br><strong>პორტები:</strong> 2x HDMI 2.1, 1x DisplayPort 1.4, 1x micro HDMI (service), 3x USB 3.0, USB-C (65W PD + DP Alt Mode), 3.5mm headphone out, Optical audio out<br><br><strong>დამატებითი:</strong> Height/Tilt adjustable stand, VESA 100x100mm, Remote control, Auto Source Switch+, Eye Saver Mode, Flicker Free",
    release_date: "2024-12-10",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  updateCartCount();
  setupEventListeners();

  console.log("✅ Product addition script loaded!");
  console.log(`📦 ${LOCAL_PRODUCTS_DETAILS.length} products ready to add:`);
  console.log("   - 21 Smartphones");
  console.log("   - 8 Laptops");
  console.log("   - 4 Tablets");
  console.log("   - 2 Audio");
  console.log("   - 2 Wearables");
  console.log("   - 2 Monitors");
  console.log(
    "🚀 Run 'addProductsToAPI()' in console to add products to the API",
  );
});

function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  const applyBtn = document.getElementById("applyFilters");
  const resetBtn = document.getElementById("resetFilters");

  if (applyBtn) {
    applyBtn.addEventListener("click", applyFilters);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }

  const categoryFilter = document.getElementById("categoryFilter");
  const brandFilter = document.getElementById("brandFilter");

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
  }

  if (brandFilter) {
    brandFilter.addEventListener("change", applyFilters);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  setupProductCards();
}

function setupProductCards() {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const image = card.querySelector(".product-image");
    if (image) {
      image.addEventListener("click", () => {
        goToProductDetail(card);
      });
    }

    const name = card.querySelector(".product-name");
    if (name) {
      name.addEventListener("click", () => {
        goToProductDetail(card);
      });
      name.style.cursor = "pointer";
    }

    const btn = card.querySelector(".add-to-cart-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productName = card.dataset.name;
        const fullProduct = allProducts.find((p) => p.name === productName);

        if (fullProduct) {
          const product = {
            id: fullProduct.name,
            name: fullProduct.name,
            price: fullProduct.price,
            rating: fullProduct.rating || 0,
            brand: fullProduct.brand,
            category: fullProduct.category,
            stock: fullProduct.stock || 0,
            reviews_count: fullProduct.reviews_count || 0,
            image:
              fullProduct.image ||
              card.querySelector(".product-image")?.src ||
              "",
          };
          addToCart(product);
        } else {
          const product = {
            id: card.dataset.name,
            name: card.dataset.name,
            price: parseFloat(card.dataset.price),
            rating: parseFloat(card.dataset.rating),
            brand: card.dataset.brand,
            category: card.dataset.category,
            stock: 0,
            reviews_count: 0,
            image: card.querySelector(".product-image")?.src || "",
          };
          addToCart(product);
        }
      });
    }
  });
}

function goToProductDetail(card) {
  const productName = card.dataset.name;
  const fullProduct = allProducts.find((p) => p.name === productName);

  if (fullProduct) {
    const productData = {
      id: fullProduct.name,
      price: fullProduct.price,
      rating: fullProduct.rating || 0,
      brand: fullProduct.brand || "N/A",
      category: fullProduct.category || "N/A",
      stock: fullProduct.stock || 0,
      release_date: fullProduct.release_date || "არ არის მითითებული",
      description:
        fullProduct.description || "დეტალური ინფორმაცია პროდუქტის შესახებ.",
      reviews_count: fullProduct.reviews_count || 0,
      image:
        fullProduct.image || card.querySelector(".product-image")?.src || "",
    };

    console.log("Saving product to localStorage:", productData);
    localStorage.setItem("currentProduct", JSON.stringify(productData));
    window.location.href = "product-detail.html";
  } else {
    const productData = {
      id: card.dataset.name,
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      rating: parseFloat(card.dataset.rating),
      brand: card.dataset.brand,
      category: card.dataset.category,
      stock: 0,
      release_date: "არ არის მითითებული",
      image: card.querySelector(".product-image")?.src || "",
      description: getProductDescription(card.dataset.name),
      reviews_count: 0,
    };

    console.log("Product not found in array, using card data:", productData);
    localStorage.setItem("currentProduct", JSON.stringify(productData));
    window.location.href = "product-detail.html";
  }
}

function getProductDescription(name) {
  const product = allProducts.find((p) => p.name === name);
  return product
    ? product.description
    : "დეტალური ინფორმაცია პროდუქტის შესახებ.";
}

function applyFilters() {
  const searchTerm =
    document.getElementById("searchInput")?.value.toLowerCase() || "";
  const category = document.getElementById("categoryFilter")?.value || "";
  const brand = document.getElementById("brandFilter")?.value || "";
  const minPrice = parseFloat(document.getElementById("minPrice")?.value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice")?.value) || Infinity;
  const minRating =
    parseFloat(document.getElementById("ratingFilter")?.value) || 0;

  const cards = document.querySelectorAll(".product-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const price = parseFloat(card.dataset.price);
    const rating = parseFloat(card.dataset.rating);
    const productBrand = card.dataset.brand;
    const productCategory = card.dataset.category;

    const matchesSearch = name.includes(searchTerm);
    const matchesCategory = !category || productCategory === category;
    const matchesBrand = !brand || productBrand === brand;
    const matchesPrice = price >= minPrice && price <= maxPrice;
    const matchesRating = rating >= minRating;

    if (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesRating
    ) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const noResults = document.getElementById("noResults");
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

function resetFilters() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const brandFilter = document.getElementById("brandFilter");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const ratingFilter = document.getElementById("ratingFilter");

  if (searchInput) searchInput.value = "";
  if (categoryFilter) categoryFilter.value = "";
  if (brandFilter) brandFilter.value = "";
  if (minPrice) minPrice.value = "";
  if (maxPrice) maxPrice.value = "";
  if (ratingFilter) ratingFilter.value = "";

  document.querySelectorAll(".product-card").forEach((card) => {
    card.style.display = "block";
  });

  const noResults = document.getElementById("noResults");
  if (noResults) {
    noResults.style.display = "none";
  }
}

function viewProductDetails(product) {
  const fullProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    rating: product.rating || 0,
    brand: product.brand || "N/A",
    category: product.category || "N/A",
    stock: product.stock || 0,
    release_date: product.release_date || "არ არის მითითებული",
    description:
      product.description || "დეტალური ინფორმაცია პროდუქტის შესახებ.",
    reviews_count: product.reviews_count || 0,
  };

  console.log("Saving product to localStorage:", fullProduct);
  localStorage.setItem("currentProduct", JSON.stringify(fullProduct));

  window.location.href = "product-detail.html";
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      brand: product.brand,
      category: product.category,
      stock: product.stock || 0,
      reviews_count: product.reviews_count || 0,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("პროდუქტი დამატდა კალათაში!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

let allProducts = [];
let filteredProducts = [];
let isLoading = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 App initialized");
  console.log("API Base URL:", API_BASE);
  console.log(
    "Local products database loaded:",
    LOCAL_PRODUCTS_DETAILS.length,
    "products",
  );
  fetchProductsFromAPI();
  updateCartCount();
  setupEventListeners();
});

async function fetchProductsFromAPI() {
  console.log("🚀 Loading local products...");

  const productsGrid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");

  if (!productsGrid) {
    console.error("❌ productsGrid element not found!");
    return;
  }

  productsGrid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
      <div style="font-size: 2rem; color: #ff6b00;">იტვირთება...</div>
      <div style="margin-top: 1rem; color: #666;">პროდუქტების ჩატვირთვა</div>
    </div>
  `;

  allProducts = LOCAL_PRODUCTS_DETAILS.map((product, index) => ({
    id: "local_" + index,
    name: product.name,
    price: parseFloat(product.price || 0),
    rating: parseFloat(product.rating || 0),
    stock: parseInt(product.stock || 0),
    brand: product.brand || "Unknown",
    category: product.category || "Other",
    image:
      product.image ||
      "https://placehold.co/300x300/ff6b00/white?text=" +
        encodeURIComponent(product.name || "Product"),
    description: product.description || "არ არის აღწერა",
    release_date:
      product.release_date || new Date().toISOString().split("T")[0],
    reviews_count: 0,
    thumbnail: product.image || "",
    images: [product.image || ""],
  }));

  console.log("✅ Loaded " + allProducts.length + " local products");

  filteredProducts = [...allProducts];
  displayProducts(filteredProducts);
  updateCategoryCounts();
}

function displayProducts(products) {
  const productsGrid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");

  console.log("🎨 displayProducts called with:", products.length, "products");
  console.log("📍 productsGrid element:", productsGrid);
  console.log("📍 noResults element:", noResults);

  if (!productsGrid) {
    console.error("❌ productsGrid element not found!");
    return;
  }

  if (products.length === 0) {
    console.warn("⚠️ No products to display");
    productsGrid.style.display = "none";
    if (noResults) noResults.style.display = "block";
    return;
  }

  console.log("✅ Setting up grid display...");
  productsGrid.style.display = "grid";
  if (noResults) noResults.style.display = "none";
  productsGrid.innerHTML = "";

  console.log("🔨 Creating product cards...");
  products.forEach((product, index) => {
    try {
      console.log(
        `  Creating card ${index + 1}/${products.length}:`,
        product.name,
      );
      const card = createProductCard(product);
      productsGrid.appendChild(card);
    } catch (error) {
      console.error(
        `❌ Error creating card for product ${index}:`,
        error,
        product,
      );
    }
  });

  console.log(`✅ Displayed ${products.length} products successfully`);
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.name = product.name;
  card.dataset.price = product.price;
  card.dataset.rating = product.rating;
  card.dataset.brand = product.brand;
  card.dataset.category = product.category;

  const rating = product.rating || 0;
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

  const stock = product.stock || 0;
  const stockStatus =
    stock === 0
      ? '<span style="color: #d32f2f; font-weight: 600;">არ არის საწყობში</span>'
      : stock < 5
        ? `<span style="color: #d32f2f; font-weight: 600;">საწყობში: ${stock} ცალი</span>`
        : `<span style="color: #2e7d32; font-weight: 600;">საწყობში: ${stock} ცალი</span>`;

  card.innerHTML = `
    <div class="product-image-container">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
        onerror="this.src='https://placehold.co/300x300/cccccc/666666?text=No+Image'"
      />
      ${stock === 0 ? '<div style="position: absolute; top: 10px; right: 10px; background: #d32f2f; color: white; padding: 0.5rem; font-weight: 600; border-radius: 4px;">SOLD OUT</div>' : ""}
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-meta" style="font-size: 0.875rem; color: #666; margin: 0.5rem 0;">
        ${stockStatus}
      </div>
      <div class="product-price">${product.price} ₾</div>
      <div class="product-rating">
        <span class="stars">${stars}</span>
        <span class="rating-number">(${rating.toFixed(1)})</span>
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <button 
          class="add-to-cart-btn" 
          style="flex: 1;"
          ${stock === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ""}
        >
          ${stock === 0 ? "არ არის საწყობში" : "კალათაში დამატება"}
        </button>
        <button 
          class="view-details-btn"
          style="padding: 0.75rem 1rem; background: transparent; border: 2px solid #1a1a1a; cursor: pointer; font-weight: 600; white-space: nowrap;"
        >
          დეტალები
        </button>
      </div>
    </div>
  `;

  const addToCartBtn = card.querySelector(".add-to-cart-btn");
  if (stock > 0 && addToCartBtn) {
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });
  }

  const viewDetailsBtn = card.querySelector(".view-details-btn");
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      viewProductDetails(product);
    });
  }

  return card;
}

function addToCart(product) {
  if (product.stock === 0) {
    showNotification("პროდუქტი არ არის საწყობში!", true);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    if (existingItem.quantity >= product.stock) {
      showNotification("საწყობში მეტი რაოდენობა არ არის!", true);
      return;
    }
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      stock: product.stock,
      reviews_count: product.reviews_count || 0,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("პროდუქტი დამატებულია კალათაში!");
}

function viewProductDetails(product) {
  localStorage.setItem("currentProduct", JSON.stringify(product));
  window.location.href = "product-detail.html";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

function setupEventListeners() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.href = "login.html";
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      applyFilters(searchTerm);
    });
  }

  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      const searchTerm = searchInput?.value.toLowerCase() || "";
      applyFilters(searchTerm);
    });
  }

  const brandFilter = document.getElementById("brandFilter");
  if (brandFilter) {
    brandFilter.addEventListener("change", () => {
      const searchTerm = searchInput?.value.toLowerCase() || "";
      applyFilters(searchTerm);
    });
  }

  const minPrice = document.getElementById("minPrice");
  if (minPrice) {
    minPrice.addEventListener("input", () => {
      const searchTerm = searchInput?.value.toLowerCase() || "";
      applyFilters(searchTerm);
    });
  }

  const maxPrice = document.getElementById("maxPrice");
  if (maxPrice) {
    maxPrice.addEventListener("input", () => {
      const searchTerm = searchInput?.value.toLowerCase() || "";
      applyFilters(searchTerm);
    });
  }

  const minRating = document.getElementById("minRating");
  if (minRating) {
    minRating.addEventListener("change", () => {
      const searchTerm = searchInput?.value.toLowerCase() || "";
      applyFilters(searchTerm);
    });
  }

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const searchTerm = searchInput?.value.toLowerCase() || "";
      applyFilters(searchTerm);
    });
  }

  const resetFilters = document.getElementById("resetFilters");
  if (resetFilters) {
    resetFilters.addEventListener("click", resetFiltersFunc);
  }
}

function applyFilters(searchTerm = "") {
  const category = document.getElementById("categoryFilter")?.value || "";
  const brand = document.getElementById("brandFilter")?.value || "";
  const minPrice = parseFloat(document.getElementById("minPrice")?.value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice")?.value) || Infinity;
  const minRating =
    parseFloat(document.getElementById("minRating")?.value) || 0;
  const sortBy = document.getElementById("sortSelect")?.value || "";

  filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory = category === "" || product.category === category;
    const matchesBrand = brand === "" || product.brand === brand;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesRating = product.rating >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesRating
    );
  });

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  displayProducts(filteredProducts);
}

function resetFiltersFunc() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const brandFilter = document.getElementById("brandFilter");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const minRating = document.getElementById("minRating");
  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) searchInput.value = "";
  if (categoryFilter) categoryFilter.value = "";
  if (brandFilter) brandFilter.value = "";
  if (minPrice) minPrice.value = "";
  if (maxPrice) maxPrice.value = "";
  if (minRating) minRating.value = "";
  if (sortSelect) sortSelect.value = "";

  filteredProducts = [...allProducts];
  displayProducts(filteredProducts);
}

function filterByCategory(category) {
  const categoryFilter = document.getElementById("categoryFilter");
  const brandFilter = document.getElementById("brandFilter");

  if (categoryFilter) categoryFilter.value = category;
  if (brandFilter) brandFilter.value = "";

  applyFilters();

  const productsSection = document.getElementById("productsSection");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function filterByBrand(brand) {
  const brandFilter = document.getElementById("brandFilter");

  if (brandFilter) brandFilter.value = brand;

  applyFilters();

  const productsSection = document.getElementById("productsSection");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function updateCategoryCounts() {
  const counts = {};
  allProducts.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });

  console.log("Category counts:", counts);

  document.querySelectorAll(".category-card").forEach((card) => {
    const categoryName = card.querySelector(".category-name")?.textContent;
    const countElement = card.querySelector(".category-count");

    if (categoryName && countElement) {
      const categoryKey = getCategoryKey(categoryName);
      if (counts[categoryKey]) {
        countElement.textContent = `${counts[categoryKey]} პროდუქტი`;
      } else {
        countElement.textContent = "0 პროდუქტი";
      }
    }
  });
}

function getCategoryKey(georgianName) {
  const mapping = {
    სმართფონები: "Smartphones",
    ლეპტოპები: "Laptops",
    ტაბლეტები: "Tablets",
    აუდიო: "Audio",
    "სმარტ საათები": "Wearables",
    მონიტორები: "Monitors",
  };
  return mapping[georgianName] || georgianName;
}

function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${isError ? "#d32f2f" : "#ff6b00"};
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

if (typeof window !== "undefined") {
  window.filterByCategory = filterByCategory;
  window.filterByBrand = filterByBrand;
  window.fetchProductsFromAPI = fetchProductsFromAPI;
  window.applyFilters = applyFilters;
}

const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log("✅ app.js loaded successfully");
