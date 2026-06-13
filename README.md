# FitoTerrain

**Field app for phytosociological surveys on land parcels — map, relevés & lists, photos and GPX track, all in one offline-capable PWA.**
**Terenowa aplikacja do badań fitosocjologicznych na działkach — mapa, zdjęcia i spisy, fotografie oraz ślad GPX w jednej aplikacji PWA działającej offline.**

A single self-contained HTML file. No installation, no backend, no accounts — open the page on a phone and add it to the home screen.
Jeden samodzielny plik HTML. Bez instalacji, bez serwera, bez kont — otwórz stronę na telefonie i dodaj ją do ekranu głównego.

---

## English

### What it does
FitoTerrain combines three field tools into one mobile-first app:
- a **Leaflet map** with land-parcel boundaries loaded from **KML / GeoJSON** (with area in hectares),
- **botanical surveys** attached to points on that map,
- a **GPX track** of the field walk.

### Features
**Map**
- OpenStreetMap and Esri satellite base layers.
- Load parcel boundaries from `.kml` / `.geojson` / `.json` (persisted between sessions).
- Place a survey point at your **GPS position**, or precisely via a **centre crosshair** ("pan-to-aim, then *Add point here*") — the latter works even without GPS.

**GPX track**
- **Live recording** from the phone GPS (start / pause / stop, with live stats: points, distance, time, accuracy).
- **Manual drawing** by tapping the map.
- Import an existing `.gpx` track.

**Survey points — three switchable types per point**
- **Phytosociological relevé** (Braun-Blanquet): layers A–D, cover scale `5, 4, 3, 2, 1, +, r`.
- **Floristic list**: species with frequency `+ … +++++`.
- **Simplified list**: up to **5 dominant species** (with % cover) and up to **15 indicator / character species** (presence only).

**Shared, collapsible description header** (for all three types)
- Author, date, **two field photographs**, plot area, aspect, slope, **substrate** (5 classes) and **moisture** (4 classes), layer covers / heights (relevé), notes.
- The header is **collapsed by default** to keep the screen free during species recording, and **auto-copies from the previous point** to save time (with a manual "copy from previous" button too).

**Photographs**
- Two per point, taken with the device camera, resized for the field (~2400 px) and stored in **IndexedDB**.

**Species database**
- ~4060 taxa (vascular plants, bryophytes, lichens) with acronym + Latin/Polish name search and **voice search** (pl-PL).
- Import / export the database as CSV.

**Export**
- Individual: GPX, relevé CSV, combined Braun-Blanquet matrix (species × plots), floristic CSV, simplified-list CSV, full project JSON.
- **Field bundle (ZIP)** for GIS: `punkty.geojson` (points, WGS84 / CRS84), `gatunki.csv` (long table joined to points by `point_id` — ready for a relation/join in QGIS), `foto/` (image files), `slad.gpx`, `projekt.json` and a `README.txt`.

### Running it
1. Host the file on any HTTPS location (e.g. **GitHub Pages**) and open it on a phone.
2. Grant the location permission on first GPS use, then **Add to Home screen** to run it like a native app.

> **Note on GPS:** the Geolocation API requires a *secure context* (HTTPS or `localhost`). Opening the file directly from disk (`file://`) lets the map, crosshair points and photos work, but **the browser will block GPS** — so serve it over HTTPS for live tracking.

### Offline
Survey forms, GPS recording, photos and all exports work offline. Only the **map tiles** and the first load of the libraries need a network connection.

### Data & privacy
All data stays **on the device** (browser `localStorage` for records, `IndexedDB` for photos). Nothing is uploaded; there is no tracking and no backend. Use **Export → project (.json)** or the **ZIP bundle** to back up or move data to another device. Note that browser storage is tied to the page's origin, so data created at `file://` does not carry over to the HTTPS address.

