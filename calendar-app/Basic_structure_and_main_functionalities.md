# Projektin vaihe 2 – Perusrunko ja päätoiminnallisuudet

## 1. Kehitysympäristö

Projektin teknologiat:

- **Backend:** Node.js, Express.js
- **Frontend:** React 
- **Tietokanta:** SQLite3
- **Kehitysympäristöt:**
  - Paikallinen kehitys Windows 11:llä (PowerShell ja Git Bash)
  - Testattu myös Debian-virtuaalikoneessa SSH:n ja Visual Studio Coden kautta
- **Muut työkalut:** npm, Git, GitHub, VS Code, Oracle VirtualBox, Debian

---

## 2. Backend

- Backend on toteutettu **Expressillä**, ja tietokantana käytetään **SQLite3**:a.
- Palvelin toimii portissa `3001` ja tarjoaa REST-rajapinnan:
  - Tapahtumien haku
  - Tapahtuman lisäys
  - Tapahtuman muokkaus
  - Tapahtuman poisto
- CORS on käytössä, jotta frontend voi kommunikoida taustapalvelimen kanssa.

**Käynnistys:**

- cd backend
- node index.js

---

## 3. Frontend
Frontend on toteutettu Reactilla, ja siihen on asennettu mm. seuraavat kirjastot:

- react-big-calendar ja date-fns kalenterinäkymään

- axios rajapintayhteyksiin

- react-bootstrap ja bootstrap käyttöliittymäkomponentteihin

**Käyttöliittymä sisältää:**

- Kalenterinäkymän

- Tapahtumalistauksen

- Tapahtuman lisäys- ja muokkauslomakkeet (modaali)

**Käynnistys:**

- cd frontend
- npm start

---

## 4. Tietokanta
Käytössä on paikallinen SQLite-tietokantatiedosto events.db, joka sijaitsee backend-kansiossa.

- Tietokannassa on yksi taulu tapahtumille: Otsikko, kuvaus, sijainti, alkamis- ja päättymisaika

- Yhteys tietokantaan muodostetaan index.js-tiedostossa backendissä.

---

## 5. Rakenne ja arkkitehtuuri
Projekti on jaettu kahteen pääkansioon: backend ja frontend

Selkeä vastuunjako:

- Backend huolehtii tietokannasta ja API:sta

- Frontend vastaa käyttöliittymästä ja vuorovaikutuksesta

- React-komponentit on jaettu loogisesti src-kansioon

- Kommunikointi tapahtuu REST-rajapinnan kautta

---

## 6. Toiminnallisuudet
Toteutettu:

- Tapahtuman lisääminen

- Tapahtuman muokkaus

- Tapahtuman poistaminen

- Tapahtumien tarkastelu kalenterinäkymässä

- Tapahtumien listaus näkymässä

💡 Kaikki keskeiset toiminnot on testattu sekä paikallisesti että VM-ympäristössä.

---

## 7. Koodin laatu ja dokumentaatio

- Koodi on jaettu modulaarisesti ja kommentoitu

- API-reitit on selkeitä ja helposti luettavia

- React-komponentit on nimetty ja eritelty loogisesti

- Projekti on versionhallinnassa Gitin ja GitHubin kautta

---

## 8. Testaus ja virheenkäsittely

- Backendissä on toteutettu perustason virheenkäsittelyä API-pyyntöihin

- Frontend näyttää käyttäjälle ilmoituksia esim. lisäyksen tai poiston onnistuessa

- Virtuaalikoneella ajaminen testattiin toimivuuden varmistamiseksi

- Kaikki päätoiminnallisuudet on testattu manuaalisesti

---

## 9. Käyttöliittymä ja vuorovaikutus
- Käyttöliittymä on selkeä 

- Highlight on hover efekti kalenterinäkymässä.

- Edellinen, Tänään ja Seuraava painikkeiden avulla voi selata kuukausia eteen- tai taaksepäin

- Litistyvän tai laajenevan sivupalkin avulla käyttäjä voi vaihtaa näkymää (kalenteri / tapahtumalistaus)

- Käyttäjä voi lisätä tapahtuman, muokata tai poistaa tapahtuman kalenterin päivää tai tapahtumaa klikkaamalla.

- Tapahtumalista -näkymä listaa tulevat tapahtumat järjestyksessä, lähin pvm ensin. 

- Listasta pystyy muokata tai poistaa tapahtuman. 

- Käyttöliittymä on lokalisoitu suomeksi (esim. viikonpäivien lyhenteet)

---