# special-octo-fortnight
calendar-app

## Kuvaus
Toteutetaan **Tapahtumakalenteri**, jossa käyttäjät voivat lisätä, muokata, poistaa ja tarkastella tapahtumia. Sovellus toimii Node.js + SQLite3, ja käyttöliittymä Reactilla. Käyttöliittymässä on kalenterinäkymä ja tapahtumalistaus. Sovellus tallentaa tiedot paikalliseen tietokantaan ja toimii myös paikallisessa virtuaalikoneessa (VM).

---

## Käyttäjäpersoonat
| Rooli                | Tarpeet                                                                |
|----------------------|------------------------------------------------------------------------|
| Tavallinen käyttäjä  | Haluaa nähdä tulevat tapahtumat ja lisätä henkilökohtaisia tapahtumia  |
| Tapahtumajärjestäjä  | Lisää yleisiä tapahtumia ja hallinnoi niitä (päivitys, poisto)         |

---

## Käyttötapaukset
| Käyttötapaus               | Kuvaus                                                                 |
|----------------------------|------------------------------------------------------------------------|
| 1. Tapahtuman lisääminen   | Käyttäjä täyttää lomakkeen ja tallentaa uuden tapahtuman tietokantaan. |
| 2. Tapahtuman tarkastelu   | Käyttäjä näkee kalenterista tapahtuman tiedot (esim. aika, paikka).    |
| 3. Tapahtuman muokkaaminen | Käyttäjä voi päivittää tapahtuman tietoja (esim. ajankohta, kuvaus).   |
| 4. Tapahtuman poistaminen  | Käyttäjä voi poistaa ei-tarpeellisia tapahtumia.                       |
| 5. Tapahtumien suodatus    | Käyttäjä suodattaa tapahtumat päivämäärän tai sijainnin mukaan.        |

---

## Käyttöliittymäprototyypit
- Kalenterinäkymä, jossa käyttäjä näkee päivittäiset tapahtumat.
- Tapahtuman lisäys-/muokkauslomake.
- Lista tulevista tapahtumista (suodatus- ja hakutoiminnot).

Uizard UI prototyyppi:
![ui proto](https://github.com/user-attachments/assets/27a024bb-3e04-4128-aa5f-92d19fa1cfc1)


---

## Tietoarkkitehtuuri ja tekninen suunnittelu
### Teknologiat:
- **Frontend:** React
- **Backend:** Node.js + Express
- **Tietokanta:** SQLite3
- **Kehitysympäristö:** Paikallinen kehitys + mahdollisuus käyttää virtuaalikonetta (VM)

---

## API-endpointit:
| Metodi 	| Endpoint     	    | Toiminto                  |
|---------  |-------------------|---------------------------|
| GET       | /api/events     	| Hae kaikki tapahtumat     |
| POST   	| /api/events     	| Lisää uusi tapahtuma      |
| GET    	| /api/events/:id 	| Hae yksittäinen tapahtuma |
| PUT    	| /api/events/:id 	| Muokkaa tapahtumaa        |
| DELETE 	| /api/events/:id 	| Poista tapahtuma          |

---

## Projektinhallinta:
- Versionhallinta: Git 
- Käyttö virtuaalikoneessa paikallisesti (VM) 
- Käyttäjätestaus: Testaus paikallisesti

---
