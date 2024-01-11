var delay = 500;

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
// var stedin;
// var transformer;
// var schouten;
// var charger;
// var batteryPercentage;

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


    
        // DEFINIEREN VAN LIJN WAARDES
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


        // VOER DE CHECK LINE STATUS/DIRECTIE FUNCTIE UIT
        checkLineStatus();
        LineDirection();
                
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

        setTimeout(function() {
            startItem.classList.remove('active-start');
            endItem.classList.remove('active-end');

            firstLineButton.classList.add('line-active');

            // TIJDELIJK
            startItem.classList.add('active');
            endItem.classList.add('active');
        }, delay);
        

        // console.log(startLineActive);
    } else {
        console.log('Geen lijn');

        lines = 0;
        // startItem.classList.remove('start-line-1');
        // endItem.classList.remove('end-line-1');
    }
}


// FUNCTIES OM TE ACHTERHALEN OF ELEMENT EEN STARTLIJN BEVAT ---------------
function LineDirection() {
    // RESET CLASSES
    document.querySelector('.grid-charger .grid-line-1.grid-line-vertical').classList.remove('grid-line-flipped');
    document.querySelector('.grid-energy .grid-line-1.grid-line-vertical').classList.remove('grid-line-flipped');
    document.querySelector('.grid-schouten .grid-line-1.grid-line-vertical').classList.remove('grid-line-flipped');
    document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.remove('no-line');
    document.querySelector('.grid-stedin .grid-line-1').classList.remove('grid-line-flipped');


    // ALS ELEMENT EEN STARTLIJN HEEFT
    if (gridStedin.classList.contains('start-line-1')) {
        // // RESET CLASSES
        // document.querySelector('.grid-charger .grid-line-1.grid-line-vertical').classList.remove('grid-line-flipped');
        // document.querySelector('.grid-energy .grid-line-1.grid-line-vertical').classList.remove('grid-line-flipped');
        // document.querySelector('.grid-schouten .grid-line-1.grid-line-vertical').classList.remove('grid-line-flipped');
        // document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.remove('no-line');

        // CHECK WELK ELEMENT HET EINDPUNT IS VAN DE LIJN
        if (gridSchouten.classList.contains('end-line-1')) {
            document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.add('no-line');
            document.querySelector('.grid-schouten .grid-line-1.grid-line-vertical').classList.add('grid-line-flipped');
        } else {
            setTimeout(function() {
                document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.add('guide-line-active');
            }, delay);
        }
        
        if (gridCharger.classList.contains('end-line-1')) {
            document.querySelector('.grid-charger .grid-line-1.grid-line-vertical').classList.add('grid-line-flipped');
        } else if (gridBattery.classList.contains('end-line-1')) {
            document.querySelector('.grid-energy .grid-line-1.grid-line-vertical').classList.add('grid-line-flipped');
        }
    } else if (gridSchouten.classList.contains('start-line-1')) {
        // RESET CLASSES


        // CHECK WELK ELEMENT HET EINDPUNT IS VAN DE LIJN
        if (gridStedin.classList.contains('end-line-1')) {
            document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.add('no-line');
            document.querySelector('.grid-stedin .grid-line-1').classList.add('grid-line-flipped');
            document.querySelector('.grid-stedin .grid-line-1.grid-line-vertical').classList.add('grid-line-flipped');
        } else {
            setTimeout(function() {
                // document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.add('guide-line-active');
            }, delay);
        }


    }
    
}









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
        document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.remove('guide-line-active');
        document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.remove('no-line');

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
    
    document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.remove('guide-line-active');
    document.querySelector('.grid-schouten .grid-line-1:first-of-type').classList.remove('no-line');
}