let totalCastSize: number;

function randomNumber(min: number, max: number): number {
    let randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}

function sortPerformances(cast: Array<Queen>) {
    cast.sort((a, b) => (a.performanceScore - b.performanceScore));
}

//generate spaces to insert cast:
function generateSpace() {
    let castSize = (<HTMLInputElement>document.querySelector("input#castSize")).valueAsNumber;
    totalCastSize = castSize;
    let castSelection = document.querySelector("p#castSelection");

    castSelection!.innerHTML = '';

    if (totalCastSize < 3)
        window.alert("Please, use at least 3 queens on your cast!");
    else if (totalCastSize > 20)
        window.alert("Please, use less than 20 queens in your cast!");
    else
        for (let i = 0; i < castSize; i++) {
            let select = document.createElement("select");
            select.setAttribute("class", "queenList")
            select.setAttribute("id", i.toString());
            
            for (let k = 0; k < allQueens.length; k++) {
                let option = document.createElement("option");
                option.innerHTML = allQueens[k].getName();

                select.add(option);
            }
            
            let br = document.createElement("br");

            castSelection!.appendChild(select);
            castSelection!.appendChild(br);
        }
}

function predefCast(cast: Array<Queen>, format: string) {
    currentCast = cast;
    totalCastSize = cast.length;

    if (format == "top3")
        top3 = true;
    else if (format == "top4")
        top4 = true;
    else if (format == "all-stars")
        all_stars = true;

    newEpisode();
}

let top3: boolean = false;
let top4: boolean = false;
let all_stars: boolean = false;


function startSimulation() {
    //get selected names and compare them to the all queens list:
    for (let i = 0; i < document.getElementsByClassName("queenList").length; i++) {
        let select: HTMLSelectElement = (<HTMLSelectElement>document.getElementById(i.toString()));
        let value: string = select.options[select.selectedIndex].text;

        for (let k = 0; k < allQueens.length; k++) {
            if (value == allQueens[k].getName())
                currentCast.push(allQueens[k]);
        }
    }
    
    if (duplicateQueens(currentCast))
        window.alert("Please, only use one of each queen on your cast!");
    else {
        let select = (<HTMLSelectElement>document.getElementById("format"));

        if (select.options[select.selectedIndex].value == "top3")
            top3 = true;
        else if (select.options[select.selectedIndex].value == "top4")
            top4 = true;
        else if (select.options[select.selectedIndex].value == "all-stars")
            all_stars = true;

        newEpisode();
    }
}

//see if there is two of the same queens:
function duplicateQueens(cast: Array<Queen>) {
    let valuesAlreadySeen = [];

    for (let i = 0; i < cast.length; i++) {
    let value = cast[i];
    if (valuesAlreadySeen.indexOf(value) !== -1) {
      currentCast = [];
      return true;
    }
    valuesAlreadySeen.push(value);
  }
  return false;
}