import {
    uploadBackgroundImage,
    getImageArr,
    uploadToTable,
} from './fetch-utils.js'

const addNewBackground = document.getElementById(`add-new-background`);
const addNewBackgroundLabel = document.getElementById(`add-new-background-label`);
const modal = document.getElementById(`modal`);
const uploadDiv = document.getElementById(`upload-div`);
const closeModal = document.getElementById(`close-modal`);
// const getImageFromInput = document.getElementById(`upload-background-image`);
// const submit = document.getElementById(`submit`);
const uploadImageForm = document.getElementById(`upload-image-form`);
const backgroundImage = document.getElementById(`background-image`);

addNewBackground.addEventListener(`mouseover`, () => {
    addNewBackgroundLabel.textContent = `Upload a new background `;
    addNewBackgroundLabel.classList.remove(`hidden`);
});

addNewBackground.addEventListener(`click`, () => {
    addNewBackgroundLabel.classList.add(`hidden`);
    modal.classList.remove(`hidden`);
});

addNewBackground.addEventListener(`mouseout`, () => {
    addNewBackgroundLabel.classList.add(`hidden`);
});


let isOutside = true;

uploadDiv.addEventListener(`mouseover`, () => {
    isOutside = false;
})

uploadDiv.addEventListener(`mouseout`, () => {
    isOutside = true;
})

closeModal.addEventListener(`click`, () => {
    modal.classList.add(`hidden`);
})

modal.addEventListener(`click`, () => {
    if(isOutside){
        modal.classList.add(`hidden`);
    }
})

uploadImageForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();

    const form = new FormData(uploadImageForm);
    const imageName = form.get(`upload-background-image`);
    const upload = await uploadBackgroundImage(imageName);
    const url = `https://nivykegwwwhynfclyita.supabase.co/storage/v1/object/public/background-images/background-images/${imageName.name}`;

    const imageObj = {
        name: imageName.name,
        url: url
    }
    
    if (upload.statusCode === `23505`){
        alert(`duplicate image detected...aborting`);
        return;
    } else {
        await uploadToTable(imageObj);
    }

    modal.classList.add(`hidden`);
    uploadImageForm.reset();
})

window.addEventListener(`load`, async() => {
    let imageArrObj = [];

    imageArrObj = await getImageArr();
    const randoNumbo = Math.floor(Math.random() * imageArrObj.length);
    console.log(imageArrObj[randoNumbo].url);
    backgroundImage.src = imageArrObj[randoNumbo].url;
    backgroundImage.classList.remove(`hidden`);
    setInterval(function() { window.location.reload() }, 30000);
});

