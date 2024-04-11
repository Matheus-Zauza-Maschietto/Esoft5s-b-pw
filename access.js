let options = {
    second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
};

setAcessInformations()
function setAcessInformations() {
    let accessTimes = Number(localStorage.getItem("accessTimes"))
    let accessDate = localStorage.getItem("accessDate")

    if(accessDate == null){
        accessDate = new Intl.DateTimeFormat("pt-br", options).format(new Date())
    }
    const visiteInfosTag = document.querySelector("#visite-infos")

    accessDate = new Intl.DateTimeFormat("pt-br", options).format(new Date())

    if (visiteInfosTag != null) {
        visiteInfosTag.textContent = `Está página foi visitada ${accessTimes} vezes. A última visita foi: ${accessDate}`
    }

    if (accessTimes != null) {
        accessTimes++;
    }
    else {
        accessTimes = 1;
    }

    localStorage.setItem("accessTimes", accessTimes)
    localStorage.setItem("accessDate", accessDate)

}

