/**
 * Fichier: musicProposition.ts
 * Description: Ce fichier contient la logique pour proposer une musique depuis notre base de données MongoDB,
 * vérifier la dernière connexion d'un utilisateur à l'application
 * et pour déterminer s'il est nécessaire de lancer une requête.
 * Auteurs: Yoann PETIT, Simon MANIEZ
 * Date de création: 31 janvier 2023
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
        while (_) try {
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
var MongoClientProposition = require('mongodb').MongoClient;
/**
 * Fonction sans paramètre retournant un enregistrement musical provenant de la base de données de Discoverio
 * Cette base contient des enregistrements musicaux ayant Deezer pour source.
 */
function getOneRandomAlbum() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, albumIds, un_album, album, alb_json, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MongoClientProposition.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })];
                case 1:
                    client = _a.sent();
                    db = client.db('albums');
                    return [4 /*yield*/, db.collection("albums").distinct("resultat.id")];
                case 2:
                    albumIds = _a.sent();
                    un_album = albumIds[Math.floor(Math.random() * albumIds.length)];
                    return [4 /*yield*/, db.collection("albums").findOne({ "resultat.id": un_album })];
                case 3:
                    album = _a.sent();
                    console.log("Search for " + un_album + " Album...");
                    alb_json = album.resultat;
                    for (i in alb_json) {
                        if (alb_json[i].id === un_album) {
                            console.log(alb_json[i].id + " true because find " + un_album);
                            console.log(alb_json[i]);
                        }
                    }
                    // return album;
                    client.close();
                    return [2 /*return*/];
            }
        });
    });
}
var lastExecutionTime = new Date(2023, 0, 31, 14, 35);
/**
 * Si la dernière exécution remonte à moins de 24 heures, l'execution n'est pas réalisée.
 * Le temps restant avant la prochaine exécution est indiqué lors du refus.
 * Sinon, la fonction exécute la requête.
 * @Retourne la valeur d'un enregistrement musical aléatoire.
 */
function checkAndExecute() {
    var currentTime = new Date();
    console.log("currentTime:", currentTime);
    console.log("lastExecutionTime:", lastExecutionTime);
    if (lastExecutionTime && currentTime.getTime() - lastExecutionTime.getTime() < 24 * 60 * 60 * 1000) {
        var remainingTime = 24 * 60 * 60 * 1000 - (currentTime.getTime() - lastExecutionTime.getTime());
        var days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
        var hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
        var minutes = Math.floor(remainingTime / 1000 / 60) % 60;
        var seconds = Math.floor(remainingTime / 1000) % 60;
        console.log("La requ\u00EAte a \u00E9t\u00E9 ex\u00E9cut\u00E9e r\u00E9cemment, veuillez patienter " + days + " jours, " + hours + " heures, " + minutes + " minutes et " + seconds + " secondes.");
        return;
    }
    lastExecutionTime = currentTime;
    // Lancer la requête ici
    console.log("Lancement de la requête...");
    console.log(getOneRandomAlbum());
}
// Appeler cette fonction lors de la connexion d'un utilisateur à l'application
checkAndExecute();
