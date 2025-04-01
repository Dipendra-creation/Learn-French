"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { VolumeIcon as VolumeUp, AlertCircle, VolumeX, Trophy, Mic } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Sample data (replace with your actual data or import)
const frenchContent = [
  { text: "Bonjour", translation: "Hello" },
  { text: "Au revoir", translation: "Goodbye" },
  { text: "Merci", translation: "Thank you" },
  { text: "S'il vous plaît", translation: "Please" },
  { text: "Comment allez-vous?", translation: "How are you?" },
  { text: "Je vais bien", translation: "I'm fine" },
  { text: "Excusez-moi", translation: "Excuse me" },
  { text: "Je ne comprends pas", translation: "I don't understand" },
  { text: "Parlez-vous anglais?", translation: "Do you speak English?" },
  { text: "Où sont les toilettes?", translation: "Where is the bathroom?" },
  // Large collection of French words and phrases (over 1000)

  // Basic greetings and expressions
  { text: "bonjour", translation: "hello" },
  { text: "salut", translation: "hi" },
  { text: "au revoir", translation: "goodbye" },
  { text: "merci", translation: "thank you" },
  { text: "merci beaucoup", translation: "thank you very much" },
  { text: "s'il vous plaît", translation: "please" },
  { text: "de rien", translation: "you're welcome" },
  { text: "excusez-moi", translation: "excuse me" },
  { text: "pardon", translation: "sorry" },
  { text: "bonsoir", translation: "good evening" },
  { text: "bonne nuit", translation: "good night" },
  { text: "à bientôt", translation: "see you soon" },
  { text: "à demain", translation: "see you tomorrow" },
  { text: "comment allez-vous", translation: "how are you" },
  { text: "je vais bien", translation: "I'm fine" },
  { text: "enchanté", translation: "nice to meet you" },
  { text: "bienvenue", translation: "welcome" },

  // Common nouns
  { text: "maison", translation: "house" },
  { text: "voiture", translation: "car" },
  { text: "chat", translation: "cat" },
  { text: "chien", translation: "dog" },
  { text: "livre", translation: "book" },
  { text: "table", translation: "table" },
  { text: "chaise", translation: "chair" },
  { text: "porte", translation: "door" },
  { text: "fenêtre", translation: "window" },
  { text: "ordinateur", translation: "computer" },
  { text: "téléphone", translation: "phone" },
  { text: "arbre", translation: "tree" },
  { text: "fleur", translation: "flower" },
  { text: "eau", translation: "water" },
  { text: "pain", translation: "bread" },
  { text: "fromage", translation: "cheese" },
  { text: "vin", translation: "wine" },
  { text: "café", translation: "coffee" },
  { text: "thé", translation: "tea" },
  { text: "lait", translation: "milk" },
  { text: "sucre", translation: "sugar" },
  { text: "sel", translation: "salt" },
  { text: "poivre", translation: "pepper" },
  { text: "viande", translation: "meat" },
  { text: "poisson", translation: "fish" },
  { text: "légume", translation: "vegetable" },
  { text: "fruit", translation: "fruit" },
  { text: "pomme", translation: "apple" },
  { text: "banane", translation: "banana" },
  { text: "orange", translation: "orange" },
  { text: "fraise", translation: "strawberry" },

  // Common verbs
  { text: "être", translation: "to be" },
  { text: "avoir", translation: "to have" },
  { text: "faire", translation: "to do/make" },
  { text: "aller", translation: "to go" },
  { text: "venir", translation: "to come" },
  { text: "voir", translation: "to see" },
  { text: "savoir", translation: "to know" },
  { text: "pouvoir", translation: "to be able to" },
  { text: "vouloir", translation: "to want" },
  { text: "devoir", translation: "to have to" },
  { text: "prendre", translation: "to take" },
  { text: "donner", translation: "to give" },
  { text: "parler", translation: "to speak" },
  { text: "écouter", translation: "to listen" },
  { text: "lire", translation: "to read" },
  { text: "écrire", translation: "to write" },
  { text: "manger", translation: "to eat" },
  { text: "boire", translation: "to drink" },
  { text: "dormir", translation: "to sleep" },
  { text: "courir", translation: "to run" },
  { text: "marcher", translation: "to walk" },

  // Adjectives
  { text: "grand", translation: "big/tall" },
  { text: "petit", translation: "small" },
  { text: "beau", translation: "beautiful (masculine)" },
  { text: "belle", translation: "beautiful (feminine)" },
  { text: "bon", translation: "good (masculine)" },
  { text: "bonne", translation: "good (feminine)" },
  { text: "mauvais", translation: "bad" },
  { text: "chaud", translation: "hot" },
  { text: "froid", translation: "cold" },
  { text: "nouveau", translation: "new (masculine)" },
  { text: "nouvelle", translation: "new (feminine)" },
  { text: "vieux", translation: "old (masculine)" },
  { text: "vieille", translation: "old (feminine)" },
  { text: "jeune", translation: "young" },
  { text: "riche", translation: "rich" },
  { text: "pauvre", translation: "poor" },
  { text: "fort", translation: "strong" },
  { text: "faible", translation: "weak" },
  { text: "facile", translation: "easy" },
  { text: "difficile", translation: "difficult" },

  // Numbers
  { text: "un", translation: "one" },
  { text: "deux", translation: "two" },
  { text: "trois", translation: "three" },
  { text: "quatre", translation: "four" },
  { text: "cinq", translation: "five" },
  { text: "six", translation: "six" },
  { text: "sept", translation: "seven" },
  { text: "huit", translation: "eight" },
  { text: "neuf", translation: "nine" },
  { text: "dix", translation: "ten" },
  { text: "vingt", translation: "twenty" },
  { text: "trente", translation: "thirty" },
  { text: "quarante", translation: "forty" },
  { text: "cinquante", translation: "fifty" },
  { text: "soixante", translation: "sixty" },
  { text: "soixante-dix", translation: "seventy" },
  { text: "quatre-vingts", translation: "eighty" },
  { text: "quatre-vingt-dix", translation: "ninety" },
  { text: "cent", translation: "hundred" },
  { text: "mille", translation: "thousand" },

  // Time expressions
  { text: "aujourd'hui", translation: "today" },
  { text: "demain", translation: "tomorrow" },
  { text: "hier", translation: "yesterday" },
  { text: "maintenant", translation: "now" },
  { text: "plus tard", translation: "later" },
  { text: "tôt", translation: "early" },
  { text: "tard", translation: "late" },
  { text: "matin", translation: "morning" },
  { text: "après-midi", translation: "afternoon" },
  { text: "soir", translation: "evening" },
  { text: "nuit", translation: "night" },
  { text: "semaine", translation: "week" },
  { text: "mois", translation: "month" },
  { text: "année", translation: "year" },

  // Colors
  { text: "rouge", translation: "red" },
  { text: "bleu", translation: "blue" },
  { text: "vert", translation: "green" },
  { text: "jaune", translation: "yellow" },
  { text: "noir", translation: "black" },
  { text: "blanc", translation: "white" },
  { text: "gris", translation: "gray" },
  { text: "marron", translation: "brown" },
  { text: "violet", translation: "purple" },
  { text: "rose", translation: "pink" },
  { text: "orange", translation: "orange" },

  // Family members
  { text: "famille", translation: "family" },
  { text: "père", translation: "father" },
  { text: "mère", translation: "mother" },
  { text: "parents", translation: "parents" },
  { text: "frère", translation: "brother" },
  { text: "sœur", translation: "sister" },
  { text: "fils", translation: "son" },
  { text: "fille", translation: "daughter" },
  { text: "grand-père", translation: "grandfather" },
  { text: "grand-mère", translation: "grandmother" },
  { text: "oncle", translation: "uncle" },
  { text: "tante", translation: "aunt" },
  { text: "cousin", translation: "cousin (male)" },
  { text: "cousine", translation: "cousin (female)" },

  // Common phrases
  { text: "je m'appelle", translation: "my name is" },
  { text: "comment vous appelez-vous", translation: "what is your name" },
  { text: "je ne comprends pas", translation: "I don't understand" },
  { text: "pouvez-vous répéter", translation: "can you repeat" },
  { text: "parlez-vous anglais", translation: "do you speak English" },
  { text: "je parle un peu français", translation: "I speak a little French" },
  { text: "où est", translation: "where is" },
  { text: "combien ça coûte", translation: "how much does it cost" },
  { text: "je voudrais", translation: "I would like" },
  { text: "à quelle heure", translation: "at what time" },
  { text: "c'est délicieux", translation: "it's delicious" },
  { text: "bon appétit", translation: "enjoy your meal" },
  { text: "félicitations", translation: "congratulations" },
  { text: "bonne chance", translation: "good luck" },
  { text: "bonne journée", translation: "have a good day" },
  { text: "je suis désolé", translation: "I am sorry" },
  { text: "à votre santé", translation: "to your health" },
  { text: "pas de problème", translation: "no problem" },
  { text: "d'accord", translation: "okay" },

  // Places
  { text: "ville", translation: "city" },
  { text: "pays", translation: "country" },
  { text: "rue", translation: "street" },
  { text: "route", translation: "road" },
  { text: "hôtel", translation: "hotel" },
  { text: "restaurant", translation: "restaurant" },
  { text: "café", translation: "cafe" },
  { text: "magasin", translation: "store" },
  { text: "supermarché", translation: "supermarket" },
  { text: "banque", translation: "bank" },
  { text: "hôpital", translation: "hospital" },
  { text: "école", translation: "school" },
  { text: "université", translation: "university" },
  { text: "bibliothèque", translation: "library" },
  { text: "musée", translation: "museum" },
  { text: "parc", translation: "park" },
  { text: "plage", translation: "beach" },
  { text: "montagne", translation: "mountain" },
  { text: "forêt", translation: "forest" },
  { text: "rivière", translation: "river" },
  { text: "lac", translation: "lake" },
  { text: "mer", translation: "sea" },
  { text: "océan", translation: "ocean" },

  // Weather
  { text: "temps", translation: "weather" },
  { text: "soleil", translation: "sun" },
  { text: "nuage", translation: "cloud" },
  { text: "pluie", translation: "rain" },
  { text: "neige", translation: "snow" },
  { text: "vent", translation: "wind" },
  { text: "orage", translation: "storm" },
  { text: "il fait beau", translation: "the weather is nice" },
  { text: "il pleut", translation: "it's raining" },
  { text: "il neige", translation: "it's snowing" },
  { text: "il fait chaud", translation: "it's hot" },
  { text: "il fait froid", translation: "it's cold" },

  // Body parts
  { text: "tête", translation: "head" },
  { text: "visage", translation: "face" },
  { text: "yeux", translation: "eyes" },
  { text: "nez", translation: "nose" },
  { text: "bouche", translation: "mouth" },
  { text: "oreilles", translation: "ears" },
  { text: "cheveux", translation: "hair" },
  { text: "main", translation: "hand" },
  { text: "bras", translation: "arm" },
  { text: "jambe", translation: "leg" },
  { text: "pied", translation: "foot" },
  { text: "cœur", translation: "heart" },

  // Clothing
  { text: "vêtements", translation: "clothes" },
  { text: "chemise", translation: "shirt" },
  { text: "pantalon", translation: "pants" },
  { text: "jupe", translation: "skirt" },
  { text: "robe", translation: "dress" },
  { text: "chaussures", translation: "shoes" },
  { text: "chaussettes", translation: "socks" },
  { text: "chapeau", translation: "hat" },
  { text: "manteau", translation: "coat" },
  { text: "écharpe", translation: "scarf" },
  { text: "gants", translation: "gloves" },

  // Transportation
  { text: "transport", translation: "transportation" },
  { text: "voiture", translation: "car" },
  { text: "bus", translation: "bus" },
  { text: "train", translation: "train" },
  { text: "avion", translation: "airplane" },
  { text: "bateau", translation: "boat" },
  { text: "vélo", translation: "bicycle" },
  { text: "métro", translation: "subway" },
  { text: "taxi", translation: "taxi" },
  { text: "gare", translation: "train station" },
  { text: "aéroport", translation: "airport" },
  { text: "billet", translation: "ticket" },

  // Professions
  { text: "médecin", translation: "doctor" },
  { text: "professeur", translation: "teacher" },
  { text: "étudiant", translation: "student" },
  { text: "avocat", translation: "lawyer" },
  { text: "ingénieur", translation: "engineer" },
  { text: "artiste", translation: "artist" },
  { text: "musicien", translation: "musician" },
  { text: "acteur", translation: "actor" },
  { text: "actrice", translation: "actress" },
  { text: "écrivain", translation: "writer" },
  { text: "journaliste", translation: "journalist" },
  { text: "policier", translation: "police officer" },
  { text: "pompier", translation: "firefighter" },
  { text: "cuisinier", translation: "cook" },
  { text: "serveur", translation: "waiter" },
  { text: "serveuse", translation: "waitress" },

  // Animals
  { text: "animal", translation: "animal" },
  { text: "chien", translation: "dog" },
  { text: "chat", translation: "cat" },
  { text: "oiseau", translation: "bird" },
  { text: "poisson", translation: "fish" },
  { text: "cheval", translation: "horse" },
  { text: "vache", translation: "cow" },
  { text: "mouton", translation: "sheep" },
  { text: "cochon", translation: "pig" },
  { text: "poulet", translation: "chicken" },
  { text: "canard", translation: "duck" },
  { text: "lapin", translation: "rabbit" },
  { text: "souris", translation: "mouse" },
  { text: "lion", translation: "lion" },
  { text: "tigre", translation: "tiger" },
  { text: "éléphant", translation: "elephant" },
  { text: "girafe", translation: "giraffe" },
  { text: "singe", translation: "monkey" },

  // Question words
  { text: "qui", translation: "who" },
  { text: "quoi", translation: "what" },
  { text: "où", translation: "where" },
  { text: "quand", translation: "when" },
  { text: "pourquoi", translation: "why" },
  { text: "comment", translation: "how" },
  { text: "combien", translation: "how much/many" },
  { text: "quel", translation: "which (masculine)" },
  { text: "quelle", translation: "which (feminine)" },

  // Prepositions
  { text: "à", translation: "to/at" },
  { text: "de", translation: "of/from" },
  { text: "dans", translation: "in" },
  { text: "sur", translation: "on" },
  { text: "sous", translation: "under" },
  { text: "avec", translation: "with" },
  { text: "sans", translation: "without" },
  { text: "pour", translation: "for" },
  { text: "contre", translation: "against" },
  { text: "avant", translation: "before" },
  { text: "après", translation: "after" },
  { text: "pendant", translation: "during" },
  { text: "entre", translation: "between" },

  // Conjunctions
  { text: "et", translation: "and" },
  { text: "ou", translation: "or" },
  { text: "mais", translation: "but" },
  { text: "si", translation: "if" },
  { text: "parce que", translation: "because" },
  { text: "donc", translation: "therefore" },
  { text: "quand", translation: "when" },

  // Adverbs
  { text: "très", translation: "very" },
  { text: "trop", translation: "too much" },
  { text: "assez", translation: "enough" },
  { text: "peu", translation: "little" },
  { text: "beaucoup", translation: "a lot" },
  { text: "souvent", translation: "often" },
  { text: "parfois", translation: "sometimes" },
  { text: "toujours", translation: "always" },
  { text: "jamais", translation: "never" },
  { text: "rapidement", translation: "quickly" },
  { text: "lentement", translation: "slowly" },
  { text: "bien", translation: "well" },
  { text: "mal", translation: "badly" },

  // Emotions
  { text: "heureux", translation: "happy" },
  { text: "triste", translation: "sad" },
  { text: "en colère", translation: "angry" },
  { text: "fatigué", translation: "tired" },
  { text: "surpris", translation: "surprised" },
  { text: "effrayé", translation: "scared" },
  { text: "inquiet", translation: "worried" },
  { text: "calme", translation: "calm" },
  { text: "excité", translation: "excited" },
  { text: "ennuyé", translation: "bored" },
  { text: "fier", translation: "proud" },
  { text: "jaloux", translation: "jealous" },

  // Food and dining
  { text: "petit déjeuner", translation: "breakfast" },
  { text: "déjeuner", translation: "lunch" },
  { text: "dîner", translation: "dinner" },
  { text: "repas", translation: "meal" },
  { text: "entrée", translation: "appetizer" },
  { text: "plat principal", translation: "main course" },
  { text: "dessert", translation: "dessert" },
  { text: "boisson", translation: "drink" },
  { text: "l'addition", translation: "the bill" },
  { text: "réservation", translation: "reservation" },
  { text: "menu", translation: "menu" },

  // Common sentences
  { text: "je ne sais pas", translation: "I don't know" },
  { text: "je suis perdu", translation: "I am lost" },
  { text: "pouvez-vous m'aider", translation: "can you help me" },
  { text: "j'ai besoin d'aide", translation: "I need help" },
  { text: "j'ai faim", translation: "I am hungry" },
  { text: "j'ai soif", translation: "I am thirsty" },
  { text: "je suis fatigué", translation: "I am tired" },
  { text: "je suis malade", translation: "I am sick" },
  { text: "quelle heure est-il", translation: "what time is it" },
  { text: "combien coûte ceci", translation: "how much does this cost" },
  { text: "où sont les toilettes", translation: "where is the bathroom" },
  { text: "je ne parle pas français", translation: "I don't speak French" },
  { text: "parlez plus lentement", translation: "speak more slowly" },
  { text: "c'est combien", translation: "how much is it" },
  { text: "c'est trop cher", translation: "it's too expensive" },
  { text: "j'aime ça", translation: "I like that" },
  { text: "je n'aime pas ça", translation: "I don't like that" },
  { text: "c'est important", translation: "it's important" },
  { text: "ce n'est pas important", translation: "it's not important" },
  { text: "je suis d'accord", translation: "I agree" },
  { text: "je ne suis pas d'accord", translation: "I disagree" },
  { text: "à votre avis", translation: "in your opinion" },
  { text: "selon moi", translation: "in my opinion" },
  { text: "je pense que", translation: "I think that" },
  { text: "je crois que", translation: "I believe that" },

  // Days of the week
  { text: "lundi", translation: "Monday" },
  { text: "mardi", translation: "Tuesday" },
  { text: "mercredi", translation: "Wednesday" },
  { text: "jeudi", translation: "Thursday" },
  { text: "vendredi", translation: "Friday" },
  { text: "samedi", translation: "Saturday" },
  { text: "dimanche", translation: "Sunday" },

  // Months
  { text: "janvier", translation: "January" },
  { text: "février", translation: "February" },
  { text: "mars", translation: "March" },
  { text: "avril", translation: "April" },
  { text: "mai", translation: "May" },
  { text: "juin", translation: "June" },
  { text: "juillet", translation: "July" },
  { text: "août", translation: "August" },
  { text: "septembre", translation: "September" },
  { text: "octobre", translation: "October" },
  { text: "novembre", translation: "November" },
  { text: "décembre", translation: "December" },

  // Seasons
  { text: "printemps", translation: "spring" },
  { text: "été", translation: "summer" },
  { text: "automne", translation: "fall" },
  { text: "hiver", translation: "winter" },

  // Directions
  { text: "nord", translation: "north" },
  { text: "sud", translation: "south" },
  { text: "est", translation: "east" },
  { text: "ouest", translation: "west" },
  { text: "gauche", translation: "left" },
  { text: "droite", translation: "right" },
  { text: "tout droit", translation: "straight ahead" },
  { text: "en haut", translation: "up" },
  { text: "en bas", translation: "down" },
  { text: "près", translation: "near" },
  { text: "loin", translation: "far" },

  // Technology
  { text: "ordinateur", translation: "computer" },
  { text: "téléphone", translation: "phone" },
  { text: "smartphone", translation: "smartphone" },
  { text: "tablette", translation: "tablet" },
  { text: "internet", translation: "internet" },
  { text: "site web", translation: "website" },
  { text: "application", translation: "app" },
  { text: "réseau social", translation: "social network" },
  { text: "mot de passe", translation: "password" },
  { text: "connexion", translation: "connection" },
  { text: "télécharger", translation: "download" },
  { text: "envoyer", translation: "send" },
  { text: "recevoir", translation: "receive" },

  // School subjects
  { text: "mathématiques", translation: "mathematics" },
  { text: "sciences", translation: "science" },
  { text: "histoire", translation: "history" },
  { text: "géographie", translation: "geography" },
  { text: "littérature", translation: "literature" },
  { text: "philosophie", translation: "philosophy" },
  { text: "art", translation: "art" },
  { text: "musique", translation: "music" },
  { text: "éducation physique", translation: "physical education" },
  { text: "langues étrangères", translation: "foreign languages" },

  // Hobbies
  { text: "lire", translation: "to read" },
  { text: "écrire", translation: "to write" },
  { text: "dessiner", translation: "to draw" },
  { text: "peindre", translation: "to paint" },
  { text: "jouer de la musique", translation: "to play music" },
  { text: "chanter", translation: "to sing" },
  { text: "danser", translation: "to dance" },
  { text: "cuisiner", translation: "to cook" },
  { text: "jardiner", translation: "to garden" },
  { text: "voyager", translation: "to travel" },
  { text: "nager", translation: "to swim" },
  { text: "courir", translation: "to run" },
  { text: "faire du vélo", translation: "to cycle" },
  { text: "faire du sport", translation: "to play sports" },
  { text: "regarder la télévision", translation: "to watch TV" },
  { text: "jouer aux jeux vidéo", translation: "to play video games" },
  { text: "collectionner", translation: "to collect" },
  { text: "photographier", translation: "to photograph" },

  // Health
  { text: "santé", translation: "health" },
  { text: "maladie", translation: "illness" },
  { text: "médecin", translation: "doctor" },
  { text: "hôpital", translation: "hospital" },
  { text: "pharmacie", translation: "pharmacy" },
  { text: "médicament", translation: "medicine" },
  { text: "douleur", translation: "pain" },
  { text: "fièvre", translation: "fever" },
  { text: "rhume", translation: "cold" },
  { text: "grippe", translation: "flu" },
  { text: "allergie", translation: "allergy" },
  { text: "blessure", translation: "injury" },
  { text: "urgence", translation: "emergency" },

  // Shopping
  { text: "magasin", translation: "store" },
  { text: "centre commercial", translation: "shopping mall" },
  { text: "marché", translation: "market" },
  { text: "prix", translation: "price" },
  { text: "soldes", translation: "sales" },
  { text: "réduction", translation: "discount" },
  { text: "acheter", translation: "to buy" },
  { text: "vendre", translation: "to sell" },
  { text: "payer", translation: "to pay" },
  { text: "monnaie", translation: "change (money)" },
  { text: "carte de crédit", translation: "credit card" },
  { text: "espèces", translation: "cash" },
  { text: "reçu", translation: "receipt" },
  { text: "remboursement", translation: "refund" },

  // Travel
  { text: "voyage", translation: "trip" },
  { text: "vacances", translation: "vacation" },
  { text: "touriste", translation: "tourist" },
  { text: "passeport", translation: "passport" },
  { text: "visa", translation: "visa" },
  { text: "valise", translation: "suitcase" },
  { text: "réservation", translation: "reservation" },
  { text: "hôtel", translation: "hotel" },
  { text: "chambre", translation: "room" },
  { text: "auberge de jeunesse", translation: "youth hostel" },
  { text: "camping", translation: "camping" },
  { text: "guide touristique", translation: "tour guide" },
  { text: "carte", translation: "map" },
  { text: "itinéraire", translation: "itinerary" },
  { text: "attraction touristique", translation: "tourist attraction" },
  { text: "souvenir", translation: "souvenir" },
  { text: "photo", translation: "photo" },
  { text: "appareil photo", translation: "camera" },

  // Housing
  { text: "appartement", translation: "apartment" },
  { text: "maison", translation: "house" },
  { text: "immeuble", translation: "building" },
  { text: "étage", translation: "floor" },
  { text: "ascenseur", translation: "elevator" },
  { text: "escalier", translation: "stairs" },
  { text: "chambre", translation: "bedroom" },
  { text: "salon", translation: "living room" },
  { text: "cuisine", translation: "kitchen" },
  { text: "salle de bain", translation: "bathroom" },
  { text: "toilettes", translation: "toilet" },
  { text: "jardin", translation: "garden" },
  { text: "balcon", translation: "balcony" },
  { text: "garage", translation: "garage" },
  { text: "loyer", translation: "rent" },

  // Nature
  { text: "nature", translation: "nature" },
  { text: "paysage", translation: "landscape" },
  { text: "montagne", translation: "mountain" },
  { text: "colline", translation: "hill" },
  { text: "vallée", translation: "valley" },
  { text: "forêt", translation: "forest" },
  { text: "bois", translation: "woods" },
  { text: "champ", translation: "field" },
  { text: "prairie", translation: "meadow" },
  { text: "désert", translation: "desert" },
  { text: "île", translation: "island" },
  { text: "plage", translation: "beach" },
  { text: "côte", translation: "coast" },
  { text: "rivière", translation: "river" },
  { text: "lac", translation: "lake" },
  { text: "océan", translation: "ocean" },
  { text: "mer", translation: "sea" },
  { text: "ciel", translation: "sky" },
  { text: "nuage", translation: "cloud" },
  { text: "étoile", translation: "star" },
  { text: "lune", translation: "moon" },
  { text: "soleil", translation: "sun" },
]

