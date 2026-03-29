const inventory = [
    { name: "Prosthetic Tool", id: "owned_prosthetic_tool", source: "img/prosthetic_tool.png" },
    { name: "Bell Charm", id: "owned_bell_charm", source: "img/bell_charm.png" },
    { name: "Gatehouse Key", id: "owned_gatehouse_key", source: "img/gatehouse_key.png" },
    { name: "Gun Fort Shrine Key", id: "owned_gun_fort_shrine_key", source: "img/gun_fort_shrine_key.png" },
    { name: "Hidden Temple Key", id: "owned_hidden_temple_key", source: "img/hidden_temple_key.png" },
    { name: "Secret Passage Key", id: "owned_secret_passage_key", source: "img/secret_passage_key.png" },
    { name: "Lotus of the Palace", id: "owned_lotus_of_the_palace", source: "img/lotus_of_the_palace.png" },
    { name: "Shelter Stone", id: "owned_shelter_stone", source: "img/shelter_stone.png" },
    { name: "Mortal Blade", id: "owned_mortal_blade", source: "img/mortal_blade.png" },
    { name: "Aromatic Branch", id: "owned_aromatic_branch", source: "img/aromatic_branch.png" },
    { name: "Divine Dragon's Tears", id: "owned_divine_dragons_tears", source: "img/divine_dragons_tears.png" },
    { name: "Puppeteer Ninjutsu", id: "owned_puppeteer_ninjutsu", source: "img/puppeteer_ninjutsu.png" },
    { name: "Mibu Breathing Technique", id: "owned_mibu_breathing_technique", source: "img/mibu_breathing_technique.jpg" },
    { name: "Father's Bell Charm", id: "owned_fathers_bell_charm", source: "img/fathers_bell_charm.png" },
];

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
    for (let item of inventory) {
        let element = document.getElementById(item.id);
        if (!element) continue;

        let saved = localStorage.getItem(item.id);
        if (saved === "true") {
            element.classList.add("selected");
        }

        element.onmouseup = function(e) { ToggleItem(e); };
        element.oncontextmenu = function(e) { PreventContextMenu(e); };
        element.onmouseenter = function(e) { ShowTooltip(e); };
        element.onmouseleave = function(e) { HideTooltip(e); };
    }
}
