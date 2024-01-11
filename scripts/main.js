// DEFINIËRING VAN ELEMENTEN ----------------------------------------------------------------------------------------

// VISUELE ELEMENTEN IN GRID
var gridStedin = document.querySelector('main .grid-stedin');
var gridSchouten = document.querySelector('main .grid-schouten');
var gridTransformer = document.querySelector('main .grid-transformer');
var gridCharger = document.querySelector('main .grid-charger');
var gridBattery = document.querySelector('main .grid-energy');

// var batteryPercentageBar = document.querySelector('main .grid-battery ul li > span > span');
// var batteryPercentageIndicator = document.querySelector('main .grid-battery ul li > strong');

// ZWEVENDE INTERACTIEVE BALK
var firstLineButton = document.querySelector('aside #first-line-button');
firstLineButton.addEventListener("click", resetFirstLine);

var secondLineButton = document.querySelector('aside #second-line-button');
// secondLineButton.addEventListener("click", resetSecondLine);

var resetButton = document.querySelector('aside li:nth-of-type(3) button');
resetButton.addEventListener("click", resetScenario);



// DEFINIËRING VAN VARIABELEN ----------------------------------------------------------------------------------------
var stedin;
var transformer;
var schouten;


var charger;
var batteryPercentage;



// STARTPUNT knop verwijderen en vervangen door knop die lijn 1/2 verwijderd



var shift = false;
var lines = 0;


document.addEventListener('keydown', function(event) {
    if (event.shiftKey) {
        shift = true;
        console.log('Shift: ' + shift);
    }
});
document.addEventListener('keyup', function(event) {
    if (!event.shiftKey) {
        shift = false;
        console.log('Shift: ' + shift);
    }
});



// SELECTEER ALLE GRID ICON ITEMS (ILLUSTRATIES BOVENIN)
document.querySelectorAll('main .grid-icon').forEach(function(el) {
    // GEEF ELK ITEM EEN KLIK ELEMENT
    el.addEventListener('click', function() {
        
        if (shift == false) {
            // ALS SHIFT NIET IS INGEDRUKT ---------------
            // VERWIJDER ALLE BESTAANDE ACTIEVE CLASSES VAN HET ELMEMENT EN VERWIJDER DE EIND CLASS (INDIEN NODIG)
            document.querySelectorAll('.active-start').forEach(function(currentEl) {
                currentEl.classList.remove('active-start');
            });

            // GEEF EEN ACTIEVE KLAS AAN HET GESELECTEERDE ELEMENT
            this.classList.add('active-start');
            this.classList.remove('active-end');

        } else {
            // ALS SHIFT WEL IS INGEDRUKT ---------------
            // VERWIJDER ALLE BESTAANDE ACTIEVE CLASSES VAN HET ELMEMENT
            document.querySelectorAll('.active-end').forEach(function(currentEl) {
                currentEl.classList.remove('active-end');
            });

            // GEEF EEN ACTIEVE KLAS AAN HET GESELECTEERDE ELEMENT EN VERWIJDER DE START CLASS (INDIEN NODIG)
            this.classList.add('active-end');
            this.classList.remove('active-start');
        }


        


        startLineActive = false;
        endLineActive = false;


        function checkIfstartLineContainActive(selector, className) {
            var elements = document.querySelectorAll(selector);
            
            elements.forEach(function(element) {
                // CHECK OF DE CLASS BESTAAT
                if (element.classList.contains(className)) {
                    startLineActive = true;
                } 

                console.log('Startlijn: ' + startLineActive);
            });
        }
        checkIfstartLineContainActive('.grid-icon', 'active-start');

        function checkIfendLineContainActive(selector, className) {
            var elements = document.querySelectorAll(selector);
            
            elements.forEach(function(element) {
                // CHECK OF DE CLASS BESTAAT
                if (element.classList.contains(className)) {
                    endLineActive = true;
                } 

                // console.log('Eindlijn: ' + endLineActive);
            });
        }
        checkIfendLineContainActive('.grid-icon', 'active-end');




        checkLineStatus();

        
        
        
        
        
        
        
        
    });
});




function checkLineStatus() {

    // CHECK OF ER TWEE CLASSES ZIJN TOEGEVOEGD > MAAK DE EERSTE LIJN AAN
    if ((startLineActive == true) && (endLineActive == true)) {

        lines = 1;
        console.log('Lijnen: ' + lines);

        var startItem = document.querySelector('.active-start');
        var endItem = document.querySelector('.active-end');

        startItem.classList.add('start-line-' + lines);
        endItem.classList.add('end-line-' + lines);

        var delay = 500;
        setTimeout(function() {
            startItem.classList.remove('active-start');
            endItem.classList.remove('active-end');

            firstLineButton.classList.add('line-active');
        }, delay);
        
        // TIJDELIJK
        startItem.classList.add('active');
        endItem.classList.add('active');



        // console.log(startLineActive);
    } else {
        console.log('Geen lijn');

        lines = 0;
        // startItem.classList.remove('start-line-1');
        // endItem.classList.remove('end-line-1');
    }


}









// // SELECTEER ALLE GRID ICON ITEMS (ILLUSTRATIES BOVENIN)
// document.querySelectorAll('main .grid-icon').forEach(function(el) {
//     // GEEF ELK ITEM EEN KLIK ELEMENT
//     el.addEventListener('click', function() {
//         // VERWIJDER ALLE BESTAANDE ACTIEVE CLASSES VAN HET ELMEMENT
//         document.querySelectorAll('.active-end').forEach(function(currentEl) {
//             currentEl.classList.remove('active-end');
//         });

//         // GEEF EEN ACTIEVE KLAS AAN HET GESELECTEERDE ELEMENT
//         this.classList.add('active-end');
//         // this.classList.remove('active-start');
//     });
// });






// UITWERKEN VAN VERSCHILLENDE SCENARIO'S ----------------------------------------------------------------------------------------
function scenario() {


    

    // UITVOEREN VAN VISUALISERING
    visualizeScenario();
}



// VISUALISEREN VAN ACTIEVE SCENARIO ----------------------------------------------------------------------------------------
function visualizeScenario() {

    
    
        
}



// RESETTEN VAN ACTIEVE SCENARIO ----------------------------------------------------------------------------------------
function resetScenario() {
    document.querySelectorAll('main .grid-icon').forEach(function(currentEl) {
        currentEl.classList.remove('active-start');
        currentEl.classList.remove('active-end');

        currentEl.classList.remove('active');

        currentEl.classList.remove('start-line-1');
        currentEl.classList.remove('end-line-1');

        firstLineButton.classList.remove('line-active');
        secondLineButton.classList.remove('line-active');
    });    
}

// RESETTEN VAN EERSTE LIJN
function resetFirstLine() {
    document.querySelector('.start-line-1').classList.remove('active');
    document.querySelector('.start-line-1').classList.remove('start-line-1');
    document.querySelector('.end-line-1').classList.remove('active');
    document.querySelector('.end-line-1').classList.remove('end-line-1');   
    firstLineButton.classList.remove('line-active'); 
}