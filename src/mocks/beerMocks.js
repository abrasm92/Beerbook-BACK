const singleBeer = {
  id: "6297a8369ab4b03687f15b72",
  name: "Sofie",
  brewery: "Goose Island",
  style: "Belgian season",
  degrees: 6.5,
  IBU: 25,
  country: "EEUU",
  description:
    "Cerveza de color ámbar, con aromas intensos de cítricos, con final lig…",
  image: "215615460324502435058-fake-file.png",
  imageBackup: "215615460324502435058-fake-file.png",
  owner: null,
};

const groupOfBeer = [
  {
    id: "6297a8369ab4b03687f15b72",
    name: "Sofie",
    brewery: "Goose Island",
    style: "Belgian season",
    degrees: 6.5,
    IBU: 25,
    country: "EEUU",
    description:
      "Cerveza de color ámbar, con aromas intensos de cítricos, con final lig…",
    image: null,
    imageBackup: null,
    owner: null,
  },
  {
    id: "6297a8369ab4b03687f15b73",
    name: "Breakfast Stout",
    brewery: "Founders",
    style: "Imperial Stout",
    degrees: 8.3,
    IBU: 60,
    country: "EEUU",
    description:
      "Cerveza negra con gran espuma color marrón con arómas predominantes a …",
    image: null,
    imageBackup: null,
    owner: null,
  },
  {
    id: "6297a8369ab4b03687f15b7a",
    name: "Ginette Natural Christmas",
    brewery: "Brasserie La Binchoise",
    style: "Belgian Strong Ale",
    degrees: 8.5,
    IBU: null,
    country: "Bélgica",
    description:
      "Cerveza rojiza oscura con espuma densa, cuerpo medio suave y aromatica…",
    image: null,
    imageBackup: null,
    owner: null,
  },
];

const longGroupOfBeers = [
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
  groupOfBeer[0],
  groupOfBeer[1],
  groupOfBeer[2],
];

module.exports = { singleBeer, groupOfBeer, longGroupOfBeers };