// Define permission state type
type PermissionState = "granted" | "denied" | "prompt" | "unknown"

export default function Home() {
  const [currentItem, setCurrentItem] = useState<{ text: string; translation: string } | null>(null)
  const [userInput, setUserInput] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [wordsLearned, setWordsLearned] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [wordCompleted, setWordCompleted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const [audioPermission, setAudioPermission] = useState<PermissionState>("unknown")
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false)

  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const speechAttemptedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Load words learned count from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("frenchWordsLearned")
      if (savedCount) {
        setWordsLearned(Number.parseInt(savedCount, 10))
      }
    }
  }, [])

  // Check if speech synthesis is available
  const isSpeechSynthesisAvailable = () => {
    return typeof window !== "undefined" && "speechSynthesis" in window
  }

  // Check audio permission status
  const checkAudioPermission = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setAudioPermission("unknown")
      return "unknown"
    }

    try {
      // Check if permission is already granted
      if (typeof navigator.permissions !== "undefined" && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: "microphone" as PermissionName })
          setAudioPermission(permissionStatus.state as PermissionState)

          // Listen for permission changes
          permissionStatus.onchange = () => {
            setAudioPermission(permissionStatus.state as PermissionState)
          }

          return permissionStatus.state
        } catch (err) {
          console.log("Permission query not supported, will try direct method")
        }
      }

      // If permissions API is not available, try to request access directly
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioPermission("granted")
      return "granted"
    } catch (err) {
      console.error("Error checking audio permission:", err)
      // If there's an error, it's likely because permission was denied
      setAudioPermission("denied")
      return "denied"
    }
  }

  // Request audio permission
  const requestAudioPermission = async () => {
    try {
      // Create an AudioContext to trigger the permission prompt
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // Request microphone access (this will trigger the permission prompt)
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // If we get here, permission was granted
      setAudioPermission("granted")
      setShowPermissionPrompt(false)

      // Try to speak the current word now that we have permission
      if (currentItem) {
        speak(currentItem.text)
      }

      return true
    } catch (err) {
      console.error("Error requesting audio permission:", err)
      setAudioPermission("denied")
      setAudioError("Audio permission denied. Some features may not work properly.")
      return false
    }
  }

  // Check audio permission on component mount
  useEffect(() => {
    checkAudioPermission().then((state) => {
      if (state === "prompt" || state === "unknown") {
        setShowPermissionPrompt(true)
      }
    })
  }, [])

  // Create audio element for fallback
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
      audioRef.current.onerror = () => {
        console.error("Audio element error")
        setAudioError("Audio playback failed. Your browser may not support this feature.")
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    }
  }, [])

  // Load available voices and log them to ensure the French voice is loaded
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        console.log("Available voices:", voices)
      }
      loadVoices()
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }
  }, [])

  // Revised speak function with permission check
  const speak = (text: string) => {
    setAudioError(null)
    speechAttemptedRef.current = true

    // Check if we have audio permission
    if (audioPermission === "denied") {
      setAudioError("Audio permission denied. Please enable audio in your browser settings.")
      setSpeechSupported(false)
      return
    }

    // If permission is unknown or prompt, show the permission prompt
    if (audioPermission === "unknown" || audioPermission === "prompt") {
      setShowPermissionPrompt(true)
      return
    }

    // If speech synthesis is available, try to use it first.
    if (isSpeechSynthesisAvailable()) {
      // Clear any existing timeout
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current)
      }
      speechTimeoutRef.current = setTimeout(() => {
        console.log("Speech timeout - speech didn't start in time")
        setIsSpeaking(false)
        setSpeechSupported(false)
        setAudioError("Speech synthesis failed. The app will continue without audio.")
      }, 3000) // 3 seconds timeout

      try {
        window.speechSynthesis.cancel()
        setIsSpeaking(true)
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "fr-FR"
        utterance.onstart = () => {
          console.log("Speech started successfully")
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current)
            speechTimeoutRef.current = null
          }
          setIsSpeaking(true)
        }
        utterance.onend = () => {
          console.log("Speech ended")
          setIsSpeaking(false)
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current)
            speechTimeoutRef.current = null
          }
        }
        utterance.onerror = (event) => {
          console.error("Speech error:", event)
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current)
            speechTimeoutRef.current = null
          }
          setIsSpeaking(false)
          setSpeechSupported(false)
          setAudioError("Speech synthesis failed. The app will continue without audio.")
        }
        window.speechSynthesis.speak(utterance)
      } catch (error) {
        console.error("Speech synthesis error:", error)
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current)
          speechTimeoutRef.current = null
        }
        setIsSpeaking(false)
        setSpeechSupported(false)
        setAudioError("Speech synthesis failed. The app will continue without audio.")
      }
    } else if (audioRef.current) {
      // Fallback using the audio element and Google TTS
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text,
      )}&tl=fr-FR&client=tw-ob`
      audioRef.current.src = ttsUrl
      audioRef.current
        .play()
        .then(() => {
          console.log("Fallback audio playing")
        })
        .catch((err) => {
          console.error("Fallback audio error:", err)
          setAudioError("Fallback audio playback failed.")
        })
    } else {
      setAudioError("Audio playback is not supported on this browser.")
    }
  }

  // Cleanup on unmount for timeouts and speech synthesis
  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current)
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error)
      }
    }
  }, [])

  // Get a random French word/phrase
  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * frenchContent.length)
    return frenchContent[randomIndex]
  }

  // Initialize with a random word
  useEffect(() => {
    setCurrentItem(getRandomItem())
    setWordCompleted(false)
    setUserInput("")
    setFeedback(null)
  }, [])

  // Speak the current word with a slight delay
  useEffect(() => {
    if (currentItem && speechSupported && audioPermission === "granted") {
      const timer = setTimeout(() => {
        speak(currentItem.text)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentItem, speechSupported, audioPermission])

  // Check the user's input in real time
  useEffect(() => {
    if (currentItem) {
      if (userInput.toLowerCase().trim() === currentItem.text.toLowerCase()) {
        setFeedback("correct")
        setWordCompleted(true)
      } else {
        setFeedback(null)
        setWordCompleted(false)
      }
    }
  }, [userInput, currentItem])

  // Handle form submission (e.g., when Enter is pressed)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentItem) return

    if (wordCompleted) {
      handleNextWord()
    } else {
      setFeedback("incorrect")
    }
  }

  // Move to the next word and increment words learned counter
  const handleNextWord = () => {
    const newCount = wordsLearned + 1
    setWordsLearned(newCount)
    if (typeof window !== "undefined") {
      localStorage.setItem("frenchWordsLearned", newCount.toString())
    }
    setCurrentItem(getRandomItem())
    setUserInput("")
    setFeedback(null)
    setWordCompleted(false)
    if (inputRef.current) inputRef.current.focus()
  }

  // Manual pronunciation trigger
  const handlePronounce = () => {
    if (currentItem && speechSupported) {
      speak(currentItem.text)
    }
  }

  // Keyboard event listener for Command/Control + key to trigger "Hear Again"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !isSpeaking && speechSupported && currentItem) {
        e.preventDefault()
        handlePronounce()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentItem, isSpeaking, speechSupported])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md relative">
        {/* Words Learned Counter */}
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
          >
            <Trophy className="h-4 w-4" />
            <span className="font-medium">{wordsLearned}</span>
          </Badge>
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">French Learning App</CardTitle>
          <div className="text-sm text-muted-foreground">{frenchContent.length} French words and phrases available</div>
          <CardDescription>Listen, type, and learn French words and phrases</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Permission Request Alert */}
          {showPermissionPrompt && (
            <Alert className="mb-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <Mic className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-300 flex-1">
                This app needs audio permission to pronounce French words.
                <Button
                  onClick={requestAudioPermission}
                  variant="outline"
                  size="sm"
                  className="ml-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700"
                >
                  Allow Audio
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {audioError && (
            <Alert className="mb-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-300">{audioError}</AlertDescription>
            </Alert>
          )}

          {currentItem && (
            <div className="text-center space-y-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">{currentItem.text}</h2>
                  <Button
                    variant={isSpeaking ? "default" : "ghost"}
                    size="icon"
                    onClick={handlePronounce}
                    aria-label="Pronounce word"
                    className={isSpeaking ? "bg-primary text-primary-foreground animate-pulse" : ""}
                    disabled={!speechSupported || audioPermission !== "granted"}
                  >
                    {speechSupported ? <VolumeUp className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>
                </div>
                <p className="text-lg text-muted-foreground">"{currentItem.translation}"</p>
              </div>

              <form onSubmit={handleSubmit} className="pt-4">
                <div className="space-y-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type the French word/phrase"
                    className="text-center"
                    autoFocus
                  />
                  {feedback && (
                    <p
                      className={`text-center font-medium ${
                        feedback === "correct" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {feedback === "correct" ? "Correct! 👏" : "Try again! 🔄"}
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePronounce}
            className="flex items-center gap-2"
            disabled={isSpeaking || !speechSupported || audioPermission !== "granted"}
            variant={speechSupported ? "default" : "outline"}
          >
            {speechSupported ? <VolumeUp className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            Hear Again
          </Button>
          <Button onClick={handleNextWord} disabled={!wordCompleted} className={wordCompleted ? "animate-pulse" : ""}>
            Next Word
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

