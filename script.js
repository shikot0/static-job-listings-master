const wrapper = document.getElementById('wrapper');
const queriesWrapper = document.getElementById('queries-wrapper');
const clearQueriesBtn = document.getElementById('clear-queries-button');

let jobListings = [];  
fetch("data.json") 
.then(resp => {
    return resp.json() 
}).then(data => {
    jobListings = data.map(listing => {
       const job = document.createElement('div');
       job.classList.add('job-listing');
       job.innerHTML = `<div class="main-info">
                            <img src="${listing.logo}" alt="">
                            <div class="company-and-job-status">
                              <p class="company">${listing.company}</p>
                            </div>
                            <p class="position">${listing.position}</p>
                            <div class="job-details"> 
                              <p class="time-posted">${listing.postedAt}</p>
                              <p class="contract">${listing.contract}</p> 
                              <p class="location">${listing.location}</p>
                            </div>
                        </div>
                        <div class="tags"></div>`;  
 
        if(listing.role) {
            const roleElement = document.createElement('p');
            roleElement.classList.add('tag'); 
            roleElement.innerText = listing.role;
            job.lastElementChild.appendChild(roleElement) 
        }
        if(listing.level) {
            const levelElement = document.createElement('p');
            levelElement.classList.add('tag');
            levelElement.innerText = listing.level;
            job.lastElementChild.appendChild(levelElement) 
        }
        listing.languages.forEach(language => { 
             const languageElement = document.createElement('p');
             languageElement.classList.add('tag'); 
             languageElement.innerText = language;
             job.lastElementChild.appendChild(languageElement); 
        }) 
        listing.tools.forEach(tool => { 
             const toolElement = document.createElement('p');
             toolElement.classList.add('tag');  
             toolElement.innerText = tool; 
             job.lastElementChild.appendChild(toolElement); 
        })  
        if(listing.new) {
            const newTag = document.createElement('p');
            newTag.classList.add('new-tag')
            newTag.innerText = 'new!';  
            job.firstElementChild.children[1].append(newTag); 
        }  
        if(listing.featured) { 
            const featuredTag = document.createElement('p');
            featuredTag.classList.add('featured-tag')
            featuredTag.innerText = 'featured'; 
            job.classList.add('featured')
            job.firstElementChild.children[1].append(featuredTag);  
        }
        wrapper.append(job); 
        return {keywords: [listing.role,listing.level,...listing.languages,...listing.tools], element: job} 
    });    
}); 

let value = [];  
function filter(e) {   
    value.push(e.target.innerText);        
    console.log(value)
    jobListings.forEach(jobListing => {  
        let isVisible = value.every(query => {
            return jobListing.keywords.includes(query);
        })  
        jobListing.element.classList.toggle('hidden-listing', !isVisible);   
    }) 
    const query = document.createElement('p');
    const removeQueryButton = document.createElement('button');
    removeQueryButton.innerHTML = `<img src="images/icon-remove.svg" alt=""></img>`;
    removeQueryButton.classList.add('remove-query-button');
    query.classList.add('query');
    query.innerText = e.target.innerText; 
    query.appendChild(removeQueryButton)
    queriesWrapper.appendChild(query);   
} 
setTimeout(() => { 
    tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', filter);
    }) 
},300)        

clearQueriesBtn.addEventListener('click', () => {
    jobListings.forEach(jobListing => {
        jobListing.element.classList.remove('hidden-listing'); 
    }) 
    queriesWrapper.innerHTML = ''; 
    value = []; 
}) 