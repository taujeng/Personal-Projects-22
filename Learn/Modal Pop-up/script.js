// doing this as if there are multiple buttons to open this modal
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    // .datasets lets you access all "data" attributes as if they were js objects
    // button.dataset.modalTarget targets: data-modal-target  so we end up with "#modal"
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

// Close Modal when Clicking on Overlay:
overlay.addEventListener('click', () => {
  // find all open modals
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})


closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    // grab the closest parent element w the class of modal
    // start at button, and start going upwards to the parents, checking if they have the modal class
    // and if so, that's what is returned
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}