const inventory = [
    // Invasion
    { id: "mortal_blade", name: "Mortal Blade", type: "invasion" },
    { id: "shelter_stone", name: "Shelter Stone", type: "invasion" },
    { id: "lotus_of_the_palace", name: "Lotus of the Palace", type: "invasion" },

    // Dragon
    { id: "aromatic_branch", name: "Aromatic Branch", type: "dragon" },
    { id: "mibu_breathing_technique", name: "Mibu Breathing Technique", type: "dragon" },

    // Finish
    { id: "secret_passage_key", name: "Secret Passage Key", type: "finish" },
    { id: "divine_dragons_tears", name: "Divine Dragon's Tears", type: "finish" },

    // Key
    { id: "prosthetic_tool", name: "Prosthetic Tool", type: "key" },
    { id: "bell_charm", name: "Bell Charm", type: "key" },
    { id: "fathers_bell_charm", name: "Father's Bell Charm", type: "key" },
    { id: "puppeteer_ninjutsu", name: "Puppeteer Ninjutsu", type: "key" },
    { id: "gatehouse_key", name: "Gatehouse Key", type: "key" },
    { id: "gun_fort_shrine_key", name: "Gun Fort Shrine Key", type: "key" },
    { id: "hidden_temple_key", name: "Hidden Temple Key", type: "key" },
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

    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        let source = getSource(item.id);

        if (i === 7) {
            container.appendChild(document.createElement("br"));
        }

        let div = document.createElement("div");
        div.className = "element";

        let img = document.createElement("img");
        img.className = "inventory";
        img.alt = item.name;
        img.src = source;
        img.id = item.id;
        img.dataset.type = item.type;

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
