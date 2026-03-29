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

const invasionHeader = document.createElement("div")
invasionHeader.className = "col-header col-header-invasion"
invasionHeader.textContent = "Invasion"
container.appendChild(invasionHeader)

const dragonHeader = document.createElement("div")
dragonHeader.className = "col-header col-header-dragon"
dragonHeader.textContent = "Dragon"
container.appendChild(dragonHeader)

const finishHeader = document.createElement("div")
finishHeader.className = "col-header col-header-finish"
finishHeader.textContent = "Finish"
container.appendChild(finishHeader)

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

const resetConfirm = document.getElementById("reset-confirm")
const resetBtn = document.getElementById("reset-btn")

resetConfirm.onchange = () => {
    resetBtn.disabled = !resetConfirm.checked
}

resetBtn.onclick = () => {
    document.querySelectorAll('.inventory.selected').forEach(img => {
        img.classList.remove('selected')
    })
    updateUrl()
    resetConfirm.checked = false
    resetBtn.disabled = true
}

// Top texts controls
const colorInvasion = document.getElementById("color-invasion")
const colorDragon = document.getElementById("color-dragon")
const colorFinish = document.getElementById("color-finish")
const sizeTop = document.getElementById("size-top")
const sizeTopValue = document.getElementById("size-top-value")

colorInvasion.oninput = () => {
    document.documentElement.style.setProperty('--text-invasion', colorInvasion.value)
    checkUnsavedChanges()
}
colorDragon.oninput = () => {
    document.documentElement.style.setProperty('--text-dragon', colorDragon.value)
    checkUnsavedChanges()
}
colorFinish.oninput = () => {
    document.documentElement.style.setProperty('--text-finish', colorFinish.value)
    checkUnsavedChanges()
}
sizeTop.oninput = () => {
    document.documentElement.style.setProperty('--top-text-size', sizeTop.value + 'px')
    sizeTopValue.textContent = sizeTop.value
    checkUnsavedChanges()
}

// Left column controls
const colorRequired = document.getElementById("color-required")
const colorKeys = document.getElementById("color-keys")
const sizeLeft = document.getElementById("size-left")
const sizeLeftValue = document.getElementById("size-left-value")

colorRequired.oninput = () => {
    document.documentElement.style.setProperty('--text-required', colorRequired.value)
    checkUnsavedChanges()
}
colorKeys.oninput = () => {
    document.documentElement.style.setProperty('--text-keys', colorKeys.value)
    checkUnsavedChanges()
}
sizeLeft.oninput = () => {
    document.documentElement.style.setProperty('--left-text-size', sizeLeft.value + 'px')
    sizeLeftValue.textContent = sizeLeft.value
    checkUnsavedChanges()
}

// Items controls
const borderInvasion = document.getElementById("border-invasion")
const borderDragon = document.getElementById("border-dragon")
const borderFinish = document.getElementById("border-finish")
const borderKey = document.getElementById("border-key")
const borderThickness = document.getElementById("border-thickness")
const borderThicknessValue = document.getElementById("border-thickness-value")

borderInvasion.oninput = () => {
    document.documentElement.style.setProperty('--color-invasion', borderInvasion.value)
    checkUnsavedChanges()
}
borderDragon.oninput = () => {
    document.documentElement.style.setProperty('--color-dragon', borderDragon.value)
    checkUnsavedChanges()
}
borderFinish.oninput = () => {
    document.documentElement.style.setProperty('--color-finish', borderFinish.value)
    checkUnsavedChanges()
}
borderKey.oninput = () => {
    document.documentElement.style.setProperty('--color-key', borderKey.value)
    checkUnsavedChanges()
}
borderThickness.oninput = () => {
    document.documentElement.style.setProperty('--border-thickness', borderThickness.value + 'px')
    borderThicknessValue.textContent = borderThickness.value
    checkUnsavedChanges()
}

// Transparent BG
const transparentBg = document.getElementById("transparent-bg")
transparentBg.onchange = () => {
    document.body.style.backgroundColor = transparentBg.checked ? 'transparent' : 'var(--bg-color)'
    document.querySelector('.sticky').style.backgroundColor = transparentBg.checked ? 'transparent' : 'var(--bg-color)'
    checkUnsavedChanges()
}

// Show/Hide controls
const showControls = document.getElementById("show-controls")
const groupTopTexts = document.getElementById("group-top-texts")
const groupLeftColumn = document.getElementById("group-left-column")
const groupItems = document.getElementById("group-items")

showControls.onclick = () => {
    const visible = showControls.textContent === "Hide Controls"
    if (visible) {
        showControls.textContent = "Show Controls"
        groupTopTexts.style.display = 'none'
        groupLeftColumn.style.display = 'none'
        groupItems.style.display = 'none'
    } else {
        showControls.textContent = "Hide Controls"
        groupTopTexts.style.display = 'flex'
        groupLeftColumn.style.display = 'flex'
        groupItems.style.display = 'flex'
    }
}

