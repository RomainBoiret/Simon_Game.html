// Variables globales du jeu
let level = 0; // Niveau actuel
let score = 0; // Score du joueur
let sequence = []; // Tableau pour stocker la séquence de couleurs
let playerSequence = []; // Séquence de couleurs entrée par le joueur

const NEGATIF = -1;
const MAX_COLOR = 10;

// Récupérer les éléments boutons et la section de couleur
let container = document.getElementById('container');
let colorButtons = document.querySelectorAll('.color');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');

// Ajouter des gestionnaires d'événements de clic pour chaque bouton de couleur
colorButtons.forEach((button, index) => {

    button.addEventListener('click', () => {

        // Appeler une fonction pour gérer le clic sur le bouton de couleur
        colorClick(index);
    });
});

// Fonction pour générer une nouvelle séquence aléatoire de couleurs
function generateSequence()
{
    // À implémenter : Générer une séquence aléatoire de couleurs en fonction du niveau
    // Ajouter les couleurs générées à la variable sequence
    let randomColorIndex = Math.floor(Math.random() * 9); // Générer un nombre aléatoire entre 0 et 8 (représentant les couleurs)
    sequence.push(randomColorIndex);
}

// Fonction pour afficher la séquence de couleurs au joueur
function displaySequence()
{
    // À implémenter : Afficher chaque couleur de la séquence à intervalle de temps régulier
    sequence.forEach((colorIndex, index) => {

        setTimeout(() => {

            colorButtons[colorIndex].classList.add(`color${colorIndex}`);
            
            setTimeout(() => {
                colorButtons[colorIndex].classList.remove(`color${colorIndex}`);
            }, 500);
        }, index * 1000); // Chaque couleur est affichée pendant 1 seconde (index * 1000)
    });
}

// Fonction pour gérer le clic sur une couleur par le joueur
function colorClick(color)
{
    // À implémenter : Ajouter la couleur cliquée à la séquence du joueur
    // Vérifier si la séquence du joueur correspond à la séquence générée
    if (NEGATIF < color && color < MAX_COLOR)
    {
        playerSequence.push(color);
    }

    if (playerSequence.length == sequence.length)
        checkSequence();
}

// Fonction pour vérifier si la séquence du joueur correspond à la séquence générée
function checkSequence()
{
    // À implémenter : Vérifier si la séquence du joueur correspond à la séquence générée
    // Si la séquence est correcte, augmenter le score et passer au niveau suivant
    for (let i = 0; i < playerSequence.length; i++)
    {
        if (playerSequence[i] != sequence[i])
        {
            spinGame();
            toggleButton();
            return;
        }
    }

    nextLevel();
}

// Fonction pour passer au niveau suivant
function nextLevel()
{
    // À implémenter : Passer au niveau suivant en mettant à jour les variables et en générant une nouvelle séquence
    score++;
    level++;
    playerSequence = [];

    console.log("Niveau:" + level);

    setTimeout(() => {
        generateSequence();
        displaySequence();
    }, 1500);
}

// Fonction pour démarrer le jeu
function startGame()
{
    // À implémenter : Initialiser les variables, afficher le niveau actuel et lancer la première séquence
    disableButton(startButton);
    enableButton(resetButton);

    // Réinitialiser le jeu
    resetGame();

    // Générer une nouvelle séquence
    generateSequence();

    // Afficher la séquence
    setTimeout(() => {
        displaySequence();
    }, 1500);
}

// Fonction pour réinitialiser le jeu
function resetGame()
{
    toggleButton();

    // À implémenter : Réinitialiser les variables et l'interface pour recommencer une nouvelle partie
    sequence = []; // Initialiser sequence comme un tableau vide
    level = 0;
    score = 0;
    playerSequence = []; // Initialiser playerSequence comme un tableau vide

    console.log("Game reseted");
}

// Function to enable a button
function enableButton(button)
{
    button.disabled = false; // Set the disabled attribute to false to enable the button
}

// Function to disable a button
function disableButton(button)
{
    button.disabled = true; // Set the disabled attribute to true to disable the button
}

// Function to toggle the button visibility
function toggleButton()
{
    if (startButton.style.display === "none")
    {
        startButton.style.animation = "fadeIn 0.5s ease forwards";

        setTimeout(() => {
            startButton.style.display = "block"; // Show the button
        }, 500);

        resetButton.style.animation = "fadeOut 0.5s ease forwards";

        setTimeout(() => {
            resetButton.style.display = "none";
        }, 500);
    }
    else
    {
        startButton.style.animation = "fadeOut 0.5s ease forwards";

        setTimeout(() => {
            startButton.style.display = "none"; // Hide the button
        }, 500);

        resetButton.style.animation = "fadeIn 0.5s ease forwards";

        setTimeout(() => {
            resetButton.style.display = "block";
        }, 500);
    }
}

reset.addEventListener('click', () => {

    // Appeler une fonction pour gérer le clic sur le bouton de couleur
    spinGame();
});

function spinGame()
{
    colorButtons.forEach((colorButton, index) => {

        colorButton.style.transition = 'transform 2s';

        setTimeout(() => {
            colorButton.style.transform = 'rotate(360deg)';
            colorButton.style.backgroundColor = 'black';

            if (index === colorButtons.length - 1)
            {
                setTimeout(() => {
                    colorButtons.forEach(button => {
                        button.style.transform = '';

                        colorButtons.forEach((colorButton, index) => {
                            colorButton.style.backgroundColor = '';

                            setTimeout(() => {
                                colorButton.style.transition = '';
                            }, 500);
                        });
                    });
                }, 2000);
            }
        }, index * 300); // Délai entre chaque rotation
    });
    
    setTimeout(() => {
        disableButton(resetButton);
        enableButton(startButton);
    }, 5500);
}

// À l'initialisation de la page ou du chargement du script :
// - Associer des événements aux cases de couleurs pour détecter les clics du joueur
// - Appeler la fonction startGame pour démarrer le jeu

// À toi de jouer pour remplir les fonctions vides en suivant les consignes ! Si tu as des questions ou besoin d'aide pour une partie spécifique, n'hésite pas à demander.
