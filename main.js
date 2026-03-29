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
]

const encodes = inventory.map(i => i.encode)
const seen = new Set()
for (const e of encodes) {
    if (seen.has(e)) console.error("Duplicate encode:", e)
    seen.add(e)
}

const getSource = id => `img/${id}.png`

const getSelectedFromUrl = () => {
    const params = new URLSearchParams(window.location.search)
    const sel = params.get("sel")
    if (!sel) return new Set()
    const selectedEncodes = sel.split(",").filter(e => e)
    const selectedIds = new Set()
    for (const item of inventory) {
        if (selectedEncodes.includes(item.encode)) {
            selectedIds.add(item.id)
        }
    }
    return selectedIds
}

const updateUrl = () => {
    const selectedEncodes = inventory
        .map(item => ({ item, img: document.getElementById(item.id) }))
        .filter(({ img }) => img?.classList.contains("selected"))
        .map(({ item }) => item.encode)

    const url = new URL(window.location)
    if (selectedEncodes.length === 0) {
        url.searchParams.delete("sel")
    } else {
        url.searchParams.set("sel", selectedEncodes.join(","))
    }
    history.replaceState(null, "", url)
}

const container = document.getElementById("inventory-container")
const selectedIds = getSelectedFromUrl()

const requiredLabel = document.createElement("div")
requiredLabel.className = "row-label label-required"
requiredLabel.textContent = "Required:"
container.appendChild(requiredLabel)

inventory.slice(0, 7).forEach(item => {
    const div = document.createElement("div")
    div.className = "element"

    const img = document.createElement("img")
    img.className = "inventory"
    img.alt = item.name
    img.src = getSource(item.id)
    img.id = item.id
    img.dataset.type = item.type

    const tooltip = document.createElement("div")
    tooltip.id = "tooltip_" + item.id
    tooltip.className = "invisible tooltip inventory"
    tooltip.textContent = item.name

    div.appendChild(img)
    div.appendChild(tooltip)
    container.appendChild(div)

    if (selectedIds.has(item.id)) {
        img.classList.add("selected")
    }

    img.onmouseup = event => {
        const target = event.target
        if (event.button === 0) {
            target.classList.toggle("selected")
            updateUrl()
        }
    }
    img.oncontextmenu = event => {
        event.preventDefault()
        return false
    }
    img.onmouseenter = event => {
        document.getElementById("tooltip_" + event.target.id).classList.remove("invisible")
    }
    img.onmouseleave = event => {
        document.getElementById("tooltip_" + event.target.id).classList.add("invisible")
    }
})

const keysLabel = document.createElement("div")
keysLabel.className = "row-label label-keys"
keysLabel.textContent = "Keys:"
container.appendChild(keysLabel)

inventory.slice(7).forEach(item => {
    const div = document.createElement("div")
    div.className = "element"

    const img = document.createElement("img")
    img.className = "inventory"
    img.alt = item.name
    img.src = getSource(item.id)
    img.id = item.id
    img.dataset.type = item.type

    const tooltip = document.createElement("div")
    tooltip.id = "tooltip_" + item.id
    tooltip.className = "invisible tooltip inventory"
    tooltip.textContent = item.name

    div.appendChild(img)
    div.appendChild(tooltip)
    container.appendChild(div)

    if (selectedIds.has(item.id)) {
        img.classList.add("selected")
    }

    img.onmouseup = event => {
        const target = event.target
        if (event.button === 0) {
            target.classList.toggle("selected")
            updateUrl()
        }
    }
    img.oncontextmenu = event => {
        event.preventDefault()
        return false
    }
    img.onmouseenter = event => {
        document.getElementById("tooltip_" + event.target.id).classList.remove("invisible")
    }
    img.onmouseleave = event => {
        document.getElementById("tooltip_" + event.target.id).classList.add("invisible")
    }
})
