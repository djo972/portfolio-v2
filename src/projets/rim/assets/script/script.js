/* Pacific Rim Project by Oudam & Djo */
/* Script Général + Animation */
/* Date: Février 2014 */

// Initialisation pour le One Page.
// Script spécifique à OnepageScroll.
$(document).ready(function(){ // Initialisation du document, pour notre page HTML par exemple.
        $(".main").onepage_scroll({
          sectionContainer: "section",
          keyboard: true, // Commande par clavier
          easeing: "cubic-bezier(0,.98,1,.03)" // Pour la fluidité de l'animation
        });
});