const jobCard = document.querySelector(".job-card")

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(job => {
      updateUi(job)
    })
  })
  .catch(err => console.log(err))

const filterContainer = document.querySelector(".filter-container")
const categories = document.getElementsByClassName("categories")[0]

function updateUi(data) {
  const {
    company,
    position,
    postedAt,
    location,
    contract,
    tools,
    logo,
    featured,
    languages,
    role,
    level,
    id,
  } = data

  jobCard.innerHTML += `<div class="bg-white md:p-8 p-4 rounded md:mb-5 mb-9 shadow-lg w-full relative md:static" data-${id}=${id}>
    <div class="md:float-left absolute md:static -top-6 md:mr-5 ">
      <img src=${logo} alt=${company} class="h-12 w-12 md:h-full md:w-full"/>
    </div>
    <h6
      class="
        text-[color:var(--desaturated-dark-cyan)]
        md:text-[12.5px]
        text-sm
        font-bold
        mb-2.5
        md:mt-0 mt-3
      "
    >
      ${company}
      ${
        data.new
          ? `<span
      class="text-white bg-[color:var(--desaturated-dark-cyan)] py-1.5 px-2 rounded-full uppercase ml-3.5 mr-1.5 md:text-[9.5px] text-sm
      font-normal inline-block" 
        
      
      >New!</span
    >`
          : ""
      }
      ${
        featured
          ? `<span
      class="md:text-[9.5px] text-xs
      inline-block
      text-white
      bg-black
      py-1.5
      px-2
      rounded-full
      uppercase
      font-normal inline-block"  
      >Featured</span
    >`
          : ""
      }
      
    </h6>
    <div class="flex md:justify-between flex-col md:flex-row items-start">
      <p class="font-bold md:text-[16.5px] text-base">${position}</p>
      <div>
        <button
          class="
            inline-block
            p-2
            md:text-[13px]
            text-sm
            bg-[color:var(--light-grayish-cyan-background)]
            text-[color:var(--desaturated-dark-cyan)]
            rounded
            font-bold
            mr-3
          "
          data-role=${role}
          >${role}</button
        >
        <button
          class="
            inline-block
            p-2
            md:text-[13px]
            text-sm
            bg-[color:var(--light-grayish-cyan-background)]
            text-[color:var(--desaturated-dark-cyan)]
            rounded
            font-bold
            mr-3
          "
          data-level=${level}
          >${level}</button
        >
        ${languages?.map(lang => {
          return `<button
              class="
              inline-block
              p-2
              md:text-[13px]
              text-sm
              bg-[color:var(--light-grayish-cyan-background)]
              text-[color:var(--desaturated-dark-cyan)]
              rounded
              font-bold
              mr-3
            "
            data-languages=${lang}
            >
              ${lang}
            </button>`
        })}
        ${tools?.map(tool => {
          return `<button
          class="
            inline-block
            p-2
            md:text-[13px]
            text-sm
            bg-[color:var(--light-grayish-cyan-background)]
            text-[color:var(--desaturated-dark-cyan)]
            rounded
            font-bold
          "
          data-tools=${tool}
          >${tool}</button
        >`
        })}
      </div>
    </div>
    <p class="md:text-[12.5px] text-sm text-[color:var(--dark-grayish-cyan)]">
      ${postedAt} . ${contract} . ${location}
    </p>
  </div>`

  const btns = document.querySelectorAll("button")
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i]

    btn.addEventListener("click", filterCategory)
  }
}

let totalCatagories = 0

function filterCategory(e) {
  filterContainer.classList.remove("hidden")

  const button = e.target

  if (
    button.dataset.tools ||
    button.dataset.languages ||
    button.dataset.role ||
    button.dataset.level
  ) {
    categories.innerHTML += `<div
    class="
      py-0
      pl-2
      pr-0
      md:text-[13px]
      text-sm
      bg-[color:var(--light-grayish-cyan-background)]
      text-[color:var(--desaturated-dark-cyan)]
      rounded
      font-bold
      mr-3.5
      mb-2.5
    "
  >
    ${
      button.dataset.tools ||
      button.dataset.languages ||
      button.dataset.role ||
      button.dataset.level
    }
    <button class="clear-one p-2 inline-block ml-2 bg-[color:var(--desaturated-dark-cyan)]" onclick="deleteFilter()">
    <img src="./images/icon-remove.svg">
    </button>
  </div>`
  }
  totalCatagories += 1
}

function deleteFilter() {
  const filterBtn = document.getElementsByClassName("clear-one")[0]
  filterBtn.parentElement.remove()
  totalCatagories -= 1
  totalCatagories === 0 ? filterContainer.classList.add("hidden") : null
}

function clearAll() {
  while (categories.firstChild) {
    categories.removeChild(categories.firstChild)
  }
}