// Persist style
const saveBtn = document.getElementById("save-style")
const loadBtn = document.getElementById("load-style")

const getCurrentStyle = () => ({
    topTexts: {
        invasion: colorInvasion.value,
        dragon: colorDragon.value,
        finish: colorFinish.value,
        size: sizeTop.value
    },
    leftColumn: {
        required: colorRequired.value,
        keys: colorKeys.value,
        size: sizeLeft.value
    },
    items: {
        invasion: borderInvasion.value,
        dragon: borderDragon.value,
        finish: borderFinish.value,
        key: borderKey.value,
        thickness: borderThickness.value
    },
    misc: {
        transparentBg: transparentBg.checked
    }
})

let savedStyle = null

const checkUnsavedChanges = () => {
    const current = JSON.stringify(getCurrentStyle())
    if (savedStyle && current !== savedStyle) {
        saveBtn.style.backgroundColor = 'red'
    } else {
        saveBtn.style.backgroundColor = ''
    }
}

saveBtn.onclick = () => {
    const style = {
        topTexts: {
            invasion: colorInvasion.value,
            dragon: colorDragon.value,
            finish: colorFinish.value,
            size: sizeTop.value
        },
        leftColumn: {
            required: colorRequired.value,
            keys: colorKeys.value,
            size: sizeLeft.value
        },
        items: {
            invasion: borderInvasion.value,
            dragon: borderDragon.value,
            finish: borderFinish.value,
            key: borderKey.value,
            thickness: borderThickness.value
        },
        misc: {
            transparentBg: transparentBg.checked
        }
    }
    localStorage.setItem("sekiro-style", JSON.stringify(style))
    savedStyle = JSON.stringify(getCurrentStyle())
    checkUnsavedChanges()
}

loadBtn.onclick = () => {
    const style = JSON.parse(localStorage.getItem("sekiro-style"))
    if (!style) return

    if (style.topTexts) {
        colorInvasion.value = style.topTexts.invasion
        colorDragon.value = style.topTexts.dragon
        colorFinish.value = style.topTexts.finish
        sizeTop.value = style.topTexts.size
        sizeTopValue.textContent = style.topTexts.size
        document.documentElement.style.setProperty('--text-invasion', colorInvasion.value)
        document.documentElement.style.setProperty('--text-dragon', colorDragon.value)
        document.documentElement.style.setProperty('--text-finish', colorFinish.value)
        document.documentElement.style.setProperty('--top-text-size', sizeTop.value + 'px')
    }

    if (style.leftColumn) {
        colorRequired.value = style.leftColumn.required
        colorKeys.value = style.leftColumn.keys
        sizeLeft.value = style.leftColumn.size
        sizeLeftValue.textContent = style.leftColumn.size
        document.documentElement.style.setProperty('--text-required', colorRequired.value)
        document.documentElement.style.setProperty('--text-keys', colorKeys.value)
        document.documentElement.style.setProperty('--left-text-size', sizeLeft.value + 'px')
    }

    if (style.items) {
        borderInvasion.value = style.items.invasion
        borderDragon.value = style.items.dragon
        borderFinish.value = style.items.finish
        borderKey.value = style.items.key
        borderThickness.value = style.items.thickness
        borderThicknessValue.textContent = style.items.thickness
        document.documentElement.style.setProperty('--color-invasion', borderInvasion.value)
        document.documentElement.style.setProperty('--color-dragon', borderDragon.value)
        document.documentElement.style.setProperty('--color-finish', borderFinish.value)
        document.documentElement.style.setProperty('--color-key', borderKey.value)
        document.documentElement.style.setProperty('--border-thickness', borderThickness.value + 'px')
    }

    if (style.misc) {
        transparentBg.checked = style.misc.transparentBg
        document.body.style.backgroundColor = transparentBg.checked ? 'transparent' : 'var(--bg-color)'
        document.querySelector('.sticky').style.backgroundColor = transparentBg.checked ? 'transparent' : 'var(--bg-color)'
    }

    savedStyle = JSON.stringify(getCurrentStyle())
    checkUnsavedChanges()
}

// Auto-load on page load
loadBtn.onclick()
savedStyle = JSON.stringify(getCurrentStyle())
checkUnsavedChanges()

// Reset style to default
const styleResetConfirm = document.getElementById("style-reset-confirm")
const styleResetBtn = document.getElementById("style-reset-btn")

styleResetConfirm.onchange = () => {
    styleResetBtn.disabled = !styleResetConfirm.checked
}

styleResetBtn.onclick = () => {
    localStorage.removeItem("sekiro-style")
    location.reload()
}
