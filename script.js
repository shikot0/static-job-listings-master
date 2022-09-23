const wrapper = document.getElementById('wrapper');

fetch("data.json") 
.then(resp => {
    return resp.json() 
}).then(data => {
    data.forEach(element => {
       const job = document.createElement('div');
       job.classList.add('job-listing');
       job.innerHTML = `<div class="main-info">
                            <img src="${element.logo}" alt="">
                            <div class="company-and-job-status">
                              <p class="company">${element.company}</p>
                            </div>
                            <p class="position">${element.position}</p>
                            <div class="job-details"> 
                              <p class="time-posted">${element.postedAt}</p>
                              <p class="contract">${element.contract}</p> 
                              <p class="location">${element.location}</p>
                            </div>
                        </div>
                        <div class="tags"></div>`;  
 
        if(element.role) {
            const roleElement = document.createElement('p');
            roleElement.classList.add('tag'); 
            roleElement.innerText = element.role;
            job.lastElementChild.appendChild(roleElement) 
        }
        if(element.level) {
            const levelElement = document.createElement('p');
            levelElement.classList.add('tag');
            levelElement.innerText = element.level;
            job.lastElementChild.appendChild(levelElement) 
        }
        element.languages.forEach(language => { 
             const languageElement = document.createElement('p');
             languageElement.classList.add('tag'); 
             languageElement.innerText = language;
             job.lastElementChild.appendChild(languageElement); 
        }) 
        element.tools.forEach(tool => { 
             const toolElement = document.createElement('p');
             toolElement.classList.add('tag');  
             toolElement.innerText = tool; 
             job.lastElementChild.appendChild(toolElement); 
        }) 
        if(element.new) {
            const newTag = document.createElement('p');
            newTag.classList.add('new-tag')
            newTag.innerText = 'new!';  
            job.firstElementChild.children[1].append(newTag); 
        } 
        if(element.featured) { 
            const featuredTag = document.createElement('p');
            featuredTag.classList.add('featured-tag')
            featuredTag.innerText = 'featured'; 
            job.classList.add('featured')
            job.firstElementChild.children[1].append(featuredTag); 
        }
        wrapper.append(job); 
    });   
}); 

function filter(e) {  
    console.log(e.target) 
}
let tags;
let jobListings;
setTimeout(() => {
    jobListings = document.querySelectorAll('job-listing');
    tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', filter);
    })
    console.log(tags)  
},100)    
 