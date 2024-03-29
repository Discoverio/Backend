"use strict";
/**
 * Fichier: musicExtraction.ts
 * Description: Ce fichier contient la logique pour récupérer aléatoirement des enregistrements musicaux
 * avec deezer-public-api, package interrogant l'api officiel de Deezer et les stocker dans une base de données MongoDB
 * Auteurs: Simon MANIEZ, Yoann PETIT
 * Date de création: 31 janvier 2023
 * Date de modification: 03 mars 2023
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getArtistByAlbumId = exports.getGenres = void 0;
var DeezerPublicApi = require('deezer-public-api');
var deezer = new DeezerPublicApi();
var MongoClientExtract = require('mongodb').MongoClient;
/**
* Renvoie un nombre entier aléatoire entre les valeurs min et max.
 * @param min - Le nombre minimum que vous voulez générer.
 * @param max - Le nombre maximum de la plage.
 * @returns Un nombre aléatoire entre les valeurs min et max.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Elle génère un nombre aléatoire entre 044456 et 999999, et le renvoie.
 * @returns Un nombre aléatoire entre 044456 et 999999.
 */
function generateAlbumIDForDeezerAPI() {
    var randomID = getRandomInt('0o44456', 999999);
    return randomID;
}
/*
1. Générer 50 ID d'album aléatoires
2. Pour chaque ID d'album, une requête est réalisée à l'API de Deezer.
3. Enregistrez la réponse
*/
var ids = [];
for (var i = 0; i < 50; i++) {
    var q = generateAlbumIDForDeezerAPI();
    ids.push(q);
}
// traiter le cas où un id serait déjà présent
var UniqueIdList = ids.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
});
/**
 * La fonction se connecte au serveur MongoDB, insère l'objet album dans la collection albums s'il n'est pas présent,
 * puis ferme la connexion
 * @param album
 */
function insertAlbum(album) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collection, existingAlbum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MongoClientExtract.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })];
                case 1:
                    client = _a.sent();
                    db = client.db('albums');
                    collection = db.collection('albums');
                    return [4 /*yield*/, collection.findOne({ id: album })];
                case 2:
                    existingAlbum = _a.sent();
                    if (existingAlbum) {
                        console.log("L'album avec l'ID ".concat(album, " existe d\u00E9j\u00E0 dans la collection."));
                        client.close();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, collection.insertOne({ id: album })];
                case 3:
                    _a.sent();
                    getArtistByAlbumId(album);
                    client.close();
                    return [2 /*return*/];
            }
        });
    });
}
// Envoyer plusieurs requête avec des ID aléatoires.
var promises = UniqueIdList.map(function (id) { return deezer.artist.albums("".concat(id)).then(function (responses) {
    // On vérifie qu'un album possède bien au moins un titre. Sinon, il est inexistant ou vide.
    if ((responses.total !== 0)) {
        var resultat = "";
        for (var i in responses) {
            if (responses.hasOwnProperty(i)) {
                if (i == "data") {
                    resultat = JSON.parse(JSON.stringify(responses[i]));
                    console.log(resultat);
                    insertAlbum({ resultat: resultat });
                }
            }
        }
    }
}); });
// artistes
// genres
/**
 * Cette va récupérer la liste de tous les genres musicaux de l'api Deezer
 * @returns Les genres sous forme JSON.
 */
function getGenres() {
    return __awaiter(this, void 0, void 0, function () {
        var response, genres, documents_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, deezer.genre()];
                case 1:
                    response = _a.sent();
                    genres = response.data;
                    documents_1 = [];
                    genres.forEach(function (genre) {
                        var document = {
                            id: genre.id,
                            name: genre.name,
                            picture: genre.picture
                        };
                        documents_1.push(document);
                    });
                    return [2 /*return*/, documents_1];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getGenres = getGenres;
function getArtistByAlbumId(albumId) {
    return __awaiter(this, void 0, void 0, function () {
        var deezer, album, artistId, artist, mongoClient, db, artistsCollection, existingArtist, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deezer = new DeezerPublicApi();
                    return [4 /*yield*/, deezer.album.tracks(albumId)];
                case 1:
                    album = _a.sent();
                    artistId = album.data[0].artist.id;
                    return [4 /*yield*/, deezer.artist(artistId)];
                case 2:
                    artist = _a.sent();
                    return [4 /*yield*/, MongoClientExtract.connect('mongodb://localhost:27017')];
                case 3:
                    mongoClient = _a.sent();
                    db = mongoClient.db('albums');
                    artistsCollection = db.collection('artists');
                    return [4 /*yield*/, artistsCollection.findOne({ id: artist.id })];
                case 4:
                    existingArtist = _a.sent();
                    if (existingArtist) {
                        return [2 /*return*/, existingArtist];
                    }
                    return [4 /*yield*/, artistsCollection.insertOne(artist)];
                case 5:
                    result = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getArtistByAlbumId = getArtistByAlbumId;
// Fonction pour insérer les genres dans la collection "genres" de la base de données "albums"
function insertGenres(genres) {
    return __awaiter(this, void 0, void 0, function () {
        var client2, collection_1, insertPromises, results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client2 = new MongoClientExtract('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 7]);
                    return [4 /*yield*/, client2.connect()];
                case 2:
                    _a.sent();
                    collection_1 = client2.db("albums").collection("genres");
                    insertPromises = genres.map(function (genre) {
                        return collection_1.insertOne(genre);
                    });
                    return [4 /*yield*/, Promise.all(insertPromises)];
                case 3:
                    results = _a.sent();
                    console.log("".concat(results.length, " genres ont \u00E9t\u00E9 ins\u00E9r\u00E9s dans la collection."));
                    return [3 /*break*/, 7];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, client2.close()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Appel des fonctions pour récupérer et insérer les genres [cette fonction s'appelle une fois seulement]
//   getGenres().then(genres => {
//     insertGenres(genres);
//   }).catch(error => {
//     console.error(error);
//   });
