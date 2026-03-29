const inventory = [
    { id: "prosthetic_tool", name: "Prosthetic Tool" },
    { id: "bell_charm", name: "Bell Charm" },
    { id: "gatehouse_key", name: "Gatehouse Key" },
    { id: "gun_fort_shrine_key", name: "Gun Fort Shrine Key" },
    { id: "hidden_temple_key", name: "Hidden Temple Key" },
    { id: "secret_passage_key", name: "Secret Passage Key" },
    { id: "lotus_of_the_palace", name: "Lotus of the Palace" },
    { id: "shelter_stone", name: "Shelter Stone" },
    { id: "mortal_blade", name: "Mortal Blade" },
    { id: "aromatic_branch", name: "Aromatic Branch" },
    { id: "divine_dragons_tears", name: "Divine Dragon's Tears" },
    { id: "puppeteer_ninjutsu", name: "Puppeteer Ninjutsu" },
    { id: "mibu_breathing_technique", name: "Mibu Breathing Technique" },
    { id: "fathers_bell_charm", name: "Father's Bell Charm" },
];

function getSource(id) {
    return "img/" + id + ".png";
}

function ShowTooltip(event) {
    document.getElementById("tooltip_" + event.target.id).classList.remove("invisible");
}

function HideTooltip(event) {
    document.getElementById("tooltip_" + event.target.id).classList.add("invisible");
}

function PreventContextMenu(event) {
    event.preventDefault();
    return false;
}

function ToggleItem(event) {
    let target = event.target;
    if (event.button === 0) {
        if (target.classList.contains("selected")) {
            target.classList.remove("selected");
            localStorage.setItem(target.id, "false");
        } else {
            target.classList.add("selected");
            localStorage.setItem(target.id, "true");
        }
    }
}

function init() {
    let container = document.getElementById("inventory-container");

    for (let item of inventory) {
        let source = getSource(item.id);

        let div = document.createElement("div");
        div.className = "element";

        let img = document.createElement("img");
        img.className = "inventory";
        img.alt = item.name;
        img.src = source;
        img.id = item.id;

        let tooltip = document.createElement("div");
        tooltip.id = "tooltip_" + item.id;
        tooltip.className = "invisible tooltip inventory";
        tooltip.textContent = item.name;

        div.appendChild(img);
        div.appendChild(tooltip);
        container.appendChild(div);

        let saved = localStorage.getItem(item.id);
        if (saved === "true") {
            img.classList.add("selected");
        }

        img.onmouseup = function(e) { ToggleItem(e); };
        img.oncontextmenu = function(e) { PreventContextMenu(e); };
        img.onmouseenter = function(e) { ShowTooltip(e); };
        img.onmouseleave = function(e) { HideTooltip(e); };
    }
}

init();
