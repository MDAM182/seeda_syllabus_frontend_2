const endPoint = "http://localhost:3000/api/v1/syllabuses"

document.addEventListener('DOMContentLoaded', () => {
  getSyllabi()
  let createSyllabusForm = document.querySelector("#create-syllabus-form")
  createSyllabusForm.addEventListener("submit", (e) =>
  createFormHandler(e))
})

function getSyllabi() {
  fetch(endPoint)
    .then(res => res.json())
    .then(syllabi => {

      syllabi.data.forEach(syllabus => {

        let newSyllabus = new Syllabus(syllabus,syllabus.attributes)
        document.querySelector('#syllabus-container').innerHTML += newSyllabus.renderSyllabusCard();

      })
    })
  }


function createFormHandler(e) {
  e.preventDefault()
  const titleInput = document.querySelector('#input-title').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryId = parseInt(document.querySelector('#categories').value)
  postFetch(titleInput, descriptionInput, imageInput, categoryId)
}

function postFetch(title, description, image_url, category_id) {
  console.log(title, description, image_url, category_id)
  // build my body object outside of my fetch
  const bodyData = {title, description, image_url, category_id}
  //
  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  // .catch(err => console.log(err))
  .then(syllabus => {

    console.log(syllabus);
    const syllabusData = syllabus.data
    let newSyllabus = new Syllabus(syllabusData,syllabusData.attributes)
    document.querySelector('#syllabus-container').innerHTML += newSyllabus.renderSyllabusCard();
  })
}
