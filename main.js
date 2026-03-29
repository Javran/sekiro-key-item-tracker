const inventory = [
    // Invasion
    { id: "mortal_blade", name: "Mortal Blade", type: "invasion", encode: "mb" },
    { id: "shelter_stone", name: "Shelter Stone", type: "invasion", encode: "ss" },
    { id: "lotus_of_the_palace", name: "Lotus of the Palace", type: "invasion", encode: "lp" },

    // Dragon
    { id: "aromatic_branch", name: "Aromatic Branch", type: "dragon", encode: "ab" },
    { id: "mibu_breathing_technique", name: "Mibu Breathing Technique", type: "dragon", encode: "mbt" },

    // Finish
    { id: "secret_passage_key", name: "Secret Passage Key", type: "finish", encode: "spk" },
    { id: "divine_dragons_tears", name: "Divine Dragon's Tears", type: "finish", encode: "ddt" },

    // Key
    { id: "prosthetic_tool", name: "Prosthetic Tool", type: "key", encode: "pt" },
    { id: "bell_charm", name: "Bell Charm", type: "key", encode: "bc" },
    { id: "fathers_bell_charm", name: "Father's Bell Charm", type: "key", encode: "fbc" },
    { id: "puppeteer_ninjutsu", name: "Puppeteer Ninjutsu", type: "key", encode: "pn" },
    { id: "gatehouse_key", name: "Gatehouse Key", type: "key", encode: "gk" },
    { id: "gun_fort_shrine_key", name: "Gun Fort Shrine Key", type: "key", encode: "gfk" },
    { id: "hidden_temple_key", name: "Hidden Temple Key", type: "key", encode: "htk" },
];

const encodes = inventory.map(i => i.encode);
const seen = new Set();
for (const e of encodes) {
    if (seen.has(e)) console.error("Duplicate encode:", e);
    seen.add(e);
}

function getSource(id) {
    return "img/" + id + ".png";
}

function getSelectedFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const sel = params.get("sel");
    if (!sel) return new Set();
    const selectedEncodes = sel.split(",").filter(e => e);
    const selectedIds = new Set();
    for (const item of inventory) {
        if (selectedEncodes.includes(item.encode)) {
            selectedIds.add(item.id);
        }
    }
    return selectedIds;
}

function updateUrl(imgId, selected) {
    const selectedEncodes = [];
    for (const item of inventory) {
        const img = document.getElementById(item.id);
        if (img && img.classList.contains("selected")) {
            selectedEncodes.push(item.encode);
        }
    }
    const url = new URL(window.location);
    if (selectedEncodes.length === 0) {
        url.searchParams.delete("sel");
    } else {
        url.searchParams.set("sel", selectedEncodes.join(","));
    }
    history.replaceState(null, "", url);
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
            updateUrl(target.id, false);
        } else {
            target.classList.add("selected");
            updateUrl(target.id, true);
        }
    }
}

function init() {
    let container = document.getElementById("inventory-container");
    const selectedIds = getSelectedFromUrl();

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

        if (selectedIds.has(item.id)) {
            img.classList.add("selected");
        }

        img.onmouseup = function(e) { ToggleItem(e); };
        img.oncontextmenu = function(e) { PreventContextMenu(e); };
        img.onmouseenter = function(e) { ShowTooltip(e); };
        img.onmouseleave = function(e) { HideTooltip(e); };
    }
}

init();
