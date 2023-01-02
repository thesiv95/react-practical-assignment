/**
 * This function allows to choose id of <Alert> component and put text
 * 
 * Styling of the component itself should be done by MUI tools
 * @param {style} elId 
 * @param {style} text 
 */
const showAlert = (elId, text) => {
    const errorMsg = document.getElementById(elId);
    errorMsg.style.display = 'block';
    errorMsg.innerHTML = text;
    setTimeout(() => errorMsg.style.display = 'none', 3000);
}

export default showAlert