### Tech
Single-file HTML / CSS / JavaScript. [Leaflet](https://leafletjs.com/) 1.9.4 for the map, [JSZip](https://stuk.github.io/jszip/) 3.10.1 for the bundle. No build step, no dependencies to install.

---

## Polski

### Do czego służy
FitoTerrain łączy trzy narzędzia terenowe w jednej aplikacji zaprojektowanej pod telefon:
- **mapę Leaflet** z granicami działek wczytywanymi z **KML / GeoJSON** (wraz z powierzchnią w hektarach),
- **badania botaniczne** przypisane do punktów na tej mapie,
- **ślad GPX** z przejścia terenowego.

### Funkcje
**Mapa**
- Podkłady: OpenStreetMap oraz ortofoto Esri.
- Wczytywanie granic działek z `.kml` / `.geojson` / `.json` (zapamiętywane między sesjami).
- Punkt badawczy stawiany w **pozycji GPS** lub precyzyjnie przez **celownik na środku** ("przesuń mapę i *Dodaj punkt tutaj*") — ten drugi sposób działa nawet bez GPS.

**Ślad GPX**
- **Nagrywanie na żywo** z GPS telefonu (start / pauza / stop, statystyki: punkty, dystans, czas, dokładność).
- **Rysowanie ręczne** przez dotyk mapy.
- Import istniejącego śladu `.gpx`.

**Punkty badawcze — trzy przełączane typy na punkcie**
- **Zdjęcie fitosocjologiczne** (Braun-Blanquet): warstwy A–D, skala pokrycia `5, 4, 3, 2, 1, +, r`.
- **Lista florystyczna**: gatunki z częstością `+ … +++++`.
- **Spis uproszczony**: do **5 gatunków panujących** (z udziałem %) oraz do **15 gatunków wskaźnikowych / charakterystycznych** (sama obecność).

**Wspólna, zwijalna główka opisu** (dla wszystkich typów)
- Autor, data, **dwie fotografie terenowe**, powierzchnia, ekspozycja, nachylenie, **podłoże** (5 klas) i **uwilgotnienie** (4 klasy), zwarcia / wysokości warstw (zdjęcie), uwagi.
- Główka jest **domyślnie zwinięta**, by nie zabierać ekranu podczas zbierania gatunków, i **kopiuje się automatycznie z poprzedniego punktu**, co oszczędza czas (jest też przycisk ręcznego kopiowania).

**Fotografie**
- Po dwie na punkt, robione aparatem urządzenia, skalowane na potrzeby terenu (~2400 px) i przechowywane w **IndexedDB**.

**Baza gatunków**
- ok. 4060 taksonów (rośliny naczyniowe, mszaki, porosty) z wyszukiwaniem po akronimie oraz nazwie łacińskiej/polskiej i **wyszukiwaniem głosowym** (pl-PL).
- Import / eksport bazy w formacie CSV.

**Eksport**
- Pojedynczy: GPX, CSV zdjęć, zbiorcza tabela Braun-Blanquet (gatunki × zdjęcia), CSV list florystycznych, CSV spisów uproszczonych, pełny projekt JSON.
- **Paczka terenowa (ZIP)** do GIS: `punkty.geojson` (punkty, WGS84 / CRS84), `gatunki.csv` (tabela długa łączona z punktami po polu `point_id` — gotowa do relacji/złączenia w QGIS), `foto/` (pliki zdjęć), `slad.gpx`, `projekt.json` oraz `README.txt`.

### Uruchomienie
1. Umieść plik w dowolnym miejscu po HTTPS (np. **GitHub Pages**) i otwórz na telefonie.
2. Przy pierwszym użyciu GPS zezwól na lokalizację, a następnie **Dodaj do ekranu głównego**, by działał jak aplikacja natywna.

> **Uwaga o GPS:** API geolokalizacji wymaga *bezpiecznego kontekstu* (HTTPS lub `localhost`). Otwarcie pliku bezpośrednio z dysku (`file://`) pozwala korzystać z mapy, punktów z celownika i fotografii, ale **przeglądarka zablokuje GPS** — do śledzenia na żywo udostępnij plik przez HTTPS.

### Praca offline
Formularze, nagrywanie GPS, fotografie i wszystkie eksporty działają offline. Połączenia z siecią wymagają jedynie **kafelki mapy** oraz pierwsze załadowanie bibliotek.

### Dane i prywatność
Wszystkie dane pozostają **na urządzeniu** (`localStorage` dla zapisów, `IndexedDB` dla zdjęć). Nic nie jest wysyłane, nie ma śledzenia ani serwera. Do kopii zapasowej lub przeniesienia na inne urządzenie użyj **Eksport → projekt (.json)** albo **paczki ZIP**. Pamiętaj, że magazyn przeglądarki jest powiązany z adresem strony, więc dane utworzone pod `file://` nie przeniosą się na adres HTTPS.

### Technologia
Pojedynczy plik HTML / CSS / JavaScript. [Leaflet](https://leafletjs.com/) 1.9.4 do mapy, [JSZip](https://stuk.github.io/jszip/) 3.10.1 do paczki. Bez kroku budowania i bez zależności do instalacji.

---

## License / Licencja

GPL-2.0 — see [`LICENSE`](LICENSE). / GPL-2.0 — zob. plik [`LICENSE`](LICENSE).

## Author / Autor

**Andrzej Rodziewicz** — Arenaria sp. z o.o., Poznań.
