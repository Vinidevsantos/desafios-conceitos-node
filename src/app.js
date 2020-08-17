const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



function logRequests(request, response, next) {
  const { method, url} = request;
 
  const logLabel = `[${method.toUpperCase()}] ${url}`;
 
 console.time(logLabel);
 
 next(); //Proximo middleware
 
 console.timeEnd(logLabel);
 
 }
 
 function validateProjectId(request, response, next){
  const { id } = request.params;
 
  if (!isUuid(id)) {
   return response.status(400).json({ error: 'Invalid Project ID.'});
  }
 
  return next();
 }
 
 app.use(logRequests);
 app.use('/repositories/:id', validateProjectId);

app.get("/repositories", (request, response) => {
  
const { title } = request.query;

 const results = title
  ? repositories.filter(project => repositories.title.includes(title))
  : repositories;

  console.log(results);

 return response.json(results);
}); //OK

app.post("/repositories", (request, response) => {
  
const {title, url, techs} = request.body;

const repositorie = { id: uuid(), title, url, techs, likes: 0 };

repositories.push(repositorie); 

console.log(repositorie);

return response.json(repositorie);
  
  // TODO
}); //OK

app.put("/repositories/:id", (request, response) => {
  // TODO


  const { id } = request.params;
  const { title, url, techs } = request.body;
 
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
 
  if (repositorieIndex < 0) {
   return response.status(400).json({ error: "Project not found." })
  } 
 
  const repositorie = {
   id,
   title,
   url,
   techs,
   likes: 0
  };
  
  repositories[repositorieIndex] = repositorie;
 
  return response.json(repositorie);


}); //OK

app.delete("/repositories/:id", (request, response) => {
  // TODO
const { id } = request.params;

const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id );

if (repositorieIndex < 0) {
  return response.status(400).json({ error: "Project not found"});
}

repositories.splice(repositorieIndex, 1);

return response.status(204).send();


}); //OK

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const repository = repositories.find(repository => repository.id == id);
    if(!repository) {
      return response.status(400).send();
    }

    repository.likes +=1;
    return response.json(repository);
  });

module.exports = app;
