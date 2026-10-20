# Meridian-data

Tämä repo on jatkokatsauksen julkaistu data. Sivu ei hae mallia jokaiselle kävijälle. Se lataa nämä kaksi tiedostoa:

- `edition.json` — otsikko, tekstit, lähteet, maanantain lista ja kalenteri
- `desks.json` — family office -hajautus, raporttitaulukko, ELTIF-luvut ja private market -virrat

## Päivitys

1. Muokkaa `edition.json` tai `desks.json` GitHubissa.
2. Commit `main`-haaraan.
3. Sivun ”Lataa uusin GitHubista” hakee tiedostot heti. Ilman nappia palvelin käyttää korkeintaan viiden minuutin välimuistia.

Älä keksi lukuja. Jos lukua ei ole lähteessä, jätä se pois tai sano se tekstissä.

## Tarkistus

Jokainen push `main`-haaraan ajaa `.github/workflows/validate.yml`. Se hylkää tiedoston, josta puuttuu pakollinen kenttä.
