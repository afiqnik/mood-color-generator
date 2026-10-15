const moodPalettes = {
  happy: {
    label: "Happy",
    colors: ["#FFD166", "#FFB703", "#FB8500", "#F4A261", "#FFF3B0"]
  },
  calm: {
    label: "Calm",
    colors: ["#CAD2C5", "#84A98C", "#52796F", "#354F52", "#E9F5DB"]
  },
  energetic: {
    label: "Energetic",
    colors: ["#FF5400", "#FF6D00", "#FF8500", "#FFBD00", "#FF0054"]
  },
  romantic: {
    label: "Romantic",
    colors: ["#FFC2D1", "#FF8FAB", "#FB6F92", "#C9184A", "#FFE5EC"]
  },
  sad: {
    label: "Sad",
    colors: ["#D6E2E9", "#A8C0D6", "#7D9DB8", "#526D82", "#E6E8EA"]
  },
  nature: {
    label: "Nature",
    colors: ["#606C38", "#283618", "#DDA15E", "#BC6C25", "#FEFAE0"]
  },
  focused: {
    label: "Focused",
    colors: ["#14213D", "#1D3557", "#457B9D", "#A8DADC", "#F1FAEE"]
  },
  cozy: {
    label: "Cozy",
    colors: ["#6F4E37", "#A47148", "#CB997E", "#DDBEA9", "#FFE8D6"]
  }
};

const moodSelect = document.querySelector("#mood-select");
const generateButton = document.querySelector("#generate-button");
const resetButton = document.querySelector("#reset-button");
const statusMessage = document.querySelector("#status-message");
const paletteSection = document.querySelector("#palette-section");
const paletteTitle = document.querySelector("#palette-title");
const paletteGrid = document.querySelector("#palette-grid");

function renderPalette(moodKey) {
  const palette = moodPalettes[moodKey];

  if (!palette) {
    paletteSection.hidden = true;
    paletteGrid.replaceChildren();
    statusMessage.textContent = "Please select a valid mood.";
    return;
  }

  paletteTitle.textContent = `${palette.label} palette`;
  paletteGrid.replaceChildren();

  palette.colors.forEach((hex) => {
    const card = document.createElement("article");
    card.className = "color-card";

    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = hex;
    swatch.setAttribute("role", "img");
    swatch.setAttribute("aria-label", `Color preview ${hex}`);

    const content = document.createElement("div");
    content.className = "color-card-content";

    const hexLabel = document.createElement("span");
    hexLabel.className = "color-hex";
    hexLabel.textContent = hex;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.textContent = "Copy HEX";
    copyButton.setAttribute("aria-label", `Copy ${hex}`);

    copyButton.addEventListener("click", () => copyHex(hex, copyButton));

    content.append(hexLabel, copyButton);
    card.append(swatch, content);
    paletteGrid.append(card);
  });

  paletteSection.hidden = false;
  statusMessage.textContent = `${palette.label} palette generated with 5 colors.`;
}

async function copyHex(hex, button) {
  try {
    if (!navigator.clipboard || !window.isSecureContext) {
      throw new Error("Clipboard API unavailable");
    }

    await navigator.clipboard.writeText(hex);
    button.textContent = "Copied!";
    statusMessage.textContent = `${hex} copied to clipboard.`;
    window.setTimeout(() => {
      button.textContent = "Copy HEX";
    }, 1500);
  } catch {
    statusMessage.textContent = `Unable to copy automatically. You can copy ${hex} manually.`;
  }
}

function handleGenerate() {
  const moodKey = moodSelect.value;

  if (!moodKey) {
    paletteSection.hidden = true;
    paletteGrid.replaceChildren();
    statusMessage.textContent = "Please select a mood first.";
    moodSelect.focus();
    return;
  }

  renderPalette(moodKey);
}

function handleReset() {
  moodSelect.value = "";
  paletteGrid.replaceChildren();
  paletteSection.hidden = true;
  paletteTitle.textContent = "Your palette";
  statusMessage.textContent = "Select a mood to generate a palette.";
}

generateButton.addEventListener("click", handleGenerate);
resetButton.addEventListener("click", handleReset);